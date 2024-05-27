import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import imagen4 from "./img/image4.png";
import imagen3 from "./img/image3.png";
import imagen2 from "./img/image2.png";
import "./CSS/productos.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [sizeAdjustmentVisible, setSizeAdjustmentVisible] = useState(false);
  const [deliveryReturnVisible, setDeliveryReturnVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/productos/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data.data.attributes);
        } else {
          console.log("Error al obtener los datos del producto");
        }
      } catch (error) {
        console.error('Error en la petición:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  const addToCart = (product) => {
    setCart([...cart, product]);
    setCartItemCount((prevCount) => prevCount + 1);
  };

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
    setProduct(product);
  };

  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
  };

  return (
    <div className="containerProductos">
      <Header cartItemCount={cartItemCount} setCartItemCount={setCartItemCount} />
      <div className="breadcrumb">
        <p>
          <Link to="/home" className="link">Home</Link> / <Link to="/productos" className="link">Productos</Link>
        </p>
      </div>
      <div className="productos" id={product.id}>
        <img src={product.ruta} alt={product.nombre} />
        <div className="product-info">
          <h1>{product.nombre}</h1>
          <div className="price">{product.nombreArtesano}</div>
          <div className="price2">Perla natural</div>
          <p className="product-price">{product.precio}</p>
          <div className="price2">incl. IVA, excl. gastos de envío</div>
          <div className="product-actions">
            <button className="add-to-cart" onClick={() => addToCart(product)}>Añadir al Carrito</button>
            <button className="add-to-favorites" onClick={() => addToWishlist(product)}>❤️ Agregar a Favoritos</button>
            <div className="button-container">
              <button className="toggle-details" onClick={toggleDetails}><span>Detalles del Producto</span> {detailsVisible ? "▲" : "▼"}</button>
              <button className="toggle-talla-ajuste" onClick={toggleSizeAdjustment}><span>Talla y Ajuste</span> {sizeAdjustmentVisible ? "▲" : "▼"}</button>
              <button className="toggle-entrega-devolucion" onClick={toggleDeliveryReturn}><span>Entrega y Devolución</span> {deliveryReturnVisible ? "▲" : "▼"}</button>
            </div>
          </div>
          <div className={`product-details general-details ${detailsVisible ? "active" : ""}`}>
            <p>{product.detalles}</p>
          </div>
          <div className={`talla-ajuste-details product-details ${sizeAdjustmentVisible ? "active" : ""}`}>
            <h2>Talla y Ajuste</h2>
            <p>{product.tallas}</p>
          </div>
          <div className={`entrega-devolucion-details product-details ${deliveryReturnVisible ? "active" : ""}`}>
            <h2>Entrega y Devolución</h2>
            <p>Envío estándar gratuito. Política de devolución de 30 días.</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="explora">EXPLORE OTRAS OPCIONES</div>
      <div className="related-products">
        {product.map((product) => (
          <div className="related-product" key={product.id} onClick={() => showRelatedProductDetails(product)}>
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
