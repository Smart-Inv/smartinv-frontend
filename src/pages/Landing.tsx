import NavBar from "../components/NavBar";
import "../styles/App.css";
import RequestDemo from "../components/sections/landing/RequestDemo";
import Footer from "../components/Footer";
import AboutUs from "../components/sections/landing/AboutUs";
import HowTo from "../components/sections/landing/HowTo";
import Main from "../components/sections/landing/Main";

function Landing() {
  return (
    <>
      <NavBar />

      {/*To generate background with dots */}
      <div
        className="absolute top-0 left-0 w-screen h-[200vh] -z-10"
        style={{
          backgroundColor: 'white',
          backgroundImage: 'radial-gradient(#CCCCCC 1px, transparent 0)',
          backgroundSize: '20px 20px',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
        }}
      />

      <Main />

      <RequestDemo
        primaryText={"¿Preparado para transformar tu negocio?"}
        secondaryText={"Únete a SmartInv y quítate el dolor de cabeza a la hora de manejar tu inventario."}
      />

      <AboutUs />

      <HowTo />

      <RequestDemo
        primaryText={"¿A qué esperas? Pide ya una demo"}
        secondaryText={"Únete a SmartInv y quítate el dolor de cabeza a la hora de manejar tu inventario."}
      />

      <Footer />
    </>
  );
}

export default Landing;
