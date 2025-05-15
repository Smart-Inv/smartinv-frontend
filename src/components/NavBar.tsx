import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white px-8 shadow">
      <div className="flex justify-between items-center h-20">
        <img
          src="img/name.png"
          draggable="false"
          className="h-32 object-contain"
          alt="SmartInv Logo"
        />

        {/* Icono hamburguesa en móviles */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Enlaces y botón - visible solo en pantallas medianas y grandes */}
        <div className="hidden md:flex items-center gap-6">
          <a
            className="text-black text-sm cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const currentPath = window.location.pathname;
              if (currentPath === "/") {
                const section = document.getElementById("aboutSmartInv");
                section?.scrollIntoView({ behavior: "smooth" });
              } else {
                window.location.href = "/?scrollTo=aboutSmartInv";
              }
            }}
          >
            Sobre SmartInv
          </a>
          <a className="text-black text-sm" href="mailto:jmartinpizarro04@gmail.com">Pide una Demo</a>

          <Button
            textColor="text-white"
            bgColor="bg-light-red"
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>

      {/* Menú desplegable en móviles */}
      {menuOpen && (
        <div className="flex flex-col items-start gap-4 pb-4 md:hidden">
          <a
            className="text-black text-sm cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const currentPath = window.location.pathname;
              if (currentPath === "/") {
                const section = document.getElementById("aboutSmartInv");
                section?.scrollIntoView({ behavior: "smooth" });
              } else {
                window.location.href = "/?scrollTo=aboutSmartInv";
              }
            }}
          >
            Sobre SmartInv
          </a>          <a className="text-black text-sm" href="mailto:jmartinpizarro04@gmail.com">Pide una Demo</a>


          <Button
            textColor="text-white"
            bgColor="bg-light-red"
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </Button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
