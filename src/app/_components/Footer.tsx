import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex justify-center my-5 text-white/50">
      API provided by
      <Link
        href="https://www.coingecko.com/"
        className="underline uppercase ml-2"
      >
        coingeko
      </Link>
    </div>
  );
}
