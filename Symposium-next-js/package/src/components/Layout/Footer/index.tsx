import type { FC } from "react";
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
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-6 pt-12 md:pb-10 md:pt-16">
          <Link href="/" className="h-auto w-24">
            <Image
              src="/images/footer/logo.png"
              alt="991Collective"
              width={100}
              height={35}
              className="h-auto w-24"
              priority
            />
          </Link>

          <ul className="flex flex-wrap items-center gap-6 py-5 md:py-0">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Artists", href: "/artists" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-base text-white/70 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-4">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="inline-flex rounded-md p-2 transition-colors hover:bg-white/10"
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={22}
                    height={22}
                    className="opacity-90 hover:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 items-center gap-6 py-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-sm text-white/60">(c) 2026 991Collective. All rights reserved.</p>
          </div>

          <div className="grid grid-cols-1 items-center gap-4 md:col-span-7 md:grid-cols-12">
            <p className="text-white/70 md:col-span-4">Newsletter</p>
            <div className="md:col-span-8">
              <p className="text-sm text-white/60">
                Newsletter em configuracao. Enquanto isso, acompanhe novidades no Instagram.
              </p>
              <a
                href="https://www.instagram.com/991collective"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex rounded-lg border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
