import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./CSS/miWishlist.css";
import './CSS/perfilUser.css';
import corazon from "./img/corazonRojo.svg";
import Header from './header';
import Footer from './footer';
import Delete from './deleteWishlist';

const MiWishlist = () => {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [selectedWishlistId, setSelectedWishlistId] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    wishlistList();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const wishlistList = async () => {
    try {
      const response = await fetch(`http://localhost:1337/api/miwishlists?filters[idUsuario]=${localStorage.getItem('user_id')}`, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos de wishlist", data);
        setWishlist(data.data);
      } else {
        console.log("Error al obtener los datos de wishlist");
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const handleDeleteClick = (wishlistId) => {
    setSelectedWishlistId(wishlistId);
    setShowDelete(true);
  };

  const deleteWishlist = async () => {
    try {
      const response = await fetch(`http://localhost:1337/api/miwishlists/${selectedWishlistId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log("Wishlist eliminada");
        setWishlist(wishlist.filter(item => item.id !== selectedWishlistId));
        setShowDelete(false);
      } else {
        console.log("Error al eliminar la wishlist");
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const obtenerRutaCompleta = (ruta, tipo) => {
    switch (tipo) {
      case 1:
        return `/joyeria/${ruta}`;
      case 2:
        return `/comestico/${ruta}`;
      case 3:
        return `/hogar/${ruta}`;
      default:
        return ruta; // Por si el tipo no es reconocido
    }
  };

  const ShowDataProduct = (id) => {
    console.log("Has seleccionado", id);
    navigate(`/producto/${id}`);
  };

  return (
    <>
      <Header />
      <div className="breadcrumb">
        <p><Link to="/" className="link">Home</Link> / <Link to="/miWishlist" className="link">Mi Wishlist</Link></p>
      </div>

      <div className="perfilUserParte1">
        <div className="izquierdaPerfilArtesano">
          <Link to='/perfilUser/' className="perfilUserTexto2 link2">Mi Cuenta</Link>
          <Link to='/perdidosUser/' className="perfilUserTexto2 link2">Mis Pedidos</Link>
          <Link to='/miWishlist/' className="perfilUserTexto1 link2">Mis Wishlists</Link>
          <label onClick={handleLogout} className="perfilUserTexto2 link2">Cerrar Sesión</label>
        </div>

        <div className="derechaMiWishlist">
          <label className="perfilUserTitulo">Mi Wishlist</label>
          <div className="contenidoMiWishlist">
            {wishlist.map((lista, index) => (
              <div className="cosasMiWishlist" key={index}>
                <button className="corazonBotonWishlist" onClick={() => handleDeleteClick(lista.id)}>
                  <img className="corazonMiWishlist" src={corazon} alt="Favorito" />
                </button>
                <div onClick={() => ShowDataProduct(lista.attributes.idProducto)}>
                <img className="imagenMiWishlist" src={obtenerRutaCompleta(lista.attributes.ruta, lista.attributes.tipo)} style={{width:'250px', height:'200px'}} alt={lista.attributes.nombreProducto} />
                <p className="MiWishlistTexto1">{lista.attributes.nombreProducto}</p>
                <p className="MiWishlistTexto2Precio">{lista.attributes.precioProducto} €</p>
              </div></div>
            ))}
          </div>
        </div>
        {showDelete && <Delete onCancel={() => setShowDelete(false)} onDeleteConfirm={deleteWishlist} />}
      </div>

      <Footer />
    </>
  );
}

export default MiWishlist;
