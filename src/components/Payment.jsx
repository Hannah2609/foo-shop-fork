import React from "react";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useState } from "react";
import Cards from "react-credit-cards-2";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

function Payment({ setStep }) {
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    errors: {},
  });

  const handleChange = (e) => {
    setCardInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleInputFocus = (evt) => {
    setCardInfo((prev) => ({ ...prev, focus: evt.target.name }));
  };

  // Input card expiry onKeyUp handler
  const handleCardExpiry = (e) => {
    let expiryDate = e.target.value;

    if (e.keyCode !== 8) {
      if (expiryDate > 1 && expiryDate.length === 1) {
        expiryDate = "0" + expiryDate + "/";
      } else if (expiryDate.length === 2) {
        expiryDate = expiryDate + "/";
      }

      setCardInfo({ ...cardInfo, expiry: expiryDate });
    } else {
      setCardInfo({ ...cardInfo, expiry: "" });
    }
  };

  // Input onKeyDown numbers only handler
  const handleNumbersOnly = (e) => {
    let flag;

    if (
      e.keyCode === 8 ||
      e.keyCode === 9 ||
      (e.keyCode === 16 && e.keyCode >= 9) ||
      e.keyCode === 37 ||
      e.keyCode === 39 ||
      e.keyCode === 46 ||
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      (e.keyCode >= 96 && e.keyCode <= 105)
    ) {
      flag = false;
    } else {
      flag = true;
    }

    if (flag) {
      e.preventDefault();
    }
  };

  const handleBtn = () => {
    if (cardInfo.number && cardInfo.name && cardInfo.expiry && cardInfo.cvc) {
      console.log("payment is valid!");
      setStep((prevStep) => prevStep + 1);
    } else {
      console.log("payment not valid");
    }
  };

  return (
    <fieldset>
      <legend
        className={`${bebasNeue.className} text-3xl md:text-4xl text-fooYellow-200 mb-10`}
      >
        BETALINGSOPLYSNINGER
      </legend>
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-8 items-center ">
        <div>
          <Cards
            number={cardInfo.number}
            expiry={cardInfo.expiry}
            cvc={cardInfo.cvc}
            name={cardInfo.name}
            focused={cardInfo.focus}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <label htmlFor="number" className=" w-full text-sm text-fooGrey-200">
            Kortnummer
            <input
              className="p-2 rounded-lg w-full  text-black border-2 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
              unique="cardNumber"
              placeholder="Kort nummer"
              minLength={16}
              maxLength={16}
              name="number"
              id="number"
              value={cardInfo.number}
              onKeyDown={handleNumbersOnly}
              onChange={handleChange}
              onFocus={handleInputFocus}
              required
            />
          </label>

          <label htmlFor="name" className=" w-full text-sm text-fooGrey-200">
            Kortholder navn
            <input
              className="p-2 rounded-lg w-full  text-black border-2 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
              type="text"
              placeholder="Kortholder navn"
              name="name"
              id="name"
              autoComplete="true"
              minLength={2}
              value={cardInfo.name}
              onChange={handleChange}
              onFocus={handleInputFocus}
              required
            />
          </label>

          <div className="flex gap-4 w-full">
            <label htmlFor="expiry" className="text-sm text-fooGrey-200">
              Udløbsdato
              <input
                className="p-2 rounded-lg w-full  text-black border-2 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                unique="cardExpiry"
                placeholder="MM/ÅÅ"
                maxLength="5"
                name="expiry"
                id="expiry"
                value={cardInfo.expiry}
                onKeyDown={handleNumbersOnly}
                onKeyUp={handleCardExpiry}
                onChange={handleChange}
                onFocus={handleInputFocus}
                required
              />
            </label>

            <label htmlFor="cvc" className="text-sm text-fooGrey-200">
              Kontrolcifre
              <input
                className="p-2 rounded-lg w-full  text-black border-2 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                unique="cardCvc"
                placeholder="CVC"
                maxLength="4"
                name="cvc"
                id="cvc"
                value={cardInfo.cvc}
                onChange={handleChange}
                onFocus={handleInputFocus}
                required
              />
            </label>
          </div>
          
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="font-medium enabled:bg-fooPink-900 aria-disabled:bg-fooPink-900 aria-disabled:opacity-50 p-4 px-8 rounded-full w-full md:w-fit mt-10  place-self-end transition ease-in-out enabled:hover:-translate-y-1 enabled:hover:scale-110 enabled:hover:bg-fooPink-800 duration-300 enabled:cursor-pointer aria-disabled:cursor-not-allowed
              "
          aria-disabled={
            cardInfo.number === "" ||
            cardInfo.name === "" ||
            cardInfo.expiry === "" ||
            cardInfo.cvc === ""
          }
          onClick={handleBtn}
        >
          SE OVERBLIK OG BETAL
        </button>
      </div>
    </fieldset>
  );
}

export default Payment;
