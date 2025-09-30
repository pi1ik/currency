"use client";
import Image from "next/image";
import React, { memo, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalForm from "./ModalForm";
import {
  IModalHTMLFormControlsCollection,
  MessageProps,
  ModalProps,
} from "../_types/types";

function Modal({ show, onCloseButtonClick }: ModalProps) {
  console.log("render modal");
  const [chatComponents, setChatComponents] = React.useState<
    React.JSX.Element[]
  >([]);
  const divRef = React.useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    showLastMessages();
  }, [chatComponents]);

  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    }
    if (!show) {
      document.body.classList.remove("overflow-hidden");
    }
  }, [show]);

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
        width={0}
        height={0}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  };

  const UserMessage = ({ text, img }: MessageProps) => {
    const messageImg = img ? (
      <div className="self-end rounded-lg p-3 max-w-1/2 max-h-1/2 bg-white/3 border-[2px] border-black/20 shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(255,255,255,0.07)]">
        {createImage(img)}
      </div>
    ) : null;

    return (
      <>
        {messageImg}
        {text && (
          <div className="self-end rounded-lg p-3 max-w-2/3 h-fit bg-white/3 border-[2px] border-black/20 break-words shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(255,255,255,0.07)]">
            {text}
          </div>
        )}
        <div ref={divRef} />
      </>
    );
  };

  const MemoizedUserMessage = React.memo(UserMessage);

  const ManagerMessage = ({ text, img }: MessageProps) => {
    const messageImg = img ? (
      <div className="self-start rounded-lg p-5 max-w-1/2 max-h-1/2 bg-black/20 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(255,255,255,0.07)]">
        {createImage(img)}
      </div>
    ) : null;

    return (
      <>
        {messageImg}
        {text && (
          <div className="self-start rounded-lg p-5 max-w-2/3 h-fit bg-black/20 break-words shadow-[inset_3px_3px_6px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(255,255,255,0.07)]">
            {text}
          </div>
        )}
        <div ref={divRef} />
      </>
    );
  };

  const MemoizedManagerMessage = React.memo(ManagerMessage);

  const addUserMessage = useCallback(
    (txt: string, img?: File) => {
      const newMessage = (
        <MemoizedUserMessage
          text={txt}
          img={img}
          key={`user-${Date.now()}-${Math.random()}`}
        />
      );
      setChatComponents((prev) => [...prev, newMessage]);
    },
    [MemoizedUserMessage]
  );

  const addManagerMessage = useCallback(
    (txt: string, img?: File) => {
      const newMessage = (
        <MemoizedManagerMessage
          text={txt}
          img={img}
          key={`manager-${Date.now()}-${Math.random()}`}
        />
      );
      setChatComponents((prev) => [...prev, newMessage]);
    },
    [MemoizedManagerMessage]
  );

  const textReplies = [
    "Спасибо за ваше сообщение! Мы внимательно его изучим и скоро ответим.",
    "Ваш текст получен, менеджер скоро подключится к чату.",
    "Мы прочитали ваш запрос и постараемся помочь как можно быстрее.",
  ];

  const fileReplies = [
    "Мы получили ваш файл, проверим его и дадим обратную связь.",
    "Файл успешно загружен! Передадим его специалисту.",
    "Ваш файл сохранён, менеджер скоро его посмотрит.",
  ];

  const textAndFileReplies = [
    "Спасибо за текст и файл! Всё получено и уже в работе.",
    "Мы приняли и сообщение, и файл. Менеджер подключится в ближайшее время.",
    "Ваш запрос и файл доставлены — ожидайте помощи от специалиста.",
  ];

  function getRandomReply(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget
      .elements as IModalHTMLFormControlsCollection;

    const file =
      formElements.msgfile.files.length > 0
        ? formElements.msgfile.files[0]
        : undefined;
    const newMessage = formElements.msg.value;

    if (newMessage || file) {
      addUserMessage(newMessage, file);
    }

    try {
      const payload = {
        title: newMessage || "Файл",
        body: file ? `Отправлен файл: ${file.name}` : "Без файла",
        userId: 1,
      };

      console.log("Отправляем POST:", payload);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("Ответ сервера:", data);

      let reply = "";
      if (newMessage && file) {
        reply = getRandomReply(textAndFileReplies);
      } else if (newMessage) {
        reply = getRandomReply(textReplies);
      } else if (file) {
        reply = getRandomReply(fileReplies);
      }

      if (reply) {
        addManagerMessage(reply);
      }
    } catch (err) {
      console.error("Ошибка запроса:", err);
      addManagerMessage("Ошибка при отправке на сервер");
    }
  };

  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center ">
      <div className="flex flex-col gap-5 bg-(--background) bg-[url(../../public/noise.svg)] border-[2px] border-black/20 rounded-xl shadow-lg p-8 w-full max-w-3xl relative">
        <button
          onClick={onCloseButtonClick}
          className="absolute top-4 right-5 text-white hover:text-white/60 text-2xl cursor-pointer"
        >
          ✖︎
        </button>
        <h2 className="uppercase text-2xl font-extralight">
          Консультант-онлайн
        </h2>
        <div
          id="chat-area"
          className="flex flex-col overflow-y-auto text-md font-extralight gap-4 w-full h-[50vh] p-5 rounded-lg border-[2px] border-black/20 shadow-[inset_3px_3px_7px_rgba(0,0,0,0.3),inset_-3px_-3px_7px_rgba(255,255,255,0.07)]"
        >
          {chatComponents}
        </div>
        <ModalForm submitFn={handleSubmit} />
      </div>
    </div>,
    document.body
  );
}
export default memo(Modal);
