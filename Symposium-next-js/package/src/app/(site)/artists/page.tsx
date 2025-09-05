'use client';

import Image from 'next/image';
import Link from 'next/link';
import { artists } from '@/data/artists';

export default function ArtistsPage() {
    return (
        <section className="bg-black">
            <div className="container">
                {/* Título + subtítulo com AOS */}
                <div className="mb-8">
                    <h1
                        className="text-white md:text-4xl text-3xl font-bold"
                        data-aos="fade-up"
                    >
                        Artists
                    </h1>
                    <p
                        className="text-white/60 mt-2"
                        data-aos="fade-up"
                        data-aos-delay="120"
                    >
                        Conheça nosso roster.
                    </p>
                </div>

                {/* Grid com stagger */}
                <ul
                    className="
            grid gap-6
            sm:grid-cols-2 lg:grid-cols-3
          "
                >
                    {artists.map((a, i) => (
                        <li key={a.slug}>
                            <Link
                                href={`/artists/${a.slug}`}
                                className="
                  group relative block overflow-hidden rounded-2xl
                  border border-white/10 bg-white/5
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,.35)]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                  artist-card
                "
                                aria-label={a.name}
                                data-aos="fade-up"
                                data-aos-delay={i * 90}
                                data-aos-duration="700"
                            >
                                {/* Imagem */}
                                <div className="relative aspect-[4/5] w-full">
                                    <Image
                                        src={a.cardImage ?? a.avatar ?? a.hero}
                                        alt={a.name}
                                        fill
                                        sizes="(min-width:1024px) 33vw, 50vw"
                                        className="
                      object-cover
                      transition-transform duration-500 will-change-transform
                      group-hover:scale-[1.04]
                    "
                                        priority={i < 3}
                                    />
                                </div>

                                {/* Overlay de texto (revela levemente no hover) */}
                                <div
                                    className="
                                        pointer-events-none absolute inset-x-0 bottom-0 p-4
                                        bg-gradient-to-t from-black/70 via-black/40 to-transparent
                                        translate-y-0 opacity-100
                                        transition-all duration-300
                                        group-hover:translate-y-0 group-hover:opacity-100
                                    "
                                >
                                    <h3 className="text-white text-base font-semibold drop-shadow">
                                        {a.name}
                                    </h3>
                                    {a.role || a.designation ? (
                                        <p className="text-white/75 text-xs">
                                            {a.role ?? a.designation}
                                        </p>
                                    ) : null}
                                </div>

                                {/* brilho sutil na borda (opcional, via CSS abaixo) */}
                                <span className="artist-card__glow" aria-hidden />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
