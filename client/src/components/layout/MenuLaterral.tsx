import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSun, FiBell, FiMenu, FiUsers } from "react-icons/fi";
import {
  MdDashboard,
  MdAttachMoney,
  MdTrendingDown,
  MdAccountBalance,
} from "react-icons/md";
import Logo from "@/assets/imgs/Logo-deshboard-one.png";
import "@/styles/MenuLaterralStyles.css";

interface MenuItem {
  nome: string;
  icon: ReactNode;
  path: string;
}

export default function MenuLaterral() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const opcoesMenu: MenuItem[] = [
    { nome: "Deshboard", icon: <MdDashboard />, path: "/" },
    { nome: "Revenue", icon: <MdAttachMoney />, path: "/revenue" },
    { nome: "Funnel", icon: <MdTrendingDown />, path: "/funnel" },
    { nome: "Customers", icon: <FiUsers />, path: "/customers" },
    { nome: "Finance", icon: <MdAccountBalance />, path: "/finance" },
  ];

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={toggleMenu}
        aria-label="Abrir menu"
      >
        <FiMenu size={24} />
      </button>

      <aside className={`hamburger ${isOpen ? "open" : ""}`}>
        <div className="div-titulo">
          <img src={Logo} alt="Logo dashboard" />
          <span>Dashboard</span>
        </div>

        <div className="hamburger-btns">
          <button className="btn-icon" title="Tema">
            <FiSun size={20} />
          </button>

          <button className="btn-icon" title="Notificacoes">
            <FiBell size={20} />
            <span className="badge">3</span>
          </button>
        </div>

        <ul className="menu">
          {opcoesMenu.map((item) => (
            <li
              key={item.path}
              className={`opcoes ${location.pathname === item.path ? "active" : ""}`}
            >
              <Link to={item.path} onClick={closeMenu}>
                <span className="menu-icon">{item.icon}</span>
                <span>{item.nome}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </>
  );
}
