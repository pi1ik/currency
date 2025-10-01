import Link from "next/link";
import { InfoCardProps } from "../_types/types";

export default function InfoCard({ title, description, date }: InfoCardProps) {
  return (
    <div className="flex flex-col items-center text-center rounded-xl p-5 md:p-10 border-[2px] border-black/20 shadow-[7px_7px_15px_rgba(0,0,0,0.25),-7px_-7px_15px_rgba(255,255,255,0.07)] mb-[40px]">
      <h2 className="uppercase font-extralight text-2xl xs:text-3xl sm:text-4xl  text-center mb-[10px] md:mb-[20px]">
        {title}
      </h2>
      <p className="text-center font-light text-sm md:text-base">
        {description}
      </p>

      {date ? (
        <p className="text-center w-fit p-5 px-10 font-light mt-[10px] md:mt-[20px] uppercase text-base md:text-lg shadow-img-wrapper rounded-full border-[2px] border-black/20 ">
          Дата последнего обновления:{" "}
          <span className="font-semibold text-xl">{date}</span>
        </p>
      ) : null}
      <Link
        href={"/"}
        className="p-2 px-2 md:p-2 md:px-6 w-full mt-[10px] md:mt-[20px] text-sm xs:text-base sm:text-lg md:text-lg rounded-lg uppercase font-extralight block shadow-custom-3-8 shadow-custom-3-8-hover border-[2px] border-black/20 active:bg-black/10 w-1/5 md:w-fit h-fit text-center md:hidden"
      >
        На главную
      </Link>
    </div>
  );
}
