import Image from "next/image";
import React from "react";
import useModal from "../_hooks/useModal";
import Modal from "./Modal";

export default function ProfileCard() {
  const { isShowing: isShowingModal, toggle: toggleModal } = useModal();

  return (
    <div className="flex flex-col gap-[20px] h-fit box-border p-5 relative rounded-xl shadow-[7px_7px_15px_rgba(0,0,0,0.25),-7px_-7px_15px_rgba(255,255,255,0.07)]">
      <Modal show={isShowingModal} onCloseButtonClick={toggleModal} />
      <div className="flex justify-end gap-5 md:gap-10 lg:gap-5 xl:gap-10 w-full">
        <div className="w-1/2 sm:w-2/3 flex flex-col justify-between">
          <div>
            <h2 className="uppercase text-2xl font-extralight text-right">
              Nickname
            </h2>
            <h3 className="uppercase font-extralight text-right">
              <span className="text-md text-white/70">Всего в избранном:</span>
              <span className="text-lg  text-left ml-[20px]">5</span>
            </h3>
          </div>

          <button
            onClick={toggleModal}
            className=" p-3 px-8 rounded-lg uppercase font-extralight block w-fit shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(255,255,255,0.07)]"
          >
            онлайн-консультант
          </button>
        </div>

        <div className="relative p-5 md:p-7 lg:p-5 w-1/2 sm:w-1/3 object-contain relative rounded-full shadow-[inset_3px_3px_7px_rgba(0,0,0,0.25),inset_-3px_-3px_7px_rgba(255,255,255,0.07)]">
          <div className="relative object-contain rounded-full w-fit h-fit">
            <Image
              src="/globe.svg"
              alt="изображение токена"
              width={100}
              height={100}
              style={{
                objectFit: "fill",
                width: "100%",
                position: "static",
                borderRadius: "100%",
                boxShadow:
                  "3px 3px 8px rgba(0,0,0,0.25), -3px -3px 8px rgba(255,255,255,0.07)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
