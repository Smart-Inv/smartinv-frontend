const Main = () => {
    return(
      <section className="w-full pt-24 lg:pt-20 flex items-center justify-center flex-col lg:flex-row">
        <div className="w-2/4 lg:text-left text-center">
          <h1 className="font-extrabold text-3xl mb-3 mx-auto lg:mx-0 sm:max-w-3/4">
            Tu gestor de inventarios personalizado y potenciado con
            <span className="bg-gradient-to-r from-dark-red to-light-red bg-clip-text text-transparent">
              {' '}Inteligencia Artificial
            </span>
          </h1>
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
    )
}

export default Main