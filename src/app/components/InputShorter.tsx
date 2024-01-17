import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import useDarkMode from "use-dark-mode";

export const InputShorter = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copiedMessage, setCopiedMessage] = useState("");
  const [error, setError] = useState("");
  const { value: isDarkMode } = useDarkMode(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const shortenUrl = async () => {
    // Validar si el campo de entrada está vacío
    if (!originalUrl.trim()) {
      setError("¡Debes ingresar una URL!");
      return;
    }

    const response = await fetch("/api/shorter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await response.json();
    setShortenedUrl(data.shortenedUrl);
    setError(""); // Limpiar el mensaje de error si existe
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl).then(
      function () {
        setCopiedMessage("¡Link copiado!");
        setTimeout(() => {
          setCopiedMessage("");
        }, 3000);
      },
      function (err) {
        console.error("No se pudo copiar al portapapeles: ", err);
      }
    );
  };
  const ImgColorBlack = () => {
    return (
      <svg
        viewBox="0 0 24 24"
        width="5em"
        height="5em"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M21 18L14.9339 13.8837M11.7895 11.75L7 8.5M21 5.5L7 15M8 6.5C8 7.88071 6.88071 9 5.5 9C4.11929 9 3 7.88071 3 6.5C3 5.11929 4.11929 4 5.5 4C6.88071 4 8 5.11929 8 6.5ZM8 17C8 15.6193 6.88071 14.5 5.5 14.5C4.11929 14.5 3 15.6193 3 17C3 18.3807 4.11929 19.5 5.5 19.5C6.88071 19.5 8 18.3807 8 17Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
    );
  };
  const ImgColorWhite = () => {
    return (
      <svg
        viewBox="0 0 24 24"
        width="5em"
        height="5em"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M21 18L14.9339 13.8837M11.7895 11.75L7 8.5M21 5.5L7 15M8 6.5C8 7.88071 6.88071 9 5.5 9C4.11929 9 3 7.88071 3 6.5C3 5.11929 4.11929 4 5.5 4C6.88071 4 8 5.11929 8 6.5ZM8 17C8 15.6193 6.88071 14.5 5.5 14.5C4.11929 14.5 3 15.6193 3 17C3 18.3807 4.11929 19.5 5.5 19.5C6.88071 19.5 8 18.3807 8 17Z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
    );
  };
  return (
    <>
      <a
        onClick={onOpen}
        className="transition-all cursor-pointer  duration-1000 dark:bg-white bg-[#1a45db] hover:bg-[#387af9] dark:hover:bg-[#387af9] hover:shadow-xl m-2 p-4 relative z-40 group  "
      >
        <div className="bg-[#387af9]]/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  "></div>
        <div className="py-2 px-9 relative  ">
          {isDarkMode ? <ImgColorBlack /> : <ImgColorWhite />}
          <h3 className="mt-8 text-lg font-semibold text-white dark:text-black group-hover:text-white ">
            Acortador de Link
          </h3>
          <p className="mt-4 text-base  text-gray-300 dark:text-gray-600 group-hover:text-white  ">
            Ingresa cualquier URL y se te ofrecerá un link acortado que te
            redirecciona.
          </p>
        </div>
      </a>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.3,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Acortador de links
              </ModalHeader>
              <ModalBody>
                <div className="w-full  mt-4">
                  <div className="flex flex-col  sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem] rounded-xl shadow-md">
                      <input
                        id="email"
                        type="text"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=""
                        required
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        ejemplo.com
                      </label>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <button
                        onClick={shortenUrl}
                        type="submit"
                        className="group relative h-10 w-full sm:w-48 overflow-hidden rounded-[7px] bg-[#162255] text-lg font-bold text-white"
                      >
                        Acortar
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-[7px] transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                      </button>
                    </div>

                    {error && (
                      <p className="text-red-500 mt-2 text-sm">{error}</p>
                    )}
                  </div>

                  <div className="w-80 mt-4 sm:mt-0 text-center ">
                    {shortenedUrl && (
                      <div className="relative mt-6 w-full flex flex-col rounded-xl dark:bg-white bg-black bg-clip-border text-gray-700 shadow-md">
                        <div className="p-6">
                          <h5 className="mb-2 block font-sans text-xl dark:text-black text-white font-semibold leading-snug tracking-normal antialiased">
                            Link acortado:
                          </h5>
                          <a
                            href={shortenedUrl}
                            target="_blank"
                            className="block font-sans dark:text-black text-white text-base font-light leading-relaxed text-inherit antialiased"
                          >
                            {shortenedUrl}
                          </a>
                        </div>
                        <div className="p-6 pt-0">
                          <button
                            className="flex select-none items-center gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            onClick={copyToClipboard}
                          >
                            {copiedMessage ? (
                              <span className="mr-2">{copiedMessage}</span>
                            ) : (
                              <span>Copiar </span>
                            )}
                            <img
                              width="28"
                              height="28"
                              className="bg-white dark:text-black"
                              src="https://img.icons8.com/material-sharp/48/copy.png"
                              alt="copy"
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
