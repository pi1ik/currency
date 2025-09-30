import Link from "next/link";

export default function Header() {
  const links = [
    { label: "CSR", href: "/profile" },
    { label: "SSR", href: "/top" },
    { label: "SSG", href: "/about" },
    { label: "ISR", href: "/trending" },
  ];
  return (
    <header className="fixed z-5 w-full top-0">
      <nav className="flex w-full justify-end items-center gap-5 md:gap-10  p-3 bg-(--background) bg-[url(../../public/noise.svg)] shadow-[inset_0px_-2px_5px_rgba(0,0,0,0.3),0px_5px_10px_rgba(0,0,0,0.3)] border-b border-black/30">
        {links.map((link, i) => {
          return (
            <Link
              key={i}
              href={link.href}
              className="p-2 px-2 md:p-2 md:px-6 text-xs xs:text-xs sm:text-sm md:text-base rounded-lg uppercase font-extralight block shadow-custom-3-8 shadow-custom-3-8-hover border-[2px] border-black/20 active:bg-black/10 w-1/5 md:w-fit h-fit text-center"
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
