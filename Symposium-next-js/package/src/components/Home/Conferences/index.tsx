import React from "react";
import AutoCarousel from "../AutoCarousel";

const Conferences = () => {
  return (
    <section
      className="
        relative overflow-hidden bg-black py-24
        before:content-[''] before:absolute before:-left-64 before:top-1/2 before:-translate-y-1/2
        before:w-[1100px] before:h-[1100px] before:rounded-full before:bg-white/[0.035] before:blur-3xl
      "
    >
      <div className="container">
        <div className="grid lg:grid-cols-12 items-center gap-12">
          {/* Imagem maior, ‘bleed’ vindo da esquerda */}
          <div
            className="lg:col-span-7 -mx-4 sm:mx-0"
            data-aos="fade-right"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            <AutoCarousel heightClass="h-[68vh] md:h-[74vh] xl:h-[78vh]" />
          </div>

          {/* Texto em zigue-zague */}
          <div className="lg:col-span-5">
            {/* bloco 1 */}
            <div
              className="
                group rounded-2xl border border-white/10 bg-white/[0.03] 
                p-6 md:p-7 backdrop-blur-sm
                transition hover:border-white/20
              "
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight">
                Underground. <br /> Independent. <br /> Loud.
              </h2>
              <p className="text-white/70 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aliquam imperdiet justo at massa rutrum efficitur.
              </p>
            </div>

            {/* bloco 2 (deslocado para a direita) */}
            <div
              className="
                mt-6 lg:mt-7 lg:translate-x-8
                group rounded-2xl border border-white/10 bg-white/[0.03]
                p-6 md:p-7 backdrop-blur-sm
                transition hover:border-white/20
              "
              data-aos="fade-left"
              data-aos-delay="320"
              data-aos-duration="1000"
            >
              <h3 className="text-white text-2xl font-semibold">
                Book our artists
              </h3>
              <p className="text-white/70 mt-2">
                Integer interdum velit vel egestas ultrices. Nunc in mi non
                magna tincidunt porta.
              </p>
            </div>

            {/* bloco 3 (deslocado para a esquerda) */}
            <div
              className="
                mt-6 lg:mt-7 lg:-translate-x-6
                group rounded-2xl border border-white/10 bg-white/[0.03]
                p-6 md:p-7 backdrop-blur-sm
                transition hover:border-white/20
              "
              data-aos="fade-left"
              data-aos-delay="440"
              data-aos-duration="1000"
            >
              <h3 className="text-white text-2xl font-semibold">
                Community & collabs
              </h3>
              <p className="text-white/70 mt-2">
                Aliquam fermentum, lorem at condimentum porta, est ante egestas
                turpis, ac commodo erat magna vitae ligula.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Conferences;
