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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [artistTitle, setArtistTitle] = useState("");
  const [artistEmail, setArtistEmail] = useState("");
  const [streamingLink, setStreamingLink] = useState("");
  const [anrName, setAnrName] = useState("");
  const [assetLink, setAssetLink] = useState("");
  const [wantArtistPage, setWantArtistPage] = useState<"Yes" | "No" | "">("");
  const [socials, setSocials] = useState<SocialItem[]>([{ platform: "Instagram", url: "" }]);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const urlOk = (value: string) => /^https?:\/\/.+/i.test(value);

  function addSocial() {
    setSocials((current) => [...current, { platform: "Instagram", url: "" }]);
  }

  function removeSocial(index: number) {
    setSocials((current) => current.filter((_, idx) => idx !== index));
  }

  function setSocial(index: number, key: keyof SocialItem, value: string) {
    setSocials((current) =>
      current.map((item, idx) => (idx === index ? { ...item, [key]: value } : item)),
    );
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!artistTitle.trim()) return setError("Preencha Artist Name(s) - Song Title.");
    if (!emailOk(artistEmail)) return setError("E-mail invalido.");
    if (!urlOk(streamingLink)) return setError("Informe um link valido de Spotify/Apple.");
    if (!anrName.trim()) return setError("Preencha o nome do A&R.");
    if (!urlOk(assetLink)) return setError("Informe um link valido de WAV + Cover Art.");
    if (!wantArtistPage) return setError("Selecione se deseja a 991 artist page no release.");

    const validSocials = socials.filter((item) => item.url.trim() !== "");
    if (validSocials.length === 0) return setError("Adicione pelo menos 1 rede social.");

    setLoading(true);
    try {
      const payload = {
        artistTitle: artistTitle.trim(),
        email: artistEmail.trim(),
        streamingLink: streamingLink.trim(),
        anrName: anrName.trim(),
        assetLink: assetLink.trim(),
        wantArtistPage,
        socials: validSocials,
        message: message.trim() || undefined,
        website: website.trim(),
      };

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/submit/thanks");
        return;
      }

      const json = await response.json().catch(() => ({}));
      setError(json?.error || "Falha ao enviar. Tente novamente.");
    } catch {
      setError("Nao foi possivel enviar agora. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-black">
      <div className="container py-24">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold text-white">Submit your demo</h1>
          <p className="mt-2 text-white/70">
            Envie links (Drive/Dropbox para WAV e capa, Spotify/Apple etc). Sem upload de arquivos na v1.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">Artist Name(s) - Song Title*</label>
              <input
                value={artistTitle}
                onChange={(event) => setArtistTitle(event.target.value)}
                maxLength={200}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
                placeholder="e.g. DJ LA BEAT, Seek - SEM PIEDADE"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-white/70">Artist email*</label>
                <input
                  type="email"
                  value={artistEmail}
                  onChange={(event) => setArtistEmail(event.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
                  placeholder="voce@email.com"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-white/70">A&amp;R&apos;s Name*</label>
                <input
                  value={anrName}
                  onChange={(event) => setAnrName(event.target.value)}
                  maxLength={120}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
                  placeholder='A&R you were referred by (ex.: "DJ LA BEAT")'
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">Artist(s) Spotify &amp; Apple Music URL / Link*</label>
              <input
                type="url"
                value={streamingLink}
                onChange={(event) => setStreamingLink(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
                placeholder="https://open.spotify.com/artist/... (pode ser Linktree)"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                Song WAV File &amp; Cover Art Link (DropBox / Google Drive)*
              </label>
              <input
                type="url"
                value={assetLink}
                onChange={(event) => setAssetLink(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
                placeholder="https://drive.google.com/..."
                required
              />
            </div>

            <div>
              <label className="mb-3 block text-sm text-white/70">
                Artist(s) Social Media Links (Instagram, SoundCloud etc.)* - adicione quantos quiser
              </label>

              <div className="space-y-3">
                {socials.map((social, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <select
                      value={social.platform}
                      onChange={(event) => setSocial(index, "platform", event.target.value)}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-white outline-none focus:border-white/30"
                    >
                      {SOCIAL_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <input
                      type="url"
                      value={social.url}
                      onChange={(event) => setSocial(index, "url", event.target.value)}
                      className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
                      placeholder="https://..."
                    />

                    <button
                      type="button"
                      onClick={() => removeSocial(index)}
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

            <div>
              <label className="mb-2 block text-sm text-white/70">
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

            <div>
              <label className="mb-2 block text-sm text-white/70">Message (opcional)</label>
              <textarea
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={3000}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
                placeholder="Conte algo sobre a faixa/projeto"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400" role="alert" aria-live="assertive">
                {error}
              </p>
            )}

            <div className="flex items-center gap-3">
              <button
                disabled={loading}
                type="submit"
                className="inline-flex items-center gap-3 rounded-lg bg-white px-5 py-3 font-medium text-black disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Enviar demo"}
              </button>

              <p className="text-xs text-white/50">Ao enviar, voce concorda em ser contatado por e-mail.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
