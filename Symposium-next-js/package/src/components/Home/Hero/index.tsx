import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const SPOTIFY_URL =
    process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL ??
    "https://open.spotify.com/playlist/2WP8yW6eqiMNawVZKrQfVW";

  return (
    <section className="relative isolate overflow-hidden bg-black">
      {/* BG da direita (full height da seção) */}
      {/* BG da direita (ocupando parte da seção) */}
      <div
        aria-hidden
        className="
    pointer-events-none
    absolute inset-y-0 right-0   /* <-- ancora à direita */
    w-[58vw] md:w-[55vw] lg:w-[50vw]
    -z-10                         /* fica atrás do texto */
  "
      >
        <Image
          src="/images/hero/991-home-back.png"
          alt=""
          fill
          priority
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-cover object-right opacity-70"  
        />

        {/* scrim: escurece o lado esquerdo da FAIXA (onde fica o texto) */}
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/60 to-transparent" />
      </div>


      {/* Conteúdo */}
      <div className="container py-28 md:py-40 min-h-[70vh] relative z-10">
        <div className="max-w-xl">
          <p className="relative inline-block uppercase text-xs tracking-[0.25em] text-white/80 font-semibold
                         after:absolute after:content-[''] after:left-0 after:-bottom-1 after:h-[3px] after:w-24 after:bg-white/60">
            Record Label
          </p>

          <p className="mt-5 text-lg leading-relaxed text-white/80">
            Independent multigenre label, based in São Paulo, Brazil.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/submit"
              className="inline-flex items-center gap-3 rounded-lg bg-white text-black px-5 py-3 font-medium shadow hover:bg-white/90"
            >
              <i className="bg-[url('/images/hero/send.png')] bg-no-repeat bg-contain w-5 h-5" />
              Submit Demo
            </Link>

            <Link
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg border border-white/20 text-white px-5 py-3 font-medium hover:bg-white/10"
              aria-label="Ouvir a 991Collective no Spotify (abre em nova aba)"
            >
              <i className="bg-[url('/images/hero/spotify.png')] bg-no-repeat bg-contain w-5 h-5" />
              Listen on Spotify
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
