import React from "react";
import { Link } from "react-router-dom";
import "./CSS/footer.css"; // Importa tus estilos CSS

function Footer() {
    return (
        <footer>
            <div className="container-footer">
                <div className="footer-content">
                    <div className="footer-column-1">
                        <h3>ATENCIÓN AL CLIENTE</h3>
                        <ul>
                            <li>
                                De lunes al domingo: 10 de la mañana - 19 de la tarde
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
                                <Link to='/hogar'><p className="link3">Hogar</p></Link>
                            </li>
                            <li>
                                <Link to='/cosmetico'><p className="link3">Cosméticos</p></Link>
                            </li>
                            <li>
                                <Link to='/joyeria'><p className="link3">Joyería</p></Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>SERVICIOS</h3>
                        <ul>
                            <li>
                                <Link to='/sobreNosotros'><p className="link3">Sobre Nosotros</p></Link>
                            </li>
                            <li>
                                <Link to='/contacto'><p className="link3">Contáctanos</p></Link>
                            </li>
                            <li>
                                <Link to='/legal'><p className="link3">Aviso Legal</p></Link>
                            </li>
                            <li>
                                <Link to='/faqs'><p className="link3">Preguntas Frecuentes</p></Link>
                            </li>
                        </ul>
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