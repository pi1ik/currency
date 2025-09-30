import Image from "next/image";
import React from "react";
import useModal from "../_hooks/useModal";
import Modal from "./Modal";

type ProfileCardProps = {
  favQuantity: number;
  toggleModal: () => void;
};

function ProfileCard({ favQuantity, toggleModal }: ProfileCardProps) {
  console.log("render profile card");

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-20 w-full h-fit box-border p-5 relative rounded-xl border-[2px] border-black/20 shadow-[7px_7px_15px_rgba(0,0,0,0.25),-7px_-7px_15px_rgba(255,255,255,0.07)]">
      <h3 className="uppercase font-extralight text-center sm:text-right">
        <span className="text-md text-white/70">Всего в избранном:</span>
        <span className="text-lg  text-left ml-[20px]">{favQuantity}</span>
      </h3>

      <button
        onClick={toggleModal}
        className=" p-3 px-8 rounded-lg uppercase font-extralight block w-fit shadow-custom-3-8 shadow-custom-3-8-hover border-[2px] border-black/20 cursor-pointer"
      >
        Онлайн-консультация
      </button>
    </div>
  );
}
export default React.memo(ProfileCard);
