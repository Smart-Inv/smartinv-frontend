import NavBar from "../components/NavBar";
import "../styles/App.css";
import RequestDemo from "../components/RequestDemo";

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

      <section className="w-full pt-24 lg:pt-20 flex items-center justify-center flex-col lg:flex-row">
        <div className="w-2/4 lg:text-left text-center">
          <h2 className="font-extrabold text-3xl mb-3 mx-auto lg:mx-0 sm:max-w-3/4">
            Tu gestor de inventarios personalizado y potenciado con
            <span className="bg-gradient-to-r from-dark-red to-light-red bg-clip-text text-transparent">
              {' '}Inteligencia Artificial
            </span>
          </h2>
          <p className="text-md lg:w-3/4 w-full font-medium">
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

      <section id="aboutSmartInv" className="w-full scroll-mt-20 py-20 lg:pt-16 flex items-center justify-center flex-col gap-4">
        <h3 className="text-center font-extrabold text-3xl">¿Cómo funciona <span className="text-light-red">SmartInv</span>?</h3>

        <p className="text-center font-medium text-md w-2/4">Nuestro equipo se encarga de procesar tus datos, haciendo un modelo de IA para generar predicciones con gran precisión y realizar estadísticas sobre tu negocio: pasadas y futuras</p>

        <img
          draggable="false"
          className="w-4/5 lg:w-4/5 mt-4"
          src="img/diagram.png"
          alt="A diagram that explains how SmartInv works"
        />
      </section>

      <section
        className="w-full py-20 lg:pt-16 flex items-center justify-center flex-col gap-6 lg:px-20"
      >
        <h2 className="text-2xl lg:text-3xl font-extrabold text-center bg-gradient-to-r from-dark-red to-light-red bg-clip-text text-transparent">
          Tres pasos. Un solo proceso.
        </h2>
        <p className="text-center max-w-3xl px-3.5">
          Todo lo que necesitas para gestionar tu negocio, en un solo lugar.
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-start mt-5 gap-8 w-full text-center md:text-left">
          {/* Paso 1 */}
          <div className="sm:w-1/3 px-5 md:px-3.5">
            <p className="font-bold text-lg mb-2">01</p>
            <p className="font-bold text-xl mb-1">Sube tus datos</p>
            <p>
              De manera <span className="text-red-600 font-semibold">simple e intuitiva</span>. Totalmente integrado con otras herramientas de gestión de inventario.
            </p>
          </div>

          {/* Paso 2 */}
          <div className="sm:w-1/3 px-5 md:px-3.5">
            <p className="font-bold text-lg mb-2">02</p>
            <p className="font-bold text-xl mb-1">Nuestro equipo los analiza</p>
            <p>
              Un equipo especializado en análisis de datos estudia tus archivos para aprovechar al máximo su <span className="text-red-600 font-semibold">rendimiento</span>.
            </p>
          </div>

          {/* Paso 3 */}
          <div className="sm:w-1/3 px-5 md:px-3.5">
            <p className="font-bold text-lg mb-2">03</p>
            <p className="font-bold text-xl mb-1">Visualiza las predicciones</p>
            <p>
              Observa la evolución de tu negocio en nuestra plataforma: <span className="text-red-600 font-semibold">predicciones, análisis económicos, reportes...</span>
            </p>
          </div>
        </div>
      </section>

      <section className="w-full pt-14 lg:pt-10 flex items-center justify-center flex-col lg:flex-row">
        <RequestDemo
          primaryText={"¿A qué esperas? Pide ya una demo"}
          secondaryText={"Únete a SmartInv y quítate el dolor de cabeza a la hora de manejar tu inventario."}
        />
      </section>

      <footer className="w-full bg-gray-100 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
          <p className="text-sm text-gray-600">
            © 2025 <span className="font-semibold text-gray-800">SmartInv</span>. Todos los derechos reservados.
          </p>

          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-500">
            <a href="/privacidad" className="hover:text-gray-700">Política de privacidad</a>
            <a href="/terminos" className="hover:text-gray-700">Términos y condiciones</a>
            <a href="/contacto" className="hover:text-gray-700">Contacto</a>
          </div>
        </div>
      </footer>


    </>
  );
}

export default Landing;
