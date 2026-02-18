"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HeaderItem } from "../../../../types/menu"; // ajuste o caminho se preciso

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const liRef = useRef<HTMLLIElement>(null);

  const isActive =
    path === item.href ||
    (item.href !== "/" && path.startsWith(item.href + "/"));

  const baseLink =
    "relative px-3 py-2 rounded-md text-sm uppercase tracking-wide transition-colors duration-150";
  const colors =
    "text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40";
  const active = isActive ? "text-white" : "";

  const handleMouseEnter = () => item.submenu && setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  const handleKeyDown: React.KeyboardEventHandler<HTMLAnchorElement> = (e) => {
    if (!item.submenu) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    }
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <li
      ref={liRef}
      className={`relative ${item.submenu ? "has-submenu" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className={`${baseLink} ${colors} ${active}`}
        aria-haspopup={item.submenu ? "menu" : undefined}
        aria-expanded={item.submenu ? open : undefined}
        onKeyDown={handleKeyDown}
      >
        {item.label}
        {item.submenu && (
          <span
            aria-hidden
            className={`ml-1 inline-block transition-transform ${open ? "rotate-180" : ""
              }`}
          >
            ▼
          </span>
        )}

        {/* sublinhado discreto quando ativo */}
        {isActive && (
          <span className="pointer-events-none absolute left-3 right-3 -bottom-[3px] h-[2px] bg-white/70 rounded-full" />
        )}
      </Link>

      {item.submenu && (
        <div
          className={`${open ? "block" : "hidden"
            } absolute left-0 top-[calc(100%+8px)] w-56 rounded-lg border border-white/10 bg-black/90 backdrop-blur p-2 shadow-lg`}
          role="menu"
        >
          {item.submenu.map((sub, i) => {
            const subActive = path === sub.href;
            return (
              <Link
                key={i}
                href={sub.href}
                role="menuitem"
                className={`block rounded-md px-3 py-2 text-sm transition-colors ${subActive
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                onClick={() => setOpen(false)}
              >
                {sub.label}
              </Link>
            );
          })}
        </div>
      )}
    </li>
  );
};

export default HeaderLink;
