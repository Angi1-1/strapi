import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import "./CSS/joyeria.css"

// Definición de la lista de productos
const productos = [
  { nombre: "Producto 1", precio: 10, imagen: "ruta-del-producto-1.jpg" },
  { nombre: "Producto 2", precio: 20, imagen: "ruta-del-producto-2.jpg" },
  { nombre: "Producto 3", precio: 20, imagen: "ruta-del-producto-3.jpg" },
  { nombre: "Producto 4", precio: 20, imagen: "ruta-del-producto-4.jpg" },
  { nombre: "Producto 5", precio: 20, imagen: "ruta-del-producto-5.jpg" },
  { nombre: "Producto 6", precio: 20, imagen: "ruta-del-producto-6.jpg" },
  { nombre: "Producto 7", precio: 20, imagen: "ruta-del-producto-7.jpg" },
  { nombre: "Producto 8", precio: 20, imagen: "ruta-del-producto-8.jpg" },
  { nombre: "Producto 9", precio: 20, imagen: "ruta-del-producto-9.jpg" },
  { nombre: "Producto 10", precio: 20, imagen: "ruta-del-producto-10.jpg" },
  { nombre: "Producto 11", precio: 20, imagen: "ruta-del-producto-11.jpg" },
  { nombre: "Producto 12", precio: 20, imagen: "ruta-del-producto-12.jpg" },
  { nombre: "Producto 2", precio: 20, imagen: "ruta-del-producto-2.jpg" },
  // Agrega más productos aquí
];

function CatalogoDeProductos() {
  // Estado para controlar si se muestran todos los productos
  const [mostrarTodos, setMostrarTodos] = useState(false);

  // Función para alternar entre mostrar y ocultar todos los productos
  const alternarMostrarTodos = () => {
    setMostrarTodos(!mostrarTodos);
  };

  return (
    <div className="container">
      <Header/>
      <div className="breadcrumb">
            <p><Link to="/home" className="link">Home</Link> / <Link to="/joyeria" className="link">Joyería</Link> </p>
        </div>
      {/* Contenido de la cerámica */}
      <div className="ceramic-plate">
        <h1 className="plate-text upper-text">DISEÑOS PENSADOS PARA TI</h1>
        <p className="plate-text lower-text">MANOS CREADORAS COLECCIÓN 2024</p>
      </div>
      {/* Contenido del catálogo */}
      <div className="catalog">
        {/* Mapeo de productos */}
        {productos.map((producto, index) => (
          <div key={index} className="product" style={{ display: (mostrarTodos || index < 12) ? 'block' : 'none' }}>
            <div className="favorite-icon">
              <i className="far fa-heart"></i>
            </div>
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>Precio: €{producto.precio}</p>
          </div>
        ))}
      </div>
      {/* Botones de ver todo y ver menos */}
      <div className="view-all-button">
        <button onClick={alternarMostrarTodos} id="viewMoreButton" style={{ display: mostrarTodos ? 'none' : 'inline-block' }}>VER MÁS</button>
        <button onClick={alternarMostrarTodos} id="viewLessButton" style={{ display: mostrarTodos ? 'inline-block' : 'none' }}>VER MENOS</button>
      </div>
      <Footer/>
    </div>
  );
}

export default CatalogoDeProductos;
