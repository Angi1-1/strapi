import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./CSS/miWishlist.css"
import './CSS/perfilUser.css'; // Adjust the path as necessary
import plato from "../Icon/plato1.png"
import corazon from "../Icon/heart.svg"
import collar1 from "../Icon/collarPerla.png"
import collar from "../Icon/collarPerlar2.png"
import Header from './header';
import Footer from './footer';

const MiWishlist = () => {

    const [wishlist] = useState([{
        imagen: plato,
        nombre:"PLATO UNIVERSO", 
        precio: "5"
}, {
        imagen:collar1,
        nombre: "COLLAR DE PERLA", 
        precio: "70"
}, 
{
        imagen:collar,
        nombre: "COLLAR DE PERLA", 
        precio: "120"
}]);
  return (
  <>
    <Header/>
    <div className="breadcrumb">
          <p><Link to="/home" className="link">Home</Link> / <Link to="/miWishlist" className="link">Wishlist</Link></p>
      </div>
      
    <div className="perfilUserParte1">

      <div className="izquierdaPerfilUser">
                    <Link to='/perfilUser' className="perfilUserTexto2 link2">Mi Cuenta</Link>
                    <Link to='/perdidosUser' className="perfilUserTexto2 link2">Pedidos</Link>
                    <Link to='/miWishlist' className="perfilUserTexto1 link2">Mi Wishlist</Link>
                    <Link to='/' className="perfilUserTexto2 link2">Cerrar Sesión</Link>
      </div>

      <div className="derechaMiWishlist">
        <label className="perfilUserTitulo">Mis Wishlist</label>
        <div className="contenidoMiWishlist">
          {wishlist.map((lista, index) => (
            <div className="cosasMiWishlist" key={index}>
                <img className="corazonMiWishlixt" src={corazon}></img>
                <img className="imagenMiWishlist" src={lista.imagen}></img>
                <p className="MiWishlistTexto1">{lista.nombre}</p>
                <p className="MiWishlistTexto2Precio">{lista.precio} €</p>
            </div>
          ))}
        </div>
        
        </div>

      </div>
      <Footer/>
        </>
  );
}

export default MiWishlist;
