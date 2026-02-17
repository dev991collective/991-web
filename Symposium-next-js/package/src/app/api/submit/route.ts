import { NextResponse } from "next/server";
import { Resend } from "resend";
import { takeRateLimit } from "@/utils/rateLimit";

export const runtime = "nodejs";

type SocialItem = { platform: string; url: string };

type Payload = {
  artistTitle: string;
  email: string;
  streamingLink: string;
  anrName: string;
  assetLink: string;
  wantArtistPage: "Yes" | "No";
  socials: SocialItem[];
  message?: string;
  website?: string;
};

const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
const urlOk = (value: string) => /^https?:\/\/.+/i.test(value || "");
const clean = (value?: string) => (value || "").trim();

function getClientIp(req: Request): string {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (!xForwardedFor) return "unknown";
  return xForwardedFor.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent") || "unknown";
  const rate = takeRateLimit(`demo:${ip}:${userAgent}`, 5, 10 * 60 * 1000);

  if (rate.limited) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde e tente novamente." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rate.retryAfterSeconds),
        },
      },
    );
  }

  const contentType = req.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ error: "Content-Type invalido." }, { status: 415 });
  }

  const raw = await req.text();
  if (!raw || raw.length > 20_000) {
    return NextResponse.json({ error: "Payload invalido." }, { status: 400 });
  }

  let body: Payload;
  try {
    body = JSON.parse(raw) as Payload;
  } catch {
    return NextResponse.json({ error: "JSON invalido." }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true });

  const artistTitle = clean(body.artistTitle);
  const artistEmail = clean(body.email);
  const streamingLink = clean(body.streamingLink);
  const anrName = clean(body.anrName);
  const assetLink = clean(body.assetLink);
  const message = clean(body.message);
  const wantArtistPage = body.wantArtistPage;

  if (!artistTitle || artistTitle.length > 200) {
    return NextResponse.json({ error: "Artist title faltando." }, { status: 400 });
  }
  if (!emailOk(artistEmail) || artistEmail.length > 254) {
    return NextResponse.json({ error: "E-mail invalido." }, { status: 400 });
  }
  if (!urlOk(streamingLink) || streamingLink.length > 2000) {
    return NextResponse.json({ error: "Link de streaming invalido." }, { status: 400 });
  }
  if (!anrName || anrName.length > 120) {
    return NextResponse.json({ error: "A&R name faltando." }, { status: 400 });
  }
  if (!urlOk(assetLink) || assetLink.length > 2000) {
    return NextResponse.json({ error: "Asset link invalido." }, { status: 400 });
  }
  if (wantArtistPage !== "Yes" && wantArtistPage !== "No") {
    return NextResponse.json({ error: "Selecao de artist page invalida." }, { status: 400 });
  }

  const socials = Array.isArray(body.socials) ? body.socials.filter((item) => item && clean(item.url)) : [];
  if (socials.length === 0) {
    return NextResponse.json({ error: "Inclua pelo menos 1 rede social." }, { status: 400 });
  }
  if (socials.length > 10) {
    return NextResponse.json({ error: "Limite de redes sociais excedido." }, { status: 400 });
  }

  for (const social of socials) {
    if (!social.platform || social.platform.length > 60) {
      return NextResponse.json({ error: "Plataforma de rede social invalida." }, { status: 400 });
    }
    if (!urlOk(social.url) || social.url.length > 2000) {
      return NextResponse.json({ error: "URL de rede social invalida." }, { status: 400 });
    }
  }

  if (message.length > 3000) {
    return NextResponse.json({ error: "Mensagem muito longa." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEnv = process.env.DEMO_SUBMISSIONS_TO;
  const from = process.env.DEMO_FROM_EMAIL ?? "991Collective Demos <submit@991collective.com>";

  if (!apiKey || !toEnv) {
    return NextResponse.json({ error: "Env ausente (RESEND_API_KEY / DEMO_SUBMISSIONS_TO)." }, { status: 500 });
  }

  const to = toEnv.includes(",") ? toEnv.split(",").map((item) => item.trim()).filter(Boolean) : toEnv.trim();
  const socialsText = socials.map((item) => `- ${item.platform}: ${clean(item.url)}`).join("\n");

  const text = `
Nova demo recebida:

Artist Name(s) - Song Title: ${artistTitle}
Artist email: ${artistEmail}
A&R's Name (refer): ${anrName}

Spotify/Apple URL: ${streamingLink}
WAV & Cover Art (Drive/Dropbox): ${assetLink}

991 Artist Page on release?: ${wantArtistPage}

Socials:
${socialsText}

Mensagem:
${message || "(sem mensagem)"}

IP: ${ip}
User-Agent: ${userAgent}
`.trim();

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: artistEmail,
      subject: `Nova demo - ${artistTitle}`,
      text,
    });

    return NextResponse.json(
      { ok: true },
      {
        headers: {
          "X-RateLimit-Remaining": String(rate.remaining),
        },
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Falha ao enviar e-mail." }, { status: 500 });
  }
}
