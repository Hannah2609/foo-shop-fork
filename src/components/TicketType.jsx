import React from "react";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

function TicketType({
  setVipAmount, 
  vipAmount, 
  setTicketAmount, 
  ticketAmount,
  setTickets, 
  priceVip,
  priceRegular,
  setError,
  totalAmount
}) {


  return (
    <fieldset className="mb-8 lg:mb-10">
      <h2
        className={`${bebasNeue.className} text-3xl md:text-4xl text-fooYellow-200 mb-10`}
      >
        VÆLG DINE BILLETTER
      </h2>

      {/* FOO-BILLET sektion */}
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium text-lg md:text-2xl">FOO-BILLET</h3>
          <p className="text-base md:text-lg text-fooGrey-200">799 DKK</p>
        </div>

        <label className="flex items-center" htmlFor="foo-billet">
          {/* FJERN 1 FOO-BILLET  */}
          <button
            type="button"
            aria-label={`Fjern 1 foo-billet`}
            onClick={() => {
              if (ticketAmount > 0) {
                setTicketAmount(ticketAmount - 1);
                // rettelse - tilføjet
                setError("");
                setTickets((obj) => {
                  const removeFromBasket = obj.findIndex(
                    (ticket) => ticket.price === priceRegular
                  );
                  if (removeFromBasket !== -1) {
                    return obj.filter((_, index) => index !== removeFromBasket);
                  } else {
                    return obj;
                  }
                });
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              className="bi bi-dash-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
          </button>

          {/* INPUT FOO-BILLET */}
          {/* gamle kode */}
          {/* <input
            className="text-black mx-4 appearance-none border p-2 rounded w-20"
            type="number"
            min={0}
            name="billet"
            id="foo-billet"
            value={ticketAmount}
          /> */}
          {/* rettelse, tilføjet onChange handler*/}
          <input
            className="text-black mx-4 appearance-none border p-2 rounded w-20"
            type="number"
            min={0}
            max={10}
            name="billet"
            id="foo-billet"
            value={ticketAmount}
          />

          {/* TILFØJ 1 FOO-BILLet */}
          <button
            type="button"
            aria-label={`Tilføj 1 foo-billet`}
            onClick={() => {
              if (totalAmount < 10) {
                setTicketAmount(ticketAmount + 1);
                //  rettelse - tilføjet
                setError("");
                setTickets((obj) =>
                  obj.concat({
                    ticketName: "FOO-billet",
                    id: obj.length,
                    price: priceRegular,
                  })
                );
                // Rettelse - tilføjet if else med max amount
              } else {
                setError("Du kan maks købe 10 billetter pr. person");
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              className="bi bi-plus-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
          </button>
        </label>
      </div>

      {/* VIP-BILLET sektion */}
      <div className="flex justify-between mt-10">
        <div>
          <h3 className="font-medium text-lg md:text-2xl">VIP-BILLET</h3>
          <p className="text-base md:text-lg text-fooGrey-200">1299 DKK</p>
        </div>
        <label className="flex items-center" htmlFor="vip-billet">
          {/* FJERN 1 VIP-billet  */}
          <button
            type="button"
            aria-label={`Fjern 1 VIP-billet`}
            onClick={() => {
              if (vipAmount > 0) {
                setVipAmount(vipAmount - 1);
                // rettelse - tilføjet
                setError("");
                setTickets((obj) => {
                  const removeFromBasket = obj.findIndex(
                    (ticket) => ticket.price === priceVip
                  );
                  if (removeFromBasket !== -1) {
                    return obj.filter((_, index) => index !== removeFromBasket);
                  } else {
                    return obj;
                  }
                });
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              className="bi bi-dash-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
          </button>

          {/* INPUT VIP */}
          {/* <input
            className="text-black mx-4 appearance-none border p-2 rounded w-20"
            type="number"
            name="billet"
            id="vip-billet"
            min={0}
            value={vipAmount}
          /> */}
          {/* rettelse, tilføjet onChange handler*/}
          <input
            className="text-black mx-4 appearance-none border p-2 rounded w-20"
            type="number"
            min={0}
            max={10}
            name="billet"
            id="foo-billet"
            value={vipAmount}
          />

          {/* TILFØJ 1 VIP-billet  */}
          <button
            type="button"
            aria-label={`Tilføj 1 VIP-billet`}
            onClick={() => {
              if (totalAmount < 10) {
                setVipAmount(vipAmount + 1);
                setError("");
                setTickets((obj) =>
                  obj.concat({
                    ticketName: "VIP-billet",
                    id: obj.length,
                    price: priceVip,
                  })
                );
                // Rettelse - tilføjet if else med max amount
              } else {
                setError("Du kan maks købe 10 billetter pr. person");
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              className="bi bi-plus-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
          </button>
        </label>
      </div>
    </fieldset>
  );
}

export default TicketType;
