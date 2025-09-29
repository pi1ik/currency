"use client";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalForm from "./ModalForm";
import {
  IModalHTMLFormControlsCollection,
  MessageProps,
  ModalProps,
} from "../_types/types";
export default function Modal({ show, onCloseButtonClick }: ModalProps) {
  const [messages, setMessages] = React.useState<string[]>([]);
  const [chatComponents, setChatComponents] = React.useState<
    React.JSX.Element[]
  >([]);
  const divRef = React.useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    showLastMessages();
  }, []);
  useEffect(() => {
    console.log("re-render modal");
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseButtonClick();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCloseButtonClick]);

  const showLastMessages = () => {
    setTimeout(() => {
      divRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 3);
  };
  const createImage = (image: File) => {
    const imageSrc = URL.createObjectURL(image);
    return (
      <Image
        src={imageSrc}
        alt={image.name}
        width={100}
        height={100}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  };
  const UserMessage = ({ text, img }: MessageProps) => {
    const messageImg = img ? (
      <div className="self-end rounded-lg p-3 max-w-1/2 max-h-1/2 bg-white/1 shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(255,255,255,0.07)]">
        {" "}
        {createImage(img)}{" "}
      </div>
    ) : null;
    return (
      <>
        {" "}
        {messageImg}{" "}
        {text && (
          <div className="self-end rounded-lg p-3 max-w-2/3 h-fit bg-white/1 wrap-break-word shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(255,255,255,0.07)]">
            {" "}
            {text}{" "}
          </div>
        )}{" "}
        <div ref={divRef} />{" "}
      </>
    );
  };
  const MemoizedUserMessage = React.memo(UserMessage);
  const ManagerMessage = ({ text, img }: MessageProps) => {
    const messageImg = img ? (
      <div className="self-start rounded-lg p-5 max-w-1/2 max-h-1/2 bg-black/7 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(255,255,255,0.07)]">
        {" "}
        {createImage(img)}{" "}
      </div>
    ) : null;
    return (
      <>
        {" "}
        {messageImg}{" "}
        {text && (
          <div className="self-start rounded-lg p-5 max-w-2/3 h-fit bg-black/7 wrap-break-word shadow-[inset_3px_3px_6px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(255,255,255,0.07)]">
            {" "}
            {text}{" "}
          </div>
        )}{" "}
        <div ref={divRef} />{" "}
      </>
    );
  };
  const MemoizedManagerMessage = React.memo(ManagerMessage);
  const addUserMessage = useCallback(
    (txt: string, i: number, img?: File) => {
      const newMessage = <MemoizedUserMessage text={txt} img={img} key={i} />;
      setChatComponents([...chatComponents, newMessage]);
    },
    [chatComponents, MemoizedUserMessage]
  );
  const addManagerMessage = useCallback(
    (txt: string, i: number, img?: File) => {
      const newMessage = (
        <MemoizedManagerMessage text={txt} img={img} key={i} />
      );
      setChatComponents([...chatComponents, newMessage]);
    },
    [chatComponents, MemoizedManagerMessage]
  );
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget
      .elements as IModalHTMLFormControlsCollection;
    const file =
      formElements.msgfile.files.length > 0
        ? formElements.msgfile.files[0]
        : null;
    const newMessage = formElements.msg.value;
    const newChatMessages = [...messages];

    if (newMessage && file) {
      newChatMessages.push(newMessage);
      addUserMessage(newMessage, newChatMessages.length, file);
    } else if (newMessage) {
      newChatMessages.push(newMessage);
      addUserMessage(newMessage, newChatMessages.length);
    } else if (file) {
      newChatMessages.push("img");
      addUserMessage("", newChatMessages.length, file);
    }
    setMessages(newChatMessages);
    formElements.msg.value = "";
  };
  useEffect(() => {
    showLastMessages();
  }, [chatComponents]);
  if (!show) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      {" "}
      <div className="flex flex-col gap-5 bg-(--background) bg-[url(../../public/noise.svg)] rounded-xl shadow-lg p-8 w-full max-w-3xl relative">
        {" "}
        <button
          onClick={onCloseButtonClick}
          className="absolute top-4 right-5 text-white hover:text-white/60 text-2xl cursor-pointer"
        >
          {" "}
          ✖︎{" "}
        </button>{" "}
        <h2 className="uppercase text-2xl font-extralight">
          {" "}
          Консультант-онлайн{" "}
        </h2>{" "}
        <div
          id="chat-area"
          className="flex flex-col overflow-y-auto text-md font-extralight gap-4 w-full h-[50vh] p-5 rounded-lg shadow-[inset_3px_3px_7px_rgba(0,0,0,0.3),inset_-3px_-3px_7px_rgba(255,255,255,0.07)]"
        >
          {" "}
          {chatComponents}{" "}
        </div>{" "}
        <ModalForm submitFn={handleSubmit} />{" "}
      </div>{" "}
    </div>,
    document.body
  );
}
