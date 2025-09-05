"use client";
import Image from "next/image";
import Link from "next/link";
import { speakers } from "@/app/api/data";

export default function WorkSpeakers({ showTitle = true }: { showTitle?: boolean }) {
  return (
    <section className="bg-black">
      <div className="container max-w-7xl py-12 md:py-16">
        {showTitle && (
          <h2
            className="text-center text-white pb-10 md:pb-12"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="900"
          >
            FOUNDING ARTISTS
          </h2>
        )}

        {/* 2 / 3 / 4 / 5 colunas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {speakers.map((spk, i) => (
            <Link
              key={spk.id}
              href={(spk as any).slug ? `/artists/${(spk as any).slug}` : "#"}
              aria-label={spk.name}
              className="group"
              data-aos="fade-up"
              data-aos-delay={String(120 + i * 120)}
              data-aos-duration="900"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] hover:ring-1 hover:ring-white/20">
                <div className="relative aspect-square">
                  <Image
                    src={spk.src}
                    alt={spk.alt || spk.name}
                    fill
                    sizes="(min-width:1280px) 20vw, (min-width:1024px) 25vw, (min-width:640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={i < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-white text-base md:text-lg font-semibold leading-tight">
                    {spk.name}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm">{spk.designation}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
