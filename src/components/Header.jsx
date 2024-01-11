import React from "react";
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

function Header() {
  return (
    <header>
      <div className="flex justify-between bg-fooGrey-900 pt-4 pb-2 overflow-hidden">
        <div className="ml-7 md:ml-10">
          <h1
            className={`text-5xl md:text-7xl ${bebasNeue.className} text-fooYellow-200 mt-4`}
          >
            FOOFEST 2024
          </h1>
          <p className="text-lg md:text-xl mb-2 text-fooGrey-200">10.07.2024 - 17.07.2024</p>
        </div>
        <Image
          src="/logo.svg"
          width={200}
          height={200}
          alt="logo svg"
          className=" -mr-16 -mb-4 md:-mb-8 "
        />
      </div>
      <hr className="p-1 bg-fooPink-900 w-screen border-none"></hr>
    </header>
  );
}

export default Header;
