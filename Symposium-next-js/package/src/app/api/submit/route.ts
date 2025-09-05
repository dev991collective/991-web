import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type SocialItem = { platform: string; url: string };

type Payload = {
    artistTitle: string;
    email: string;                // artista
    streamingLink: string;        // Spotify/Apple (pode ser Linktree)
    anrName: string;
    assetLink: string;            // WAV + cover (Drive/Dropbox)
    wantArtistPage: "Yes" | "No";
    socials: SocialItem[];
    message?: string;
    website?: string;             // honeypot
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
const urlOk = (v: string) => /^https?:\/\/.+/i.test(v || "");

export async function POST(req: Request) {
    const body = (await req.json()) as Payload;

    // Honeypot
    if (body.website) return NextResponse.json({ ok: true });

    // Validations (sem TikTok/Release Date)
    if (!body.artistTitle?.trim()) return NextResponse.json({ error: "Artist title faltando." }, { status: 400 });
    if (!emailOk(body.email)) return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
    if (!urlOk(body.streamingLink)) return NextResponse.json({ error: "Spotify/Apple link inválido." }, { status: 400 });
    if (!body.anrName?.trim()) return NextResponse.json({ error: "A&R name faltando." }, { status: 400 });
    if (!urlOk(body.assetLink)) return NextResponse.json({ error: "Asset link inválido." }, { status: 400 });
    const socials = Array.isArray(body.socials) ? body.socials.filter(s => s && s.url?.trim()) : [];
    if (socials.length === 0) return NextResponse.json({ error: "Inclua pelo menos 1 rede social." }, { status: 400 });

    // Env
    const apiKey = process.env.RESEND_API_KEY;
    const toEnv = process.env.DEMO_SUBMISSIONS_TO;
    const from: string = process.env.DEMO_FROM_EMAIL ?? "991Collective Demos <submit@991collective.com>";

    if (!apiKey || !toEnv) {
        return NextResponse.json({ error: "Env ausente (RESEND_API_KEY / DEMO_SUBMISSIONS_TO)." }, { status: 500 });
    }

    // Aceita 1 ou vários destinatários
    const to = toEnv.includes(",")
        ? toEnv.split(",").map(s => s.trim()).filter(Boolean)
        : toEnv.trim();

    // Compose email
    const socialsTxt = socials.map(s => `- ${s.platform}: ${s.url}`).join("\n");
    const text = `
Nova demo recebida:

Artist Name(s) - Song Title: ${body.artistTitle}
Artist email: ${body.email}
A&R's Name (refer): ${body.anrName}

Spotify/Apple URL: ${body.streamingLink}
WAV & Cover Art (Drive/Dropbox): ${body.assetLink}

991 Artist Page on release?: ${body.wantArtistPage}

Socials:
${socialsTxt}

Mensagem:
${body.message || "(sem mensagem)"}`
        .trim();

    try {
        const resend = new Resend(apiKey);
        await resend.emails.send({
            from,
            to,
            replyTo: body.email,                 // respostas vão para o artista
            subject: `Nova demo – ${body.artistTitle}`,
            text,
        });

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Falha ao enviar e-mail." }, { status: 500 });
    }
}
