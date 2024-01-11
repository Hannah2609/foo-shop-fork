import React from "react";
import { Bebas_Neue } from "next/font/google";
import { useState, useEffect } from "react";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

function Info({ tickets, setStep }) {
  const [infoForm, setInfoForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    errors: {},
  });

  const handleChange = (e) => {
    setInfoForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBtn = () => {
    if (
      infoForm.firstName &&
      infoForm.lastName &&
      infoForm.email &&
      infoForm.phone
    ) {
      console.log("info is valid!");
      setStep((prevStep) => prevStep + 1);
    } else {
      console.log("info not valid");
    }
  };

  return (
    <fieldset id="infoStep">
      <legend
        className={`${bebasNeue.className} text-3xl md:text-4xl text-fooYellow-200 `}
      >
        INFORMATION
      </legend>
      <p className="text-sm text-fooGrey-200 mb-10">
        UDFYLD INFORMATION TIL DIN BILLET
      </p>

      {tickets.map((ticket, index) => (
        <div
          className="container mx-auto border-b border-white mb-6 pb-4"
          key={ticket.id}
        >

          <h2
            className={`${bebasNeue.className} text-2xl text-fooYellow-200 `}
          >
            {ticket.ticketName}
          </h2>

          <p className="text-base mb-6 uppercase font-medium">
            Festivalgæst nr. {ticket.id + 1}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

            <div>
              <label
                htmlFor={`firstName${ticket.id}`}
                className="w-full text-sm text-fooGrey-200 "
              >
                Fornavn
                <input
                  type="text"
                  placeholder="Fornavn"
                  className="p-2 rounded-lg w-full  text-black border-2 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                  id={`firstName${ticket.id}`}
                  //Rettelse
                  value={infoForm[index] && infoForm.firstName}
                  onChange={handleChange}
                  name="firstName"
                  minLength={2}
                  required
                ></input>{" "}
              </label>
            </div>

            <div>
              <label
                htmlFor={`lastName${ticket.id}`}
                className="w-full text-sm text-fooGrey-200"
              >
                Efternavn
                <input
                  type="text"
                  placeholder="Efternavn"
                  className="p-2 rounded-lg w-full  text-black border-2 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                  id={`lastName${ticket.id}`}
                  //Rettelse
                  value={infoForm[index] && infoForm.lastName}
                  onChange={handleChange}
                  name="lastName"
                  required
                ></input>{" "}
              </label>
            </div>


            <div>
              <label
                htmlFor={`email${ticket.id}`}
                className="w-full text-sm text-fooGrey-200"
              >
                Email
                <input
                  type="email"
                  placeholder="eksempel@mail.com"
                  id={`email${ticket.id}`}
                  name="email"
                  //Rettelse
                  value={infoForm[index] && infoForm.email}
                  onChange={handleChange}
                  className="p-2 rounded-lg w-full  text-black border-2 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                  required
                ></input>{" "}
              </label>
            </div>


            <div>
              <label
                htmlFor={`phone${ticket.id}`}
                className="w-full text-sm text-fooGrey-200"
              >
                Telefon
                <input
                  type="tel"
                  placeholder="12 34 56 78"
                  className="p-2 rounded-lg w-full  text-black border-2 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                  id={`phone${ticket.id}`}
                  name="phone"
                  //Rettelse
                  value={infoForm[index] && infoForm.phone}
                  onChange={handleChange}
                  required
                ></input>{" "}
              </label>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-end">


        <button
          className="font-medium enabled:bg-fooPink-900 aria-disabled:bg-fooPink-900 aria-disabled:opacity-50 p-4 px-8 rounded-full w-full md:w-fit mt-10 transition ease-in-out enabled:hover:-translate-y-1 enabled:hover:scale-110 enabled:hover:bg-fooPink-800 duration-300 enabled:cursor-pointer aria-disabled:cursor-not-allowed
              "
          aria-disabled={
            infoForm.firstName === "" ||
            infoForm.lastName === "" ||
            infoForm.email === "" ||
            infoForm.phone === ""
          }
          onClick={handleBtn}
        >
          GÅ TIL BETALING
        </button>

      </div>

    </fieldset>
  );
}

export default Info;
