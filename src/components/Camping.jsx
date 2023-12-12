import React from "react";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

function Camping(props) {
  // Funktion til håndtering af ændringer i valgte campingområde
  const handleSelectArea = (event) => {
    const selectedAreaId = event.target.value;
    props.setSelectedArea(selectedAreaId);
  };

  const totalTwoTentAmount = props.twoPersonTentAmount;
  const totalThreeTentAmount = props.threePersonTentAmount;

  return (
    <fieldset>
      {/* VÆLG CAMPING AREA */}
      <div>
        <h2
          className={`${bebasNeue.className} text-2xl md:text-4xl text-fooYellow-200 mb-2`}
        >
          VÆLG CAMPING OMRÅDE
        </h2>
        <p className="text-sm text-fooGrey-200">CAMPING RESEVERTATION 99 DKK</p>
        <div className="flex flex-wrap gap-6 mt-8">
          {props.campingAreas
            .filter((spot) => spot.available > props.totalAmount)
            .map((spot) => (
              <div key={spot.area} className="flex gap-2 items-center ">
                <input
                  className="hidden peer "
                  type="radio"
                  id={spot.area}
                  value={spot.area}
                  name="camping"
                  onChange={handleSelectArea}
                />
                <label
                  htmlFor={spot.area}
                  className="font-medium text-xl uppercase items-center justify-between w-48 cursor-pointer p-5 text-fooGrey-300 bg-fooGrey-900 border border-fooGrey-900 rounded-lg  peer-checked:border-fooPink-900 peer-checked:text-fooWhite-900 hover:text-white hover:bg-fooPink-800"
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
      <div className="flex justify-between mt-12">
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
                <h3 className="font-medium text-lg">
                  2 PERSONERS TELT
                  <p className="text-sm text-fooGrey-200">
                    + {props.twoPersonTentPrice} DKK
                  </p>
                </h3>
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
                    class="bi bi-dash-circle"
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
                    props.setTwoPersonTentAmount(props.twoPersonTentAmount + 1);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    class="bi bi-plus-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                  </svg>
                </button>
              </div>
            </label>

            <label htmlFor="telt3" className="flex justify-between">
              <div>
                <h3 className="font-medium text-lg">
                  3 PERSONERS TELT{" "}
                  <p className="text-sm text-fooGrey-200">
                    + {props.threePersonTentPrice} DKK{" "}
                  </p>
                </h3>
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
                    class="bi bi-dash-circle"
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
                    props.setThreePersonTentAmount(
                      props.threePersonTentAmount + 1
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    class="bi bi-plus-circle-fill"
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
        <div>
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
            <label htmlFor="green" className="font-medium text-lg">
              GRØN CAMPING
              <p className="text-sm text-fooGrey-200">
                + {props.greenCampingPrice} DKK
              </p>
            </label>
          </div>
        </div>
      </div>
    </fieldset>
  );
}

export default Camping;
