const Footer = () => {
    return (
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
    )
}

export default Footer;