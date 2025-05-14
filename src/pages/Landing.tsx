import NavBar from "../components/NavBar";
import "../styles/App.css";
import RequestDemo from "../components/RequestDemo";

function Landing() {
  return (
    <>
      <NavBar />
      <div className="w-screen bg-[url('img/dotGrid.png')] bg-cover bg-center">
        <section className="w-full pt-24 lg:pt-20 flex items-center justify-center flex-col lg:flex-row">
          <div className="w-2/4 lg:text-left text-center">
            <h2 className="font-extrabold text-3xl mb-3">
              Tu gestor de inventarios personalizado y potenciado con
              <span className="bg-gradient-to-r from-dark-red to-light-red bg-clip-text text-transparent">
                {' '}Inteligencia Artificial
              </span>
            </h2>
            <p className="text-md lg:w-3/4 w-full">
              Ofreciendo a tu comercio información predictiva personalizada para gestionar el stock y aumentar su rentabilidad.
            </p>
          </div>
          <img
            className="lg:w-1/3 md:w-2/4 w-4/5"
            src="img/cube.png"
            alt="A cube in 3D with graphs and data displayed"
          />
        </section>
        <section className="w-full pt-20 lg:pt-16 flex items-center justify-center flex-col lg:flex-row">
          <RequestDemo 
            primaryText={"¿Preparado para transformar tu negocio?"} 
            secondaryText={"Únete a SmartInv y quítate el dolor de cabeza a la hora de manejar tu inventario."} 
          />
        </section>
      </div>
    </>
  );
}

export default Landing;