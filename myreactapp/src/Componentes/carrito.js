import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import "./CSS/carrito.css";

function Carrito({ cart, setCart }) {
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Actualizar el almacenamiento local
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity || 1; // Si newQuantity es falsy, se establece en 1
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Actualizar el almacenamiento local
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const totalCarrito = cart.reduce(
    (acc, product) => acc + product.precio * (product.quantity || 1),
    0
  );

  const obtenerRutaImagen = (tipo, ruta) => {
    switch (tipo) {
      case 1:
        return `/joyeria/${ruta}`;
      case 2:
        return `/comestico/${ruta}`;
      case 3:
        return `/hogar/${ruta}`;
      default:
        return `/default/${ruta}`;
    }
  };

  if (cart.length === 0) {
    return (
      <div>
        <Header />
        <div className="breadcrumb">
          <p>
            <Link to='/' className="link">
              Home
            </Link>{" "}
            /{" "}
            <Link to='/carrito' className="link">
              Carrito
            </Link>
          </p>
        </div>
        <div className="carrito-container">
          <h1 className="carrito-title">Tu Carrito de Compras</h1>
          <p>Tu carrito está vacío.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header cart={cart} />
      <div className="breadcrumb">
        <p>
          <Link to='/' className="link">
            Home
          </Link>{" "}
          /{" "}
          <Link to='/carrito' className="link">
            Carrito
          </Link>
        </p>
      </div>
      <div className="carrito-container">
        <main>
          <h1 className="carrito-title">Tu Carrito de Compras</h1>
          {cart.map((product, index) => (
            <div key={index} className="carrito-item" data-aos="fade-right">
              <div className="carrito-item-left">
                <img src={product.subir ? product.subir : obtenerRutaImagen(product.tipo, product.ruta)} alt={product.nombre} />
                <div className="carrito-item-details">
                  <p className="carrito-texto1">{product.nombre}</p>
                  <p className="carrito-texto2">{product.descripcion}</p>
                  <p className="carrito-texto2">Nº de artículo: {product.id}</p>
                  <p className="carrito-texto2">Talla: {product.talla || "Única"}</p>
                </div>
              </div>

              <div className="carrito-item-right">
                <p className="carrito-texto1">{product.precio}€</p>
                <div className="cantidad-control">
                  <button
                    className="cantidad-btn"
                    onClick={() =>
                      updateQuantity(index, (product.quantity || 1) - 1)
                    }
                  >
                    -
                  </button>
                  <span className="cantidad-texto">
                    {product.quantity || 1}
                  </span>
                  <button
                    className="cantidad-btn"
                    onClick={() =>
                      updateQuantity(index, (product.quantity || 1) + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="eliminar-btn"
                  onClick={() => removeFromCart(index)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </main>
        <div className="carrito-summary">
          <div className="carrito-summary-left">
            <p className="carrito-texto1">Subtotal: {totalCarrito} €</p>
          </div>
          <div className="carrito-summary-right">
            <p className="carrito-texto1">Total: {totalCarrito} €</p>
            <button className="pago-btn">
              <Link to='/pago'>Continuar con el Pago</Link>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Carrito;