import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/productos.css";
import Header from "./header";
import Footer from "./footer";
import imagen4 from "./img/image4.png";
import imagen3 from "./img/image3.png";
import imagen2 from "./img/image2.png";

function ProductDetails() {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [sizeAdjustmentVisible, setSizeAdjustmentVisible] = useState(false);
  const [deliveryReturnVisible, setDeliveryReturnVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setCartItemCount((prevCount) => prevCount + 1);

    console.log(cartItemCount);
  };

  const [mainProduct, setMainProduct] = useState({
    name: "COLLAR DE PERLA",
    image: "Group 1.png",
    price: "€500",
    details: ["+Material: Oro Amarillo", "+Hecho en España", "+Perla 1 gramo"],
  });

  const relatedProducts = [
    {
      id: "pendiente-perla1",
      name: "PENDIENTE PERLA",
      image: "foto (1).png",
      price: "€30",
      details: ["+Material: Plata", "+Hecho en Italia", "+Perla 0.5 gramo"],
    },
    {
      id: "pendiente-perla2",
      name: "PENDIENTE PERLA",
      image: "foto.png",
      price: "€59",
      details: [
        "+Material: Oro Blanco",
        "+Hecho en Francia",
        "+Perla 0.7 gramo",
      ],
    },
    {
      id: "collar-de-plata",
      name: "COLLAR DE PLATA",
      image: "producto1.png",
      price: "€120",
      details: ["+Material: Plata", "+Hecho en España", "+Perla 2 gramos"],
    },
    {
      id: "collar-de-plata-2",
      name: "COLLAR DE PLATA",
      image: "producto1 (1).png",
      price: "€120",
      details: ["+Material: Plata", "+Hecho en España", "+Perla 2 gramos"],
    },
  ];

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  const toggleSizeAdjustment = () => {
    setSizeAdjustmentVisible(!sizeAdjustmentVisible);
  };

  const toggleDeliveryReturn = () => {
    setDeliveryReturnVisible(!deliveryReturnVisible);
  };

  const showRelatedProductDetails = (product) => {
    setMainProduct({
      name: product.name,
      image: product.image,
      price: product.price,
      details: product.details,
    });
  };

  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
  };
  return (
    <div className="containerProductos">
      <Header
        cartItemCount={cartItemCount}
        setCartItemCount={setCartItemCount}
      />
      <div className="breadcrumb">
        <p>
          <Link to="/home" className="link">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/productos" className="link">
            Productos
          </Link>
        </p>
      </div>
      <div className="productos" id={mainProduct.id}>
        <img src={mainProduct.image} alt={mainProduct.name} />
        <div className="product-info">
          <h1>{mainProduct.name}</h1>
          <div className="price">Madrid Arte</div>
          <div className="price2">Perla natural</div>
          <p className="product-price">{mainProduct.price}</p>
          <div className="price2">incl. IVA, excl. gastos de envío</div>
          <div className="product-actions">
            <button
              className="add-to-cart"
              onClick={() => addToCart(mainProduct)}
            >
              Añadir al Carrito
            </button>
            <button
              className="add-to-favorites"
              onClick={() => addToWishlist(mainProduct)}
            >
              ❤️ Agregar a Favoritos
            </button>
            <div className="button-container">
              <button className="toggle-details" onClick={toggleDetails}>
                <span>Detalles del Producto</span> {detailsVisible ? "▲" : "▼"}
              </button>
              <button
                className="toggle-talla-ajuste"
                onClick={toggleSizeAdjustment}
              >
                <span>Talla y Ajuste</span> {sizeAdjustmentVisible ? "▲" : "▼"}
              </button>
              <button
                className="toggle-entrega-devolucion"
                onClick={toggleDeliveryReturn}
              >
                <span>Entrega y Devolución</span>{" "}
                {deliveryReturnVisible ? "▲" : "▼"}
              </button>
            </div>
          </div>
          <div
            className={`product-details general-details ${
              detailsVisible ? "active" : ""
            }`}
          >
            {mainProduct.details.map((detail, index) => (
              <p key={index}>{detail}</p>
            ))}
          </div>

          <div
            className={`talla-ajuste-details product-details ${
              sizeAdjustmentVisible ? "active" : ""
            }`}
          >
            <h2>Talla y Ajuste</h2>
            <p>Ajuste regular</p>
          </div>
          <div
            className={`entrega-devolucion-details product-details ${
              deliveryReturnVisible ? "active" : ""
            }`}
          >
            <h2>Entrega y Devolución</h2>
            <p>Envío estándar gratuito. Política de devolución de 30 días.</p>
          </div>
        </div>
      </div>
      <hr />

      <div className="explora">EXPLORE OTRAS OPCIONES</div>

      <div className="related-products">
        {relatedProducts.map((product) => (
          <div
            className="related-product"
            key={product.id}
            onClick={() => showRelatedProductDetails(product)}
          >
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p className="related-product-price">{product.price}</p>
            <div className="product-details">
              {product.details.map((detail, index) => (
                <p key={index}>{detail}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="features">
        <div className="feature">
          <img src={imagen4} alt="Icono de búsqueda" />
          <h2>Selección de Artesanos</h2>
          <p>Somos +10 artesanos</p>
        </div>
        <div className="feature">
          <img src={imagen3} alt="Icono de artesanía" />
          <h2>Colaboraciones con Artesano</h2>
          <p></p>
        </div>
        <div className="feature">
          <img src={imagen2} alt="Icono de entrega" />
          <h2>Entrega Rápida</h2>
          <p>1-3 días hábiles</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetails;
