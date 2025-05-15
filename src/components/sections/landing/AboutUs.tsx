const AboutUs = () => {
    return (
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
    )
}

export default AboutUs;