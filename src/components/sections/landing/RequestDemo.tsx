import Button from "../../Button";

type Props = {
  primaryText: string,
  secondaryText: string
}

const RequestDemo = ({ primaryText, secondaryText } : Props) => {
  return (
    <section className="w-full pt-14 lg:pt-10 flex items-center justify-center flex-col lg:flex-row">
      <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 flex flex-col items-center justify-center gap-2.5 
      rounded-2xl bg-light-red py-4 md:py-6 px-4 md:px-8 mx-auto my-8">
        <h6 className="text-white font-bold text-xl md:text-2xl text-center">{primaryText}</h6>
        <p className="text-white text-sm md:text-base text-center max-w-lg">{secondaryText}</p>
        <Button
          textColor="text-light-red"
          bgColor="bg-white"
          className="mt-2 md:mt-4 px-6 py-2 md:py-3 text-sm md:text-base"
          onClick={() => window.location.href = "mailto:jmartinpizarro04@gmail.com"}
        >
          Pide una demo
        </Button>
      </div>
    </section >
  )
}

export default RequestDemo;