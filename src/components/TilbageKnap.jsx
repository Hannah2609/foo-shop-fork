import React from 'react'

function TilbageKnap({setStep}) {
  return (
    <button
      className="font-medium enabled:bg-fooGrey-900 text-fooGrey-200 p-4 px-8 rounded-full w-full md:w-fit mt-4 lg:mt-10 place-self-end transition ease-in-out enabled:hover:-translate-y-1 enabled:hover:scale-110 enabled:hover:bg-fooPink-900 duration-300 enabled:cursor-pointer
              "
      aria-label="Gå tilbage"
      onClick={() => {
        setStep((prevStep) => prevStep - 1);
      }}
    >
      GÅ TILBAGE
    </button>
  );
}

export default TilbageKnap