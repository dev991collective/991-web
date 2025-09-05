"use client";
import Image from "next/image";
import Link from "next/link";

export default function EventTicket() {
  return (
    <section className="relative bg-black">
      {/* scrim sutil no topo para separar visualmente da seção anterior */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="container py-14 md:py-20 text-center">
        <h2
          className="text-white pb-4"
          data-aos="fade-up"
          data-aos-delay="120"
          data-aos-duration="900"
        >
          SOME TEXT HERE
        </h2>

        <p
          className="mx-auto max-w-3xl text-white/70 text-lg leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="220"
          data-aos-duration="900"
        >
          TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO 
          TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO
          TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO
        </p>

        {/* CTA opcional */}
        {/* <div data-aos="fade-up" data-aos-delay="320" className="mt-8">
          <Link
            href="/artists"
            className="inline-flex items-center gap-3 rounded-lg border border-white/20 text-white px-5 py-3 font-medium hover:bg-white/10"
          >
            Meet the artists
          </Link>
        </div> */}
      </div>
    </section>
  );
}
