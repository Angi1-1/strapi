import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./CSS/artesano.css"; // Importa los estilos CSS
import Header from "./header";
import Footer from "./footer";

    const Container = () => {
    return (
        <div className="container">
        <Header />
        <div className="breadcrumb">
            <p><Link to="/home" className="link">Home</Link> / <Link to="/artesano" className="link">Artesano</Link> </p>
        </div>
        <div className="content">
            <div className="left-section">
            <p className="palabras">AMELIAAMELIAAMELIAAMELIAAMELIA
            AMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELI
            AAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIA
            AMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAM
            ELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELI
            AAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAA
            MELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAA
            MELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIA
            AMELIAAMELIAAMELIAAMELIAAMEAMELIAAMELIAAMELIAAMELIAAMELIAAM
            ELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAA
            MELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAMELIAAME
            </p>
            </div>
            <div className="right-section">
            <img src="../Icon/collarPerla.png" alt="Table View" />
            </div>
        </div>
        <Footer />
        </div>
    );
    };

    export default Container;
