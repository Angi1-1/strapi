import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import "./CSS/carrito.css";

function Carrito({ cart, setCart }) {


  // useEffect para recuperar el carrito del almacenamiento local al montar el componente
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Función para eliminar un producto del carrito y actualizar el estado y el almacenamiento local
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

  

  if (cart.length === 0) {
    return (
      <div>
        <Header />
        <div className="breadcrumb">
          <p>
            <Link to="/home" className="link">Home</Link> / <Link to="/carrito" className="link">Carrito</Link>
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
          <Link to="/home" className="link">Home</Link> / <Link to="/carrito" className="link">Carrito</Link>
        </p>
      </div>
      <div className="carrito-container">
        <main>
          <h1 className="carrito-title">Tu Carrito de Compras</h1>
          {cart.map((product, index) => (
            <div key={index} className="carrito-item" data-aos="fade-right">
              <div className="carrito-item-left">
                <img src={product.ruta} alt={product.nombre} />
                <div className="carrito-item-details">
                  <p className="carrito-texto1">{product.nombre}</p>
                  <p className="carrito-texto2">{product.descripcion}</p>
                  <p className="carrito-texto2">Nº de artículo: {product.id}</p>
                  <p className="carrito-texto2">Talla: {product.talla || "Única"}</p>
                </div>
              </div>
              <div className="carrito-item-right">
                <div>
                  <p className="carrito-texto1">{product.precio}€</p>
                </div>
                <div>
                  <input className="cantidadCarrito"
                    type="number"
                    min="1"
                    value={product.quantity || 1}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                  />
                  <button className="eliminar-btn" onClick={() => removeFromCart(index)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
          <div className="carrito-summary" data-aos="fade-left">
            <div className="carrito-summary-right">
              <div className="parte1">
                <p className="carrito-texto1">Subtotal</p>
                <p className="carrito-texto1">{totalCarrito}€</p>
              </div>
              <div className="parte2">
                <p className="carrito-texto1">Envío gratuito</p>
                <p className="carrito-texto1">0€</p>
              </div>
              <hr className="carrito-separator" />
              <div className="parte3">
                <p className="carrito-texto1">Total</p>
                <p className="carrito-texto1">{totalCarrito}€</p>
              </div>
              <p className="carrito-texto4">Incl. IVA; Incl. gastos de envío</p>
            </div>
          </div>
          <button className="pago-btn" data-aos="zoom-in"><Link to={{
    pathname: "/pago", // Ruta de la página de pago
    state: { totalCarrito: totalCarrito } // Pasa el valor total como parte del estado de la ubicación
  }}>Continuar con el Pago</Link></button>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Carrito;
