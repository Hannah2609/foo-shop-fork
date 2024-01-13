import React from "react";
import { Bebas_Neue } from "next/font/google";
import ToolTip from "./ToolTip";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

function Camping(props) {
  // Funktion til håndtering af ændringer i valgte campingområde
  const handleSelectArea = (event) => {
    props.setSelectedArea(event.target.value);
  };

  const totalTwoTentAmount = props.twoPersonTentAmount;
  const totalThreeTentAmount = props.threePersonTentAmount;



  return (
    <fieldset>
      {/* VÆLG CAMPING AREA */}
      <div>
        <legend
          className={`${bebasNeue.className} text-3xl md:text-4xl text-fooYellow-200 mb-2`}
        >
          VÆLG CAMPING OMRÅDE
        </legend>
        <div className="flex">
          <p className="text-sm text-fooGrey-200">
            CAMPING RESEVERTATION 99 DKK
          </p>
          <ToolTip text={"Information om grøn camping som er lidt lang"} />
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-6 mt-8">
          {props.campingAreas
            .filter((spot) => spot.available > props.totalAmount)
            .map((spot) => (
              <div key={spot.area} className="gap-1 flex items-center sm:gap-2">
                <input
                  className="hidden peer"
                  type="radio"
                  id={spot.area}
                  value={spot.area}
                  name="camping"
                  onChange={handleSelectArea}
                  required
                />
                <label
                  htmlFor={spot.area}
                  className="w-36 text-lg font-medium uppercase items-center sm:justify-between cursor-pointer p-4 text-fooGrey-300 bg-fooGrey-900 border border-fooGrey-900 rounded-lg sm:w-48 sm:text-xl sm:p-5 peer-checked:border-fooPink-900 peer-checked:text-fooWhite-900 hover:text-white hover:bg-fooPink-800"
                >
                  {spot.area}
                  <p className="text-xs text-fooGreen-200">
                    {spot.available} ledige pladser
                  </p>
                </label>
              </div>
            ))}
        </div>
      </div>
      {/* TILKØB TELTE */}
      <div className="flex flex-wrap justify-between mt-12">
        <div>
          <h2
            className={`${bebasNeue.className} text-2xl text-fooYellow-200 mb-2 `}
          >
            TILKØB AF TELTE
          </h2>
          <p className="text-sm text-fooGrey-200">
            INKL. OPSÆTNING AF TELT PÅ PLADSEN
          </p>
          <div className="flex flex-col gap-4 mt-6">
            <label
              htmlFor="telt2"
              className="flex justify-between content-center gap-10"
            >
              <div>
                <h3 className="font-medium text-base sm:text-lg">
                  2 PERSONERS TELT
                </h3>
                <p className="text-sm text-fooGrey-200">
                  + {props.twoPersonTentPrice} DKK
                </p>
              </div>
              {/* FJERN 2 perstelt */}
              <div className="flex items-center">
                <button
                  type="button"
                  aria-label={`Fjern 1x 2-personers telt`}
                  onClick={() => {
                    if (props.twoPersonTentAmount > 0) {
                      props.setTwoPersonTentAmount(
                        props.twoPersonTentAmount - 1
                      );
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-dash-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                  </svg>
                </button>
                {/* INPUT TELT-2 */}
                <input
                  className="text-black mx-4 appearance-none border px-1 rounded w-10"
                  type="number"
                  id="telt2"
                  value={totalTwoTentAmount}
                  name="telt"
                  min={0}
                />{" "}
                {/* TILFØJ 2 pers telt */}
                <button
                  type="button"
                  aria-label={`Tilføj 1x 2-personers telt`}
                  onClick={() => {
                    if (
                      totalThreeTentAmount + totalTwoTentAmount <
                      props.totalAmount
                    ) {
                      props.setTwoPersonTentAmount(
                        props.twoPersonTentAmount + 1
                      );
                    } else {
                      console.log("nope");
                      props.setError(
                        "Du kan maks vælge samme antal telte som billetter"
                      );
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-plus-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                  </svg>
                </button>
              </div>
            </label>

            <label htmlFor="telt3" className="flex justify-between">
              <div>
                <h3 className="font-medium text-base sm:text-lg">
                  3 PERSONERS TELT{" "}
                </h3>
                <p className="text-sm text-fooGrey-200">
                  + {props.threePersonTentPrice} DKK{" "}
                </p>
              </div>
              <div className="flex items-center">
                {/* FJERN 1x 3-pers telt */}
                <button
                  type="button"
                  aria-label={`Fjern 1x 3-personers telt`}
                  onClick={() => {
                    if (props.threePersonTentAmount > 0) {
                      props.setThreePersonTentAmount(
                        props.threePersonTentAmount - 1
                      );
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-dash-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                  </svg>
                </button>
                {/* INPUT 3-pers telt */}
                <input
                  className="text-black mx-4 appearance-none border px-1 rounded w-10"
                  type="number"
                  id="telt3"
                  name="telt"
                  value={totalThreeTentAmount}
                  min={0}
                />

                {/* TILFØJ 3-pers telt */}
                <button
                  type="button"
                  aria-label={`Tilføj 1x 3-personers telt`}
                  onClick={() => {
                    if (
                      totalThreeTentAmount + totalTwoTentAmount <
                      props.totalAmount
                    ) {
                      props.setThreePersonTentAmount(totalThreeTentAmount + 1);
                    } else {
                      console.log("nope");
                      props.setError(
                        "Du kan maks vælge samme antal telte som billetter"
                      );
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-plus-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                  </svg>
                </button>
              </div>
            </label>
          </div>
        </div>

        {/* GREEN CAMPING */}
        <div className="mt-10">
          <h2
            className={`${bebasNeue.className} text-2xl text-fooYellow-200 mb-2`}
          >
            TILVALG
          </h2>
          <div className="flex justify-between items-center gap-4">
            <input
              className="w-6 h-6"
              type="checkbox"
              name="green"
              id="green"
              checked={props.greenCamping}
              onChange={() => props.setGreenCamping((prevValue) => !prevValue)}
            />
            <div className="flex items-start">
              <label
                htmlFor="green"
                className="font-medium text-base sm:text-lg"
              >
                GRØN CAMPING
                <p className="text-sm text-fooGrey-200">
                  + {props.greenCampingPrice} DKK
                </p>
              </label>
              <ToolTip text={"Information om grøn camping som er lidt lang"} />
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
}

export default Camping;
