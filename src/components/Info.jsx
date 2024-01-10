import React, { useState } from "react";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

function Info({ tickets, setStep }) {
  const [infoForms, setInfoForms] = useState(() =>
    tickets.map(() => ({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      errors: {},
    }))
  );

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setInfoForms((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[index] = { ...updatedForms[index], [name]: value };
      return updatedForms;
    });
  };

  const handleBtn = () => {
    const isValid = infoForms.every(
      (form) => form.firstName && form.lastName && form.email && form.phone
    );

    if (isValid) {
      console.log("All info is valid!");
      setStep((prevStep) => prevStep + 1);
    } else {
      console.log("Some info is not valid");
    }
  };

  return (
    <fieldset id="infoStep">
      <h2
        className={`${bebasNeue.className} text-3xl md:text-4xl text-fooYellow-200 `}
      >
        INFORMATION
      </h2>
      <p className="text-sm text-fooGrey-200 mb-10">
        UDFYLD INFORMATION TIL DIN BILLET
      </p>

      {tickets.map((ticket, index) => (
        <div
          className="container mx-auto border-b border-white mb-6 pb-4"
          key={ticket.id}
        >
          <legend
            className={`${bebasNeue.className} text-2xl text-fooYellow-200 `}
          >
            {ticket.ticketName}
          </legend>
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
              </label>

              <input
                type="text"
                placeholder="Fornavn"
                className="p-2 rounded-lg w-full  text-black border-2 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                id={`firstName${ticket.id}`}
                value={infoForms[index] && infoForms[index].firstName}
                onChange={(e) => handleChange(index, e)}
                name="firstName"
                minLength={2}
                required
              ></input>
            </div>
            <div>
              <label
                htmlFor={`lastName${ticket.id}`}
                className="w-full text-sm text-fooGrey-200"
              >
                Efternavn
              </label>
              <input
                type="text"
                placeholder="Efternavn"
                className="p-2 rounded-lg w-full  text-black border-2 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                id={`lastName${ticket.id}`}
                value={infoForms[index] && infoForms[index].lastName}
                onChange={(e) => handleChange(index, e)}
                name="lastName"
                required
              ></input>
            </div>
            <div>
              <label
                htmlFor={`email${ticket.id}`}
                className="w-full text-sm text-fooGrey-200"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="eksempel@mail.com"
                id={`email${ticket.id}`}
                name="email"
                value={infoForms[index] && infoForms[index].email}
                onChange={(e) => handleChange(index, e)}
                className="p-2 rounded-lg w-full  text-black border-2 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                required
              ></input>
            </div>
            <div>
              <label
                htmlFor={`phone${ticket.id}`}
                className="w-full text-sm text-fooGrey-200"
              >
                Telefon
              </label>
              <input
                type="tel"
                placeholder="12 34 56 78"
                className="p-2 rounded-lg w-full  text-black border-2 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                id={`phone${ticket.id}`}
                name="phone"
                value={infoForms[index] && infoForms[index].phone}
                onChange={(e) => handleChange(index, e)}
                required
              ></input>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          className="font-medium enabled:bg-fooPink-900 aria-disabled:bg-fooPink-900 aria-disabled:opacity-50 p-4 px-8 rounded-full w-full md:w-fit mt-10 transition ease-in-out enabled:hover:-translate-y-1 enabled:hover:scale-110 enabled:hover:bg-fooPink-800 duration-300 enabled:cursor-pointer aria-disabled:cursor-not-allowed
              "
          aria-disabled={
            !infoForms.every(
              (form) =>
                form.firstName && form.lastName && form.email && form.phone
            )
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
