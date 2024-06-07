import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CSS/header.css'; // Importa tus estilos CSS
import Logo from '../Icon/logo_sinfondo.png';
import HamburgerIcon from '../Icon/hamburger.png'; // Importa el icono de hamburguesa

const Header = ({cart, CartItemCount}) => {
    const [cartItemCount, setCartItemCount] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [showMobileMenu, setShowMobileMenu] = useState(false); // Estado para controlar la visibilidad del menú en dispositivos móviles
    const [showProductsMenu, setShowProductsMenu] = useState(false); // Estado para controlar la visibilidad del menú desplegable de productos
    const [registrado, setRegistrado] = useState('');
    const [link, setLink] = useState('');
    
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

    useEffect(() => {
        if (localStorage.getItem('username') === null || localStorage.getItem('username') === '') {
            setRegistrado('Log In');
            setLink('/Micuenta')
        } else {
            console.log("Nombre de usuario",localStorage.getItem('username') )
            setRegistrado(localStorage.getItem('username'));
            if(localStorage.getItem('acesso') == 1) {
                setLink('/perfilAdmin')
            }
            else if (localStorage.getItem('acesso') == 2) {
                setLink('/perfilArtesanos')
            }
            else {
                setLink('/perfilUser');
            }
        }

    }, []);

    useEffect(() => {
        const updateCartItemCount = () => {
            const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemCount = currentCart.reduce((acc, item) => acc + item.quantity, 0);
            setCartItemCount(itemCount);
        };
    
        // Llama a la función para actualizar el contador cada vez que haya un cambio en el carrito
        updateCartItemCount();
    
        // Agrega un event listener para escuchar el evento 'cartUpdated' y actualizar el contador
        window.addEventListener('cartUpdated', updateCartItemCount);
    
        // Limpia el event listener al desmontar el componente
        return () => {
            window.removeEventListener('cartUpdated', updateCartItemCount);
        };
    }, []); // Deja la matriz de dependencias vacía para que el useEffect se ejecute solo una vez al montar el componente
    


    return (
        <header className="header">
            <div className="logo">
                <Link to='/'><img src={Logo} alt="Logo" /></Link>
            </div>
            {/* Botones para pantallas grandes */}
            <div className={`buttons ${!showMobileMenu ? 'visible' : ''}`}>
                <button className="button" onClick={toggleProductsMenu}>
                    Productos
                </button>
                {showProductsMenu && (
                    <div className="dropdown-menu">
                        <Link to='/joyeria/' className="dropdown-item">Joyería</Link>
                        <Link to='/hogar/' className="dropdown-item">Hogar</Link>
                        <Link to='/cosmetico/' className="dropdown-item">Cosmética</Link>
                    </div>
                )}
                <button className="button">
                <Link to='/carrito'>Mi Cesta</Link> {cartItemCount > 0 && <span>({cartItemCount})</span>}
                </button>
                {/* <button className="button"><Link to='/artesano'>Artesanos</Link></button> */}
                <button className="button"><Link to={link}>{registrado}</Link></button>
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
                <Link to='/productos/cosmetico' >Mi Cesta {cartItemCount > 0 && <span>({cartItemCount})</span>}</Link>
                </button>
                <button className="button"><Link to={link}>{registrado}</Link></button>
            </div>
        </header>
    );
}

export default Header;
