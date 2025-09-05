"use client";

import React from "react";
import Slider, { Settings } from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SLIDES = [
  { src: "/images/ThumbnailSlider/dj-rosa-ddj.jpeg", alt: "991 photo 1" },
  { src: "/images/ThumbnailSlider/vitinho-dj.png", alt: "991 photo 2" },
  { src: "/images/ThumbnailSlider/dj-la-beat-page.png", alt: "991 photo 3" },
];

type Props = {
  /** permite ajustar a altura de fora (ex.: h-[78vh]) */
  heightClass?: string;
};

const AutoCarousel: React.FC<Props> = ({ heightClass = "h-[72vh]" }) => {
  const settings: Settings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3800,
    speed: 850,
    fade: true,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: false,
    draggable: false,
    swipe: false,
    touchMove: false,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {SLIDES.map((s, i) => (
          <div key={s.src} className="px-1">
            <div
              className={`
                relative ${heightClass}
                overflow-hidden rounded-[26px] border border-white/10
                shadow-2xl shadow-black/40
              `}
            >
              {/* Fundo desfocado com scrim */}
              <div className="absolute inset-0 -z-10">
                <Image
                  src={s.src}
                  alt=""
                  fill
                  className="object-cover blur-2xl opacity-45 scale-110"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
              </div>

              {/* Imagem principal – Ken Burns left-to-right */}
              <Image
                src={s.src}
                alt={s.alt}
                fill
                className="object-cover will-change-transform animate-kb-ltr"
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </Slider>

      {/* keyframes do movimento ‘da esquerda para a direita’ */}
      <style jsx global>{`
        @keyframes kb-ltr {
          0% {
            transform: scale(1.04) translateX(-1.5%);
          }
          50% {
            transform: scale(1.08) translateX(1.5%);
          }
          100% {
            transform: scale(1.04) translateX(-1.5%);
          }
        }
        .animate-kb-ltr {
          animation: kb-ltr 14s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AutoCarousel;
