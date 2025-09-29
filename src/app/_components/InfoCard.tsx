import { InfoCardProps } from "../_types/types";

export default function InfoCard({ title, description, date }: InfoCardProps) {
  return (
    <div className="flex flex-col items-center text-center rounded-xl p-10 shadow-[7px_7px_15px_rgba(0,0,0,0.25),-7px_-7px_15px_rgba(255,255,255,0.07)] mb-[40px]">
      <h2 className="uppercase font-extralight text-4xl text-center mb-[20px]">
        {title}
      </h2>
      <p className="text-center font-light">{description}</p>
      <p className="text-center w-fit p-5 px-10 font-light mt-[20px] uppercase text-lg shadow-[inset_3px_3px_7px_rgba(0,0,0,0.25),inset_-3px_-3px_7px_rgba(255,255,255,0.07)] rounded-full">
        Дата последнего обновления:{" "}
        <span className="font-semibold text-xl">{date}</span>
      </p>
    </div>
  );
}
