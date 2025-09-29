import Link from "next/link";

export default function Header() {
  const links = [
    { label: "Профиль (CSR)", href: "/profile" },
    { label: "Топ-10 (SSR)", href: "/top" },
    { label: "Историческая справка (SSG)", href: "/about" },
    { label: "Популярное (ISR)", href: "/trending" },
  ];
  return (
    <header className="fixed z-5 w-full top-0">
      <nav className="flex  justify-end gap-10  p-5 bg-(--background) bg-[url(../../public/noise.svg)] shadow-[inset_0px_-7px_15px_rgba(0,0,0,0.3),0px_7px_15px_rgba(0,0,0,0.3)] border-b border-black/30">
        {links.map((link, i) => {
          return (
            <Link
              key={i}
              href={link.href}
              className="p-3 px-8 rounded-lg uppercase font-extralight block w-fit shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(255,255,255,0.07)]"
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
