const HowTo = () => {
    return (
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

    )
}

export default HowTo