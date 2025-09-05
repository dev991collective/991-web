import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artists, getArtistBySlug } from "@/data/artists";

/* ---------- Ícones (mantidos) ---------- */
function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 26 26" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M18.9357 10.9748c.006.1279.008.2564.008.3856 0 3.9429-3.0013 8.4896-8.4898 8.4898h-.0002c-1.6851 0-3.2532-.494-4.5737-1.3404.2335.0276.4711.0413.7117.0413 1.3981 0 2.6847-.4769 3.7061-1.2779-1.3062-.0242-2.4075-.8879-2.7875-2.0736.182-.0226.3681-.0416.6087-.0416.3983 0 .6626-.0037 1.0186-.1144-1.364-1.1407-1.7396-2.2227-1.7396-3.6671 0-.0115 0-.0231.0004-.0352.4021.2123.8612.3468 1.3507.362.8012-.535 1.3279-1.4487 1.3279-2.4839 0-.5467-.1478-1.0586-.4041-1.4995 1.8714.8068 4.0705 1.9943 6.5504 2.119-.0511-.219-.0775-.4467-.0775-.681 0-1.6472 1.3364-2.9835 2.9842-2.9835.8583 0 1.6335.3628 2.178.9428.6798-.1341 1.3181-.3825 1.8948-.7242-.2232.6965-.6961 1.2808-1.3122 1.6504.6036-.0718 1.1789-.2318 1.7135-.4696-.3993.5985-.9058 1.1241-1.4889 1.5452z" />
        </svg>
    );
}
function IconX(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M3 3h3.9l5.12 6.91L18.2 3H21l-7.64 9.14L21 21h-3.9l-5.39-7.27L6 21H3l8.21-9.86z" />
        </svg>
    );
}
function IconTikTok(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M12.9 2h3.1c.35 1.98 1.84 3.6 3.8 4.03v3.2c-1.53-.07-2.96-.58-4.17-1.43v6.39c0 3.67-2.97 6.64-6.64 6.64S2.45 17.88 2.45 14.21c0-3.67 2.97-6.64 6.64-6.64.38 0 .75.03 1.11.1v3.26a3.48 3.48 0 0 0-1.11-.18 3.38 3.38 0 1 0 3.38 3.38z" />
        </svg>
    );
}
function IconSoundCloud(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M17.1 9.2c.3-.1.6-.1.9-.1 2 0 3.7 1.6 3.7 3.7 0 2-1.7 3.7-3.7 3.7H8.3c-2.1 0-3.8-1.7-3.8-3.7 0-1.9 1.4-3.5 3.2-3.7.3 0 .5 0 .8.1.4-2.3 2.4-4.1 4.8-4.1 2.1 0 3.9 1.3 4.5 3.1z" />
        </svg>
    );
}
function IconSpotify(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.46 14.56c-.19.31-.59.41-.9.22-2.47-1.51-5.58-1.85-9.24-1.01-.35.08-.7-.14-.79-.49a.63.63 0 0 1 .46-.78c3.98-.92 7.39-.54 10.06 1.09.32.19.41.6.22.97zm1.26-2.76c-.24.39-.74.52-1.13.29-2.83-1.73-7.15-2.24-10.5-1.21-.44.13-.9-.12-1.03-.56a.82.82 0 0 1 .55-1.02c3.76-1.15 8.52-.58 11.76 1.36.39.23.52.75.29 1.14zm.1-2.93c-3.37-1.99-9.1-2.18-12.35-1.18-.53.16-1.1-.14-1.26-.67a.99.99 0 0 1 .65-1.23c3.74-1.15 10.1-.92 14 1.35.49.29.65.93.36 1.43a1.04 1.04 0 0 1-1.4.3z" />
        </svg>
    );
}
function IconYouTube(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M23 12s0-3.3-.42-4.84a3 3 0 0 0-2.1-2.1C18.94 4.64 12 4.64 12 4.64s-6.94 0-8.48.42a3 3 0 0 0-2.1 2.1C.99 8.7 1 12 1 12s-.01 3.3.42 4.84a3 3 0 0 0 2.1 2.1c1.54.42 8.48.42 8.48.42s6.94 0 8.48-.42a3 3 0 0 0 2.1-2.1C23 15.3 23 12 23 12Zm-13 3.27V8.73L15.5 12 10 15.27Z" />
        </svg>
    );
}
function IconApple(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M16.37 13.41c.03 2.93 2.58 3.91 2.61 3.93-.02.07-.41 1.42-1.37 2.81-.83 1.21-1.69 2.41-3.04 2.44-1.32.03-1.74-.79-3.25-.79s-1.98.77-3.23.82c-1.3.05-2.29-1.31-3.14-2.51C3.36 18.6 2.1 15.22 3.61 12.43c.86-1.57 2.39-2.56 4.06-2.59 1.27-.02 2.47.86 3.25.86.77 0 2.24-1.07 3.78-.91.64.03 2.44.26 3.67 1.98-.1.06-2.15 1.26-2 3.64ZM13.64 6.8c.7-.84 1.17-2.02 1.04-3.2-1.01.04-2.22.67-2.95 1.5-.65.75-1.21 1.96-1.06 3.11 1.12.09 2.26-.57 2.97-1.41Z" />
        </svg>
    );
}
function IconBandcamp(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M7.57 18H1l5.43-12H16l-8.43 12ZM23 6v12h-8l8-12Z" />
        </svg>
    );
}
function IconGlobe(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.93 9h-3.21a14.9 14.9 0 0 0-1-4.2A8.03 8.03 0 0 1 18.93 11ZM9.28 6.8A12.94 12.94 0 0 0 8.28 11H5.07a8.03 8.03 0 0 1 4.21-4.2Zm-4.21 6h3.21a12.94 12.94 0 0 0 1 4.2A8.03 8.03 0 0 1 5.07 12Zm5.65 0h2.56a11.1 11.1 0 0 1-.97 3.8c-.3.7-.7 1.33-1.31 1.33-.62 0-1.02-.63-1.31-1.33-.43-.98-.78-2.2-.97-3.8Zm5.65 0h3.21a8.03 8.03 0 0 1-4.21 4.2 14.9 14.9 0 0 0 1-4.2ZM12 4.87c.62 0 1.02.63 1.31 1.33.43.98.78 2.2.97 3.8h-4.56c.19-1.6.54-2.82.97-3.8.3-.7.7-1.33 1.31-1.33Z" />
        </svg>
    );
}

function SocialIcon({ platform }: { platform: string }) {
    const cn = "h-4 w-4";
    switch (platform) {
        case "Instagram":
            return <IconInstagram className={cn} />;
        case "Twitter/X":
            return <IconX className={cn} />;
        case "TikTok":
            return <IconTikTok className={cn} />;
        case "Spotify":
            return <IconSpotify className={cn} />;
        case "SoundCloud":
            return <IconSoundCloud className={cn} />;
        case "YouTube":
            return <IconYouTube className={cn} />;
        case "Apple Music":
            return <IconApple className={cn} />;
        case "Bandcamp":
            return <IconBandcamp className={cn} />;
        case "Website":
            return <IconGlobe className={cn} />;
        default:
            return <IconGlobe className={cn} />;
    }
}

/* ---------- SSG + metadata (mantidos) ---------- */
export function generateStaticParams() {
    return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const a = getArtistBySlug(slug);
    if (!a) return {};
    return {
        title: `${a.name} — 991Collective`,
        description: a.tagline || a.bio?.[0],
        openGraph: { images: a.hero ? [{ url: a.hero }] : undefined },
    };
}

export default async function ArtistPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const artist = getArtistBySlug(slug);
    if (!artist) return notFound();

    const avatarSrc = artist.avatar ?? artist.hero;

    // controles do hero
    const widthVW = artist.heroWidthVW ?? 52;
    const position = artist.heroPosition ?? "right center";
    const scale = artist.heroScale ?? 1;
    const blur = artist.heroBlur ?? 0;
    const darkness = artist.heroDarkness ?? 0.85;

    const scrim = `linear-gradient(to left,
    rgba(0,0,0,${darkness}) 0%,
    rgba(0,0,0,${Math.min(darkness * 0.85, 1)}) 35%,
    rgba(0,0,0,${Math.min(darkness * 0.6, 1)}) 60%,
    transparent 100%)`;

    const socials = artist.socials ?? [];

    return (
        <section className="relative isolate overflow-hidden bg-black">
            {/* HERO à direita com mask + animação de reveal */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 -z-10"
                style={{ width: `${widthVW}vw` }}
            >
                <div
                    className="absolute inset-0 reveal-hero"   /* <- animação CSS */
                    style={{
                        WebkitMaskImage:
                            "linear-gradient(to left, black 0%, black 65%, transparent 100%)",
                        maskImage:
                            "linear-gradient(to left, black 0%, black 65%, transparent 100%)",
                    }}
                    data-aos="fade-left"
                    data-aos-duration="800"
                >
                    <Image
                        src={artist.hero}
                        alt=""
                        fill
                        priority
                        sizes="(min-width:1024px) 50vw, 100vw"
                        className="object-cover will-change-transform"
                        style={{
                            objectPosition: position,
                            transform: `scale(${scale})`,
                            filter: blur ? `blur(${blur}px)` : undefined,
                            opacity: 0.9,
                        }}
                    />
                </div>
                <div className="absolute inset-0" style={{ backgroundImage: scrim }} />
            </div>

            <div className="container py-20 md:py-28">
                <Link
                    href="/artists"
                    className="inline-block text-sm text-white/60 hover:text-white mb-6"
                    data-aos="fade-right"
                    data-aos-duration="600"
                >
                    ← Back to artists
                </Link>

                {/* Cabeçalho + ações */}
                <div className="flex items-start gap-6">
                    <div
                        className="relative h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden border border-white/10 bg-white/5 shrink-0"
                        data-aos="zoom-in"
                        data-aos-delay="100"
                        data-aos-duration="600"
                    >
                        <Image
                            src={avatarSrc}
                            alt={artist.name}
                            fill
                            className="object-cover object-center"
                            sizes="112px"
                            priority
                        />
                    </div>

                    <div className="min-w-0">
                        <h1
                            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white"
                            data-aos="fade-up"
                            data-aos-delay="120"
                        >
                            {artist.name}
                        </h1>

                        {artist.tagline && (
                            <p
                                className="text-lg text-white/70 mt-2"
                                data-aos="fade-up"
                                data-aos-delay="180"
                            >
                                {artist.tagline}
                            </p>
                        )}

                        {/* Ações: botão + ícones com micro-interações */}
                        <div
                            className="mt-5 flex items-center gap-3 flex-wrap"
                            data-aos="fade-up"
                            data-aos-delay="240"
                        >
                            {artist.links?.spotify && (
                                <a
                                    href={artist.links.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 text-white px-4 py-2 text-sm hover:bg-white/10"
                                >
                                    <Image
                                        src="/images/hero/spotify.png"
                                        alt=""
                                        width={18}
                                        height={18}
                                    />
                                    Listen on Spotify
                                </a>
                            )}

                            {socials.length > 0 && (
                                <div className="flex items-center gap-2">
                                    {socials.map((s, i) => (
                                        <a
                                            key={s.platform + s.url}
                                            href={s.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={s.platform}
                                            title={s.platform}
                                            className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 hover:text-white hover:bg-white/10 transition-transform duration-200 hover:-translate-y-0.5"
                                            data-aos="zoom-in"
                                            data-aos-delay={280 + i * 60}
                                        >
                                            <SocialIcon platform={s.platform} />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Conteúdo */}
                <div className="mt-10">
                    <h2
                        className="text-white text-2xl font-semibold mb-4"
                        data-aos="fade-up"
                    >
                        Biography
                    </h2>

                    <div className="space-y-4 text-white/80 leading-relaxed max-w-3xl">
                        {(artist.bio && artist.bio.length ? artist.bio : ["Bio em breve."]).map(
                            (p, i) => (
                                <p
                                    key={i}
                                    data-aos="fade-up"
                                    data-aos-delay={100 + i * 120}
                                    data-aos-duration="700"
                                >
                                    {p}
                                </p>
                            )
                        )}
                    </div>
                </div>

                {/* Galeria (opcional) */}
                {artist.gallery?.length ? (
                    <div className="mt-12">
                        <h3
                            className="text-white text-xl font-semibold mb-4"
                            data-aos="fade-up"
                        >
                            Gallery
                        </h3>
                        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {artist.gallery.map((src, i) => (
                                <li
                                    key={src + i}
                                    className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10"
                                    data-aos="fade-up"
                                    data-aos-delay={80 + i * 120}
                                    data-aos-duration="700"
                                >
                                    <Image
                                        src={src}
                                        alt={`${artist.name} photo ${i + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
