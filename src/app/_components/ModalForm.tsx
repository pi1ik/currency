import Image from "next/image";
import React from "react";

type ModalFormProps = {
  submitFn?: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function ModalForm({ submitFn }: ModalFormProps) {
  const [msg, setMsg] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [filePreview, setFilePreview] = React.useState<string | null>(null);

  const socketRef = React.useRef<WebSocket | null>(null);

  React.useEffect(() => {
    const socket = new WebSocket("ws://echo.websocket.events");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket открыт");
    };

    socket.onmessage = (event) => {
      console.log("Получено:", event.data);
    };

    socket.onerror = (err) => {
      console.error("Ошибка сокета:", err);
    };

    socket.onclose = () => {
      console.log("WebSocket закрыт");
    };

    return () => socket.close();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length && e.currentTarget.files?.length > 0) {
      const selectedFile = e.currentTarget.files[0];
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setFilePreview(null);
    }
  };

  const clearFile = () => {
    setFile(null);
    setFilePreview(null);
    const fileInput = document.getElementById("msgfile") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Отправляем текст
    if (msg && socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "text", data: msg }));
    }

    // Отправляем файл
    if (file && socketRef.current?.readyState === WebSocket.OPEN) {
      const reader = new FileReader();
      reader.onload = () => {
        socketRef.current?.send(
          JSON.stringify({ type: "file", name: file.name, data: reader.result })
        );
      };
      reader.readAsDataURL(file);
    }

    submitFn?.(e);
    setMsg("");
    clearFile();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 rounded-full h-15 p-3 w-full shadow-[inset_3px_3px_6px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(255,255,255,0.07)]"
    >
      <input
        id="msgfile"
        type="file"
        name="msgfile"
        className="hidden"
        accept="image/png, image/jpg, image/jpeg"
        onChange={handleFileChange}
      />
      <div className="relative h-full w-15">
        {file ? (
          <span className="absolute top-[-4px] right-[0px] text-sm">⏺︎</span>
        ) : null}
        <label
          htmlFor="msgfile"
          className="relative p-2 h-full w-15 rounded-full uppercase font-extralight block cursor-pointer shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(255,255,255,0.07)]"
        >
          <Image
            src="/paper_clip.svg"
            alt="прикрепить файл"
            width={20}
            height={20}
            style={{ width: "100%", height: "100%" }}
          />
        </label>
      </div>
      <input
        placeholder="Сообщение"
        name="msg"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        className="h-full w-full mx-3 px-2 focus-visible:outline focus-visible:outline-white/30"
      />
      {filePreview && (
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src={filePreview}
            alt="preview"
            fill
            className="rounded object-cover"
          />
          <button
            type="button"
            onClick={clearFile}
            className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>
      )}
      <button
        type="submit"
        disabled={!msg && !file}
        className="px-5 h-full rounded-full uppercase font-extralight block w-fit cursor-pointer shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(255,255,255,0.07)] disabled:opacity-50"
      >
        Отправить
      </button>
    </form>
  );
}
