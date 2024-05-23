    import React from "react";
    import { Link } from "react-router-dom";
    import "./CSS/footer.css"; // Importa tus estilos CSS
    function Footer() {
    return (
        <footer>
        <div className="container-footer">
            <div className="footer-content">
            <div className="footer-column-1">
                <h3>DEPARTAMENTO DE SERVICIO AL CLIENTE</h3>
                <ul>
                <li>
                De lunes al domingo: 10 de la mañana - 19 de la tarde:
                </li>
                <li>
                + 600 600 600
                </li>
                <li>
                Enviar un mensaje de correo electrónico
                </li>
                </ul>
            </div>
            <div className="footer-column">
                <h3>COLECCIONES</h3>
                <ul>
                <li>
                Hogar
                </li>
                <li>
                Cosméticos
                </li>
                <li>
                Artesanos
                </li>
                <li>
                Joyeria
                </li>
                </ul>
            </div>
            <div className="footer-column">
                <h3>SERVICIOS</h3>
                <Link to=""><p className="link3">Sobre Nosotros</p></Link>
            <Link to=""><p className="link3">Contáctanos</p></Link>
            <Link to=""><p className="link3">Aviso Legal</p></Link>
            <Link to=""><p className="link3">Preguntas Frecuentes</p></Link>
            </div>
            </div>
            <div className="footer-bottom">
            <p>© 2024 Manos Creadoras. Todos los derechos reservados.</p>
            </div>
        </div>
        </footer>
    );
    }

    export default Footer;
