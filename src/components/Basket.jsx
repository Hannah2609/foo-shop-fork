"use client";
import { useState } from "react";
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

function Basket(props) {
  let vipTotal = props.vipAmount * props.priceVIP;
  let regularTotal = props.ticketAmount * props.priceRegular;
  let twoPersonTentTotal = props.twoPersonTentAmount * props.twoPersonTentPrice;
  let threePersonTentTotal =
    props.threePersonTentAmount * props.threePersonTentPrice;

  const bookingFee = 99;

  // sætter GreenCampingTotal til at være greenCampingPrice, hvis greenCamping er true, hvis den er false sætter prisen til 0.
  let greenCampingTotal = props.greenCampingPrice;

  if (props.greenCamping === true) {
    greenCampingTotal = 249;
  } else {
    greenCampingTotal = 0;
  }

  const total =
    vipTotal +
    regularTotal +
    greenCampingTotal +
    twoPersonTentTotal +
    threePersonTentTotal +
    bookingFee;

  const ticketsTotal = vipTotal + regularTotal;

  const [basket, setBasket] = useState(false);

  return (
    <aside className="bg-fooGrey-900 fixed rounded-none mt-11 lg:static bottom-0 lg:rounded-large p-8 lg:p-10 flex flex-col w-screen lg:w-80 lg:m-10">
      <section className={`${basket ? "block mb-5" : "hidden lg:block"}`}>
        <div>
          <h2 className={`${bebasNeue.className} text-3xl text-fooYellow-200 `}>
            DIN KURV
          </h2>
          <div className="mb-4 mt-4">
            {(props.ticketAmount > 0 || props.vipAmount > 0) && (
              <h3
                className={`${bebasNeue.className} text-xl text-fooYellow-200`}
              >
                BILLETTER
              </h3>
            )}
            {props.ticketAmount > 0 && (
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-base md:text-lg font-medium`}>
                    FOO-BILLET
                  </p>
                  <p className={`text-sm text-fooGrey-200`}>
                    {props.priceRegular} DKK
                  </p>
                </div>
                <p className={`text-xl`}>x {props.ticketAmount}</p>
              </div>
            )}
            {props.vipAmount > 0 && (
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-base md:text-lg font-medium`}>
                    VIP-BILLET
                  </p>
                  <p className={`text-sm text-fooGrey-200`}>
                    {props.priceVIP} DKK
                  </p>
                </div>
                <p className={`text-xl`}>x {props.vipAmount}</p>
              </div>
            )}
          </div>

          {props.ticketAmount === 0 && props.vipAmount === 0 && (
            <div className="flex flex-col gap-2 items-center pt-6 pb-6">
              <Image
                src={"emptyBasket.svg"}
                width={100}
                height={100}
                alt="empty basket svg"
              />
              <p className="text-fooGrey-200 text-sm">Kurven er tom</p>
            </div>
          )}

          {props.selectedArea && (
            <div className="pt-4 mb-4 border-t">
              <h3
                className={`${bebasNeue.className} text-xl text-fooYellow-200`}
              >
                CAMPING OMRÅDE
              </h3>
              <p className="font-medium uppercase text-base md:text-lg">
                {props.selectedArea}
              </p>
            </div>
          )}
        </div>
        <div className="pt-4 border-t">
          <h4 className="text-sm font-bold mb-1">OVERSIGT</h4>

          <div className="flex justify-between text-sm text-fooGrey-200">
            <p>Billetter x {props.totalAmount}</p> <p> {ticketsTotal} DKK</p>
          </div>

          {props.twoPersonTentAmount > 0 && (
            <div className="flex justify-between text-sm">
              <p className="text-fooGrey-200 text-sm">
                2 personers telt x {props.twoPersonTentAmount}
              </p>
              <p className="text-fooGrey-200 text-sm">
                {twoPersonTentTotal} DKK
              </p>
            </div>
          )}

          {props.threePersonTentAmount > 0 && (
            <div className="flex justify-between text-sm text-fooGrey-200">
              <p>3 personers telt x {props.threePersonTentAmount}</p>
              <p>{threePersonTentTotal} DKK</p>
            </div>
          )}

          {props.greenCamping === true && (
            <div className="flex justify-between text-sm text-fooGrey-200">
              <p>Green camping</p>
              <p>{props.greenCampingPrice} DKK</p>
            </div>
          )}

          <div className="flex justify-between text-sm text-fooGrey-200">
            <p>Booking gebyr</p> <p>{bookingFee} DKK</p>
          </div>
        </div>
      </section>
      <section className="flex justify-between lg:block">
        <div className="flex justify-between text-lg font-medium mt-4 gap-5">
          <h3 className="font-bold">I ALT</h3> <h3>{total} DKK</h3>
        </div>
        <div className="lg:hidden">
          <button className="mt-3" onClick={() => setBasket(!basket)}>
            {basket ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-arrow-down-circle"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-arrow-up-circle"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
                />
              </svg>
            )}
          </button>
        </div>
      </section>
    </aside>
  );
}

export default Basket;
