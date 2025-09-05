import React from "react";
import Link from "next/link";
import Image from "next/image";

const TicketSection = () => {
  return (
    <section className="bg-black py-16 md:py-24"> {/* respiro vertical padrão */}
      <div className="container">
        <div
          className="
            relative bg-primary overflow-hidden rounded-22
            md:mx-auto mx-0
            md:mt-20 mt-10
            mb-16 md:mb-24 lg:mb-28   /* <<< espaçamento do footer */
            shadow-lg
          "
        >
          <div className="flex flex-wrap items-center justify-between md:p-20 p-5">
            {/* imagem decorativa à esquerda */}
            <div className="md:w-full w-full absolute top-0 -left-1 md:block hidden pointer-events-none">
              <Image
                src="/images/ticket-section/ticket.png"
                alt=""
                width={1200}
                height={600}
                className="object-cover"
                priority
              />
            </div>

            {/* conteúdo */}
            <div className="md:w-2/5 w-full ml-auto lg:text-start text-center relative z-10">
              <p className="sm:text-4xl text-[28px] leading-[2.25rem] font-bold text-white lg:max-w-364 max-w-full pb-9">
                Join our community<br />on discord
              </p>

              <Link
                href="https://discord.gg/SEU-CODIGO"   /* troque pelo invite real */
                className="inline-flex items-center justify-center rounded-lg bg-white text-black px-10 sm:px-20 py-3 font-medium hover:bg-white/90"
              >
                Join
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TicketSection;
