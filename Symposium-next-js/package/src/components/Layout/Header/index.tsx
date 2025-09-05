"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { headerData } from "../Header/Navigation/menuData";
import HeaderLink from "../Header/Navigation/HeaderLink";

const Header: React.FC = () => {
  const pathUrl = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // sticky ao rolar
  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY >= 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // fecha menu ao clicar fora
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (
        navbarOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setNavbarOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [navbarOpen]);

  // fundo do header no estilo do Figma
  const headerBg = sticky
    ? "bg-black/90 shadow-lg"
    : "bg-black/70";
  const headerBase =
    "fixed top-0 z-50 w-full transition-all backdrop-blur supports-[backdrop-filter]:bg-black/60";

  return (
    <>
      <header className={`${headerBase} ${headerBg}`}>
        <div className="container">
          <div className="flex items-center justify-between h-20">
            <Logo />

            {/* navegação desktop */}
            <ul className="hidden lg:flex flex-grow items-center justify-center space-x-6">
              {headerData.map((item, index) => (
                <HeaderLink key={index} item={item} />
              ))}
            </ul>

            {/* CTA à direita */}
            <div className="flex items-center gap-3">
              <Link
                href="/submit"
                className="hidden md:inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 font-medium hover:bg-white/90"
              >
                Submit Demo
              </Link>

              {/* hamburguer mobile */}
              <button
                onClick={() => setNavbarOpen(!navbarOpen)}
                className="block lg:hidden p-2 rounded-lg"
                aria-label="Toggle mobile menu"
              >
                <span className="block w-6 h-0.5 bg-white"></span>
                <span className="block w-6 h-0.5 bg-white mt-1.5"></span>
                <span className="block w-6 h-0.5 bg-white mt-1.5"></span>
              </button>
            </div>
          </div>
        </div>

        {/* overlay */}
        {navbarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setNavbarOpen(false)}
          />
        )}

        {/* menu mobile */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-full max-w-72 bg-black text-white shadow-lg transform transition-transform duration-300 z-50 ${
            navbarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <span className="text-sm uppercase tracking-wide text-white/70">
              Menu
            </span>
            <button
              onClick={() => setNavbarOpen(false)}
              aria-label="Close mobile menu"
              className="p-2"
            >
              ✕
            </button>
          </div>
          <nav className="flex flex-col p-2">
            {headerData.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`rounded-md px-4 py-3 text-sm uppercase tracking-wide transition-colors ${
                  pathUrl === item.href
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => setNavbarOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/submit"
              className="mt-4 mx-2 inline-flex items-center justify-center rounded-lg bg-white text-black px-4 py-2 font-medium hover:bg-white/90"
              onClick={() => setNavbarOpen(false)}
            >
              Submit Demo
            </Link>
          </nav>
        </div>
      </header>
      {/* spacer para não esconder o conteúdo atrás do header fixo */}
      <div className="h-20" />
    </>
  );
};

export default Header;
