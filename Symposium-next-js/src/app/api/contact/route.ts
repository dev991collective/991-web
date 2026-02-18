import { NextResponse } from "next/server";
import { Resend } from "resend";
import { takeRateLimit } from "@/utils/rateLimit";

export const runtime = "nodejs";

type Payload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  website?: string;
};

const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
const clean = (value?: string) => (value || "").trim();

function getClientIp(req: Request): string {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (!xForwardedFor) return "unknown";
  return xForwardedFor.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent") || "unknown";
  const rate = takeRateLimit(`contact:${ip}:${userAgent}`, 5, 10 * 60 * 1000);

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
  if (!raw || raw.length > 10_000) {
    return NextResponse.json({ error: "Payload invalido." }, { status: 400 });
  }

  let body: Payload;
  try {
    body = JSON.parse(raw) as Payload;
  } catch {
    return NextResponse.json({ error: "JSON invalido." }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true });

  const name = clean(body.name);
  const email = clean(body.email);
  const subject = clean(body.subject);
  const message = clean(body.message);

  if (!name || name.length > 120) return NextResponse.json({ error: "Nome invalido." }, { status: 400 });
  if (!emailOk(email) || email.length > 254) return NextResponse.json({ error: "E-mail invalido." }, { status: 400 });
  if (subject.length > 180) return NextResponse.json({ error: "Assunto muito longo." }, { status: 400 });
  if (!message || message.length > 3000) return NextResponse.json({ error: "Mensagem invalida." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const toEnv = process.env.CONTACT_SUBMISSIONS_TO ?? process.env.DEMO_SUBMISSIONS_TO;
  const from = process.env.CONTACT_FROM_EMAIL ?? "991Collective Contact <submit@991collective.com>";

  if (!apiKey || !toEnv) {
    return NextResponse.json({ error: "Env ausente (RESEND_API_KEY / CONTACT_SUBMISSIONS_TO)." }, { status: 500 });
  }

  const to = toEnv.includes(",") ? toEnv.split(",").map((item) => item.trim()).filter(Boolean) : toEnv.trim();
  const finalSubject = subject || "Novo contato do site";

  const text = `
Nova mensagem de contato:

Nome: ${name}
E-mail: ${email}
Assunto: ${finalSubject}

Mensagem:
${message}

IP: ${ip}
User-Agent: ${userAgent}
`.trim();

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Contato] ${finalSubject}`,
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
