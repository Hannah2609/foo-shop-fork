import React from "react";
import { Bebas_Neue } from "next/font/google";
import Image from "next/image";


const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

function FinalOverview(props) {
  let vipTotal = props.vipAmount * props.priceVIP;
  let regularTotal = props.ticketAmount * props.priceRegular;
  let twoPersonTentTotal = props.twoPersonTentAmount * props.twoPersonTentPrice;
  let threePersonTentTotal =
    props.threePersonTentAmount * props.threePersonTentPrice;

  const bookingFee = 99;

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

 
  return (
    <aside>
      <div>
        <h2
          className={`${bebasNeue.className} text-3xl md:text-4xl text-fooYellow-200 mb-4`}
        >
          DIN BESTILLING
        </h2>

        <div className="mb-4 mt-2">
          {(props.ticketAmount > 0 || props.vipAmount > 0) && (
            <h3 className={`${bebasNeue.className} text-xl text-fooYellow-200`}>
              BILLETTER
            </h3>
          )}
          {props.ticketAmount > 0 && (
            <div className="flex justify-between items-center">
              <div>
                <p className={`text-base md:text-lg font-medium`}>FOO-BILLET</p>
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
                <p className={`text-base md:text-lg font-medium`}>VIP-BILLET</p>
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
              alt="Kurven er tom"
            />
            <p className="text-fooGrey-200 text-sm">Kurven er tom</p>
          </div>
        )}

        {props.selectedArea && (
          <div className="pt-4 mb-4 border-t">
            <h3 className={`${bebasNeue.className} text-xl text-fooYellow-200`}>
              CAMPING OMRÅDE
            </h3>
            <p className="font-medium uppercase text-base md:text-lg">
              {props.selectedArea}
            </p>
          </div>
        )}
      </div>
      <div>
        <div className="pt-4 border-t">
          <h4 className="text-base font-bold mb-1">OVERSIGT</h4>

          <div className="flex justify-between text-sm md:text-base text-fooGrey-200">
            <p>Billetter x {props.totalAmount}</p> <p> {ticketsTotal} DKK</p>
          </div>

          {props.twoPersonTentAmount > 0 && (
            <div className="flex justify-between text-sm md:text-base">
              <p className="text-fooGrey-200 text-sm md:text-base">
                2 personers telt x {props.twoPersonTentAmount}
              </p>
              <p className="text-fooGrey-200 text-sm md:text-base">
                {twoPersonTentTotal} DKK
              </p>
            </div>
          )}

          {props.threePersonTentAmount > 0 && (
            <div className="flex justify-between text-sm md:text-base text-fooGrey-200">
              <p>3 personers telt x {props.threePersonTentAmount}</p>
              <p>{threePersonTentTotal} DKK</p>
            </div>
          )}

          {props.greenCamping === true && (
            <div className="flex justify-between text-sm md:text-base text-fooGrey-200">
              <p>Green camping</p>
              <p>{props.greenCampingPrice} DKK</p>
            </div>
          )}

          <div className="flex justify-between text-sm md:text-base text-fooGrey-200">
            <p>Booking gebyr</p> <p>{bookingFee} DKK</p>
          </div>
        </div>

        <div className="flex justify-between text-2xl md:text-3xl font-semibold mt-8">
          <h3>I alt</h3> <h3>{total} DKK</h3>
        </div>
      </div>


        <label htmlFor="jatak" className="text-sm flex gap-2 items-center mt-6 cursor-pointer">
          <input type="checkbox" id="jatak" required className="w-3 h-3" />
          Jeg accepterer købsbetingelser
        </label>

    </aside>
  );
}
export default FinalOverview;
