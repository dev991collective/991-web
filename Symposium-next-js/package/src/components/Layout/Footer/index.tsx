import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/991collective", 
    icon: "/images/footer/instagram.png",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/991collective", 
    icon: "/images/footer/twitter.png",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/991collective", 
    icon: "/images/footer/facebook.png",
  },
];

const Footer: FC = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap md:pt-16 pt-12 md:pb-10 pb-6 border-b border-white/10">
          {/* logo */}
          <Link href="/" className="w-24 h-auto">
            <Image
              src="/images/footer/logo.png"
              alt="991Collective"
              width={100}
              height={35}
              className="w-24 h-auto"
              priority
            />
          </Link>

          {/* links */}
          <ul className="flex items-center flex-wrap gap-6 py-5 md:py-0">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Artists", href: "/artists" },
              { label: "Contact", href: "/contact" },
            ].map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className="text-white/70 hover:text-white transition-colors text-base"
                >
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* redes sociais */}
          <ul className="flex items-center gap-4">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="inline-flex p-2 rounded-md hover:bg-white/10 transition-colors"
                >
                  <Image
                    src={s.icon}
                    alt={s.name}
                    width={22}
                    height={22}
                    className="opacity-90 hover:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* base do footer */}
        <div className="grid md:grid-cols-12 grid-cols-1 items-center py-8 gap-6">
          <div className="md:col-span-5">
            <p className="text-sm text-white/60">
              ©2025 991Collective. All rights reserved.
            </p>
          </div>

          {/* Newsletter (opcional) */}
          <div className="md:col-span-7 grid md:grid-cols-12 grid-cols-1 items-center gap-4">
            <p className="md:col-span-4 text-white/70">Subscribe Newsletter</p>
            <form className="md:col-span-8 flex w-full gap-2">
              <input
                type="email"
                placeholder="Email address*"
                className="flex-1 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 px-4 py-3 outline-none focus:border-white/30"
              />
              <button
                type="submit"
                className="rounded-lg bg-white text-black px-5 py-3 font-medium hover:bg-white/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
