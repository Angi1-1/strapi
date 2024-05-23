import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/header.css'; // Importa tus estilos CSS
import Logo from '../Icon/logo_sinfondo.png';
import HamburgerIcon from '../Icon/hamburger.png'; // Importa el icono de hamburguesa

const Header = ({ cartItemCount, setCartItemCount }) => {
    const [searchValue, setSearchValue] = useState('');
    const [showMobileMenu, setShowMobileMenu] = useState(false); // Estado para controlar la visibilidad del menú en dispositivos móviles
    const [showProductsMenu, setShowProductsMenu] = useState(false); // Estado para controlar la visibilidad del menú desplegable de productos

    
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        // Aquí puedes añadir la lógica para manejar la búsqueda según la entrada del usuario
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    const toggleProductsMenu = () => {
        setShowProductsMenu(!showProductsMenu);
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>
            <div className={`buscar ${!showMobileMenu ? 'visible' : ''}`}>
                <input
                    type="text"
                    className="form-control search-bar"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Buscar..."
                />
            </div>
            {/* Botones para pantallas grandes */}
            <div className={`buttons ${!showMobileMenu ? 'visible' : ''}`}>
                <button className="button" onClick={toggleProductsMenu}>
                    Productos
                </button>
                {showProductsMenu && (
                    <div className="dropdown-menu">
                        <Link to='/joyeria' className="dropdown-item">Joyería</Link>
                        <Link to='/hogar' className="dropdown-item">Hogar</Link>
                        <Link to='/cosmetico' className="dropdown-item">Cosmética</Link>
                    </div>
                )}
                <button className="button">
                <Link to='/carrito'>Mi Cesta</Link> {cartItemCount > 0 && <span>({cartItemCount})</span>}
                </button>
                <button className="button"><Link to='/artesano'>Artesanos</Link></button>
                <button className="button"><Link to='/'>Log In</Link></button>
            </div>
            {/* Botón de hamburguesa para dispositivos móviles */}
            <div className="hamburger-menu" onClick={toggleMobileMenu}>
                <img src={HamburgerIcon} alt="Menú" />
            </div>
            {/* Menú de navegación para dispositivos móviles */}
            <div className={`mobile-menu ${showMobileMenu ? 'active' : ''}`}>
                <button className="button" onClick={toggleProductsMenu}>
                    Productos
                </button>
                {showProductsMenu && (
                    <div className="dropdown-menu">
                        <Link to='/productos/joyeria' className="dropdown-item">Joyería</Link>
                        <Link to='/productos/hogar' className="dropdown-item">Hogar</Link>
                        <Link to='/productos/cosmetico' className="dropdown-item">Cosmética</Link>
                    </div>
                )}
                <button className="button">
                    Mi Cesta {cartItemCount > 0 && <span>({cartItemCount})</span>}
                </button>
                <button className="button">Creadores</button>
                <button className="button"><Link to='/'>Log In</Link></button>
            </div>
        </header>
    );
}

export default Header;
