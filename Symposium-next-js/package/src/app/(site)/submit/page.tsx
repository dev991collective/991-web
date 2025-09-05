"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type SocialItem = { platform: string; url: string };

const SOCIAL_OPTIONS = [
    "Instagram",
    "Twitter/X",
    "TikTok",
    "SoundCloud",
    "Spotify",
    "Apple Music",
    "YouTube",
    "Linktree",
] as const;

export default function SubmitPage() {
    const router = useRouter();

    // ------- form state -------
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [artistTitle, setArtistTitle] = useState(""); // Artist Name(s) - Song Title
    const [artistEmail, setArtistEmail] = useState(""); // email do artista
    const [streamingLink, setStreamingLink] = useState(""); // Spotify/Apple link (pode ser Linktree)
    const [anrName, setAnrName] = useState(""); // A&R name (refer)
    const [assetLink, setAssetLink] = useState(""); // WAV + Cover Art link (Drive/Dropbox)
    const [wantArtistPage, setWantArtistPage] = useState<"Yes" | "No" | "">("");
    const [socials, setSocials] = useState<SocialItem[]>([
        { platform: "Instagram", url: "" },
    ]);
    const [message, setMessage] = useState(""); // campo livre opcional

    // ------- helpers -------
    const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const urlOk = (v: string) => /^https?:\/\/.+/i.test(v);

    function addSocial() {
        setSocials((arr) => [...arr, { platform: "Instagram", url: "" }]);
    }
    function removeSocial(idx: number) {
        setSocials((arr) => arr.filter((_, i) => i !== idx));
    }
    function setSocial(idx: number, key: keyof SocialItem, value: string) {
        setSocials((arr) => arr.map((s, i) => (i === idx ? { ...s, [key]: value } : s)));
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        // validações principais (sem TikTok/Release Date)
        if (!artistTitle.trim()) return setError("Preencha Artist Name(s) - Song Title.");
        if (!emailOk(artistEmail)) return setError("E-mail inválido.");
        if (!urlOk(streamingLink)) return setError("Informe um link válido de Spotify/Apple (pode ser Linktree).");
        if (!anrName.trim()) return setError("Preencha o nome do A&R.");
        if (!urlOk(assetLink)) return setError("Informe o link de WAV + Cover Art (Drive/Dropbox).");
        if (!wantArtistPage) return setError("Selecione se deseja a 991 artist page no release.");
        const validSocials = socials.filter((s) => s.url.trim() !== "");
        if (validSocials.length === 0) return setError("Adicione pelo menos 1 rede social.");

        setLoading(true);

        const payload = {
            artistTitle: artistTitle.trim(),
            email: artistEmail.trim(),
            streamingLink: streamingLink.trim(),
            anrName: anrName.trim(),
            assetLink: assetLink.trim(),
            wantArtistPage,
            socials: validSocials,
            message: message.trim() || undefined,
            website: "", // honeypot controlado (não renderizado)
        };

        const res = await fetch("/api/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        setLoading(false);
        if (res.ok) {
            router.push("/submit/thanks");
        } else {
            const j = await res.json().catch(() => ({}));
            setError(j?.error || "Falha ao enviar. Tente novamente.");
        }
    }

    return (
        <section className="bg-black">
            <div className="container py-24">
                <div className="max-w-3xl">
                    <h1 className="text-3xl font-semibold text-white">Submit your demo</h1>
                    <p className="mt-2 text-white/70">
                        Envie links (Drive/Dropbox para WAV & capa, Spotify/Apple, etc.). Sem upload de arquivos na v1.
                    </p>

                    <form onSubmit={onSubmit} className="mt-8 space-y-6">
                        {/* Artist Name(s) - Song Title */}
                        <div>
                            <label className="block text-sm text-white/70 mb-2">Artist Name(s) - Song Title*</label>
                            <input
                                value={artistTitle}
                                onChange={(e) => setArtistTitle(e.target.value)}
                                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
                                placeholder='e.g. DJ LA BEAT, Seek - SEM PIEDADE'
                                required
                            />
                        </div>

                        {/* Email + A&R */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-white/70 mb-2">Artist email*</label>
                                <input
                                    type="email"
                                    value={artistEmail}
                                    onChange={(e) => setArtistEmail(e.target.value)}
                                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
                                    placeholder="voce@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white/70 mb-2">A&amp;R&apos;s Name*</label>
                                <input
                                    value={anrName}
                                    onChange={(e) => setAnrName(e.target.value)}
                                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
                                    placeholder='A&R you were referred by (ex.: "DJ LA BEAT")'
                                    required
                                />
                            </div>
                        </div>

                        {/* Spotify & Apple Music URL / Link */}
                        <div>
                            <label className="block text-sm text-white/70 mb-2">Artist(s) Spotify & Apple Music URL / Link*</label>
                            <input
                                type="url"
                                value={streamingLink}
                                onChange={(e) => setStreamingLink(e.target.value)}
                                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
                                placeholder="https://open.spotify.com/artist/... (pode ser Linktree)"
                                required
                            />
                        </div>

                        {/* WAV + Cover Art link */}
                        <div>
                            <label className="block text-sm text-white/70 mb-2">
                                Song WAV File &amp; Cover Art Link (DropBox / Google Drive)*
                            </label>
                            <input
                                type="url"
                                value={assetLink}
                                onChange={(e) => setAssetLink(e.target.value)}
                                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
                                placeholder="https://drive.google.com/..."
                                required
                            />
                        </div>

                        {/* Socials dinâmicos */}
                        <div>
                            <label className="block text-sm text-white/70 mb-3">
                                Artist(s) Social Media Links (Instagram, SoundCloud, etc.)* — adicione quantos quiser
                            </label>

                            <div className="space-y-3">
                                {socials.map((s, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <select
                                            value={s.platform}
                                            onChange={(e) => setSocial(i, "platform", e.target.value)}
                                            className="rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white outline-none focus:border-white/30"
                                        >
                                            {SOCIAL_OPTIONS.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>

                                        <input
                                            type="url"
                                            value={s.url}
                                            onChange={(e) => setSocial(i, "url", e.target.value)}
                                            className="flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
                                            placeholder="https://..."
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeSocial(i)}
                                            className="rounded-lg border border-white/10 px-3 py-3 text-white/70 hover:bg-white/10"
                                            aria-label="Remover rede"
                                            disabled={socials.length === 1}
                                        >
                                            Remover
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={addSocial}
                                className="mt-3 rounded-lg border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10"
                            >
                                + Adicionar rede
                            </button>
                        </div>

                        {/* Want artist page */}
                        <div>
                            <label className="block text-sm text-white/70 mb-2">
                                Would you like the 991 artist page on your release?*
                            </label>
                            <div className="flex items-center gap-6 text-white/80">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="wantArtistPage"
                                        checked={wantArtistPage === "Yes"}
                                        onChange={() => setWantArtistPage("Yes")}
                                    />
                                    Yes
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="wantArtistPage"
                                        checked={wantArtistPage === "No"}
                                        onChange={() => setWantArtistPage("No")}
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        {/* Mensagem opcional */}
                        <div>
                            <label className="block text-sm text-white/70 mb-2">Message (opcional)</label>
                            <textarea
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
                                placeholder="Conte algo sobre a faixa/projeto"
                            />
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm" role="alert" aria-live="assertive">
                                {error}
                            </p>
                        )}

                        <div className="flex items-center gap-3">
                            <button
                                disabled={loading}
                                type="submit"
                                className="inline-flex items-center gap-3 rounded-lg bg-white text-black px-5 py-3 font-medium disabled:opacity-60"
                            >
                                {loading ? "Enviando..." : "Enviar demo"}
                            </button>

                            <p className="text-xs text-white/50">
                                Ao enviar, você concorda em ser contatado por e-mail.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
