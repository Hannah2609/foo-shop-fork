"use client";
import React from "react";
import Camping from "./Camping";
import TicketType from "./TicketType";
import Info from "./Info";
import { useState, useEffect } from "react";
import Basket from "./Basket";
import Payment from "./Payment";
import EndPage from "./EndPage";
import FinalOverview from "./FinalOverview";
import Timer from "./Timer";

function Wrapper() {
  // Skift mellem views ud fra steps
  const [step, setStep] = useState(0);

  // priser billetter
  const priceVip = 1299;
  const priceRegular = 799;

  // priser camping & tilføjelser
  const greenCampingPrice = 249;
  const twoPersonTentPrice = 299;
  const threePersonTentPrice = 399;

  // Camping område valgt
  const [selectedArea, setSelectedArea] = useState(null);

  const campingBtnDisabled = selectedArea === null;
  const [error, setError] = useState("");


  // antal telt tilføjelser
  const [twoPersonTentAmount, setTwoPersonTentAmount] = useState(0);
  const [threePersonTentAmount, setThreePersonTentAmount] = useState(0);
  const [greenCamping, setGreenCamping] = useState(false);

  // antal billetter
  const [ticketAmount, setTicketAmount] = useState(0);
  const [vipAmount, setVipAmount] = useState(0);

  const [tickets, setTickets] = useState([]);

  let totalAmount = vipAmount + ticketAmount;

  // sætter ID fra resevationen
  const [reservationId, setReservationId] = useState("");

  // GET REQUEST - henter ledige billetter til camping
  const [campingAreas, setCampingAreas] = useState([]);
  useEffect(() => {
    fetch("https://robust-ionized-tartan.glitch.me/available-spots")
      .then((res) => res.json())
      .then((data) => {
        setCampingAreas(data);
      });
  }, []);

  // PUT REQUEST - sender reservation med amount + area
  async function reserveSpot() {
    let headersList = {
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      area: selectedArea,
      amount: totalAmount,
    });

    let response = await fetch(
      "https://robust-ionized-tartan.glitch.me/reserve-spot",
      {
        method: "PUT",
        body: bodyContent,
        headers: headersList,
      }
    );

    let booking = await response.json();
    setReservationId(booking.id);

    console.log(booking);
  }

  // POST REQUEST - sender endelig bestilling med reservations ID
  async function submit(evt) {
    evt.preventDefault();

    //send data til supabase
    let formData = new FormData(evt.target);

    let supabaseBody = JSON.stringify({
      fornavn: formData.get("firstName"),
      efternavn: formData.get("lastName"),
      email: formData.get("email"),
      telefon: formData.get("phone"),
      camping: formData.get("camping"),
      antal_billetter: totalAmount,
    });

    let supabaseHeader = {
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJldW53eWV1c2JvYnVuc2VibHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI0NzAxNzMsImV4cCI6MjAxODA0NjE3M30.NaRWaxVddNisvlzKaRGppZzKLBUNpOp3Zjl2qt_XXqA",
      Accept: "application/json",
      Prefer: "return=representation",
      "Content-Type": "application/json",
    };

    let supabaseResponse = await fetch(
      "https://reunwyeusbobunseblqs.supabase.co/rest/v1/foofest-data",
      {
        method: "POST",
        body: supabaseBody,
        headers: supabaseHeader,
      }
    );

    //resever billetter

    let reserveHeader = {
      "Content-Type": "application/json",
    };

    let reserveBody = JSON.stringify({ id: reservationId });

    let reserveResponse = await fetch(
      "https://robust-ionized-tartan.glitch.me/fullfill-reservation",
      {
        method: "POST",
        body: reserveBody,
        headers: reserveHeader,
      }
    );

    setStep((prevStep) => prevStep + 1);

    let supabaseData = await supabaseResponse.json();
    console.log(supabaseData);
    let reserveData = await reserveResponse.json();
    console.log(reserveData);
  }

  return (
    <>
      {step !== 0 && step !== 1 && step !== 5 && (
        <Timer step={step} setStep={setStep} />
      )}
      <main className="flex flex-wrap justify-center xl:mx-20">
        <form
          onSubmit={submit}
          id="bookingForm"
          className="w-full lg:w-4/6 mb-40 lg:mb-1"
        >
          <div
            className={`flex flex-col m-10 sm:px-10 ${
              step === 0 ? "" : "hidden"
            }`}
          >
            <TicketType
              setVipAmount={setVipAmount}
              vipAmount={vipAmount}
              setTicketAmount={setTicketAmount}
              ticketAmount={ticketAmount}
              tickets={tickets}
              setTickets={setTickets}
              priceRegular={priceRegular}
              priceVip={priceVip}
              // rettelse
              setError={setError}
              totalAmount={totalAmount}
            />

            <p className="text-right mt-4 text-red-500">{error}</p>
            <button
              className="font-medium enabled:bg-fooPink-800 aria-disabled:bg-fooPink-800 aria-disabled:opacity-50 mt-10 p-4 px-8 rounded-full w-full md:w-fit place-self-end transition ease-in-out enabled:hover:-translate-y-1 enabled:hover:scale-110 enabled:hover:bg-fooPink-900 aria-duration-300 enabled:cursor-pointer aria-disabled:cursor-not-allowed
              "
              aria-label="Vælg camping"
              aria-disabled={totalAmount < 1 || totalAmount > 10}
              onClick={() => {
                if (totalAmount < 1) {
                  setError("Du skal vælge en billet!");
                } else if (totalAmount > 10) {
                  setError("Du kan maks vælge 10 billetter!");
                } else {
                  setStep((prevStep) => prevStep + 1);
                  setError("");
                }
              }}
            >
              VÆLG CAMPING
            </button>
          </div>

          <div
            className={`flex flex-col m-10 sm:px-10 ${
              step === 1 ? "" : "hidden"
            }`}
          >
            <Camping
              setStep={setStep}
              campingAreas={campingAreas}
              totalAmount={totalAmount}
              setTickets={setTickets}
              setSelectedArea={setSelectedArea}
              greenCampingPrice={greenCampingPrice}
              greenCamping={greenCamping}
              setGreenCamping={setGreenCamping}
              twoPersonTentPrice={twoPersonTentPrice}
              setTwoPersonTentAmount={setTwoPersonTentAmount}
              setThreePersonTentAmount={setThreePersonTentAmount}
              twoPersonTentAmount={twoPersonTentAmount}
              threePersonTentAmount={threePersonTentAmount}
              threePersonTentPrice={threePersonTentPrice}
              error={error}
              setError={setError}
            />
            <p className="text-right mt-6 text-red-500">{error}</p>
            <button
              className="font-medium enabled:bg-fooPink-800 aria-disabled:bg-fooPink-800 aria-disabled:opacity-50 p-4 px-8 rounded-full w-full md:w-fit mt-10 place-self-end transition ease-in-out enabled:hover:-translate-y-1 enabled:hover:scale-110 enabled:hover:bg-fooPink-900 duration-300 enabled:cursor-pointer disabled:cursor-not-allowed
              "
              aria-label="Reserver billetter"
              aria-disabled={campingBtnDisabled}
              onClick={() => {
                if (selectedArea === null) {
                  setError("Du skal vælge et campingområde!");
                } else {
                  setStep((prevStep) => prevStep + 1);
                  reserveSpot();
                  setError("");
                }
              }}
            >
              RESERVER BILLETTER
            </button>
          </div>

          <div
            className={`flex flex-col m-10 sm:px-10 ${
              step === 2 ? "" : "hidden"
            }`}
          >
            <Info
              setStep={setStep}
              campingAreas={campingAreas}
              tickets={tickets}
            />
          </div>

          <div
            className={`flex flex-col m-10 sm:px-10 ${
              step === 3 ? "" : "hidden"
            }`}
          >
            <Payment setStep={setStep} />
          </div>

          {step === 4 && (
            <div className="flex flex-col m-10 sm:mx-40 p-10 align-center place-self-center rounded-large bg-fooGrey-900">
              <FinalOverview
                vipAmount={vipAmount}
                ticketAmount={ticketAmount}
                greenCamping={greenCamping}
                setGreenCamping={setGreenCamping}
                twoPersonTentAmount={twoPersonTentAmount}
                threePersonTentAmount={threePersonTentAmount}
                priceVIP={priceVip}
                totalAmount={totalAmount}
                priceRegular={priceRegular}
                greenCampingPrice={greenCampingPrice}
                threePersonTentPrice={threePersonTentPrice}
                twoPersonTentPrice={twoPersonTentPrice}
                selectedArea={selectedArea}
              />
              <button
                type="submit"
                id="bookingForm"
                aria-label="Gennemfør køb"
                className="font-medium enabled:bg-fooPink-800 aria-disabled:bg-fooPink-800 aria-disabled:opacity-50 w-full p-4 px-8 rounded-full mt-6 place-self-end transition ease-in-out enabled:hover:-translate-y-1 enabled:hover:scale-110 enabled:hover:bg-fooPink-900 duration-300 enabled:cursor-pointer aria-disabled:cursor-not-allowed
              "
              >
                GENNEMFØR KØB
              </button>
            </div>
          )}
        </form>

        {step === 5 && <EndPage tickets={tickets} />}

        {step < 4 && (
          <div className="w-full lg:w-2/6">
            <Basket
              vipAmount={vipAmount}
              ticketAmount={ticketAmount}
              greenCamping={greenCamping}
              setGreenCamping={setGreenCamping}
              twoPersonTentAmount={twoPersonTentAmount}
              threePersonTentAmount={threePersonTentAmount}
              priceVIP={priceVip}
              totalAmount={totalAmount}
              priceRegular={priceRegular}
              greenCampingPrice={greenCampingPrice}
              threePersonTentPrice={threePersonTentPrice}
              twoPersonTentPrice={twoPersonTentPrice}
              selectedArea={selectedArea}
            />
          </div>
        )}
      </main>
    </>
  );
}
export default Wrapper;
