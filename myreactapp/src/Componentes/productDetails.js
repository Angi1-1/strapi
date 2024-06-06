import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import imagen4 from "./img/image4.png";
import imagen3 from "./img/image3.png";
import imagen2 from "./img/image2.png";
import "./CSS/productos.css";
import head from './img/heartProducto.svg';
import headRojo from "./img/corazonRojo.svg";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [sizeAdjustmentVisible, setSizeAdjustmentVisible] = useState(false);
  const [deliveryReturnVisible, setDeliveryReturnVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [fullWishlist, setFullWishlist] = useState({});
  const [cartItemCount, setCartItemCount] = useState(0);
  const [listProductos, setListProductos] = useState([]);

  useEffect(() => {
    fetchProduct();
    listRecommendedProducts();
    loadWishlistForProduct();
    loadFullWishlist();
  }, [id]);

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

  const loadWishlistForProduct = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      const response = await fetch(`http://localhost:1337/api/miwishlists?filters[idUsuario]=${userId}&filters[idProducto]=${id}`, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        const productWishlist = data.data;
        setWishlist(productWishlist);
      } else {
        console.log("Error al obtener los datos de la wishlist para el producto");
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const listRecommendedProducts = async () => {
    const randomProducts = [];
    const fetchedIds = new Set();
    fetchedIds.add(parseInt(id));

    try {
      while (randomProducts.length < 4) {
        let numeroRandom = Math.floor(Math.random() * 51) + 1;
        while (fetchedIds.has(numeroRandom)) {
          numeroRandom = Math.floor(Math.random() * 51) + 1;
        }

        const response = await fetch(`http://localhost:1337/api/productos/${numeroRandom}`);
        if (response.ok) {
          const data = await response.json();
          randomProducts.push(data.data);
          fetchedIds.add(numeroRandom);
        } else {
          console.log(`Error al obtener los datos del producto con id ${numeroRandom}`);
        }
      }
      setListProductos(randomProducts);
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const addToCart = (product) => {
    const productId = parseInt(id);
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const productInCartIndex = currentCart.findIndex((item) => item.id === productId);
    if (productInCartIndex !== -1) {
      const updatedCart = [...currentCart];
      updatedCart[productInCartIndex].quantity += 1;
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    } else {
      const updatedCart = [...currentCart, { ...product, id: productId, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
    const itemCount = currentCart.reduce((acc, item) => acc + item.quantity, 0) + 1;
    setCartItemCount(itemCount);

    window.dispatchEvent(new Event('cartUpdated'));
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

  const showProductDetails = (id) => {
    navigate(`/producto/${id}`);
  };

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

  const addOrRemoveWishlist = async (product) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.log("No hay usuario logueado");
      return;
    }

    try {
      if (wishlist.length > 0) {
        const wishlistItemId = wishlist[0].id;
        const response = await fetch(`http://localhost:1337/api/miwishlists/${wishlistItemId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setWishlist([]);
          console.log("Producto eliminado de la wishlist");
        } else {
          console.log("Error al eliminar el producto de la wishlist");
        }
      } else {
        const response = await fetch(`http://localhost:1337/api/miwishlists`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              idUsuario: userId,
              idProducto: id,
              nombreProduct: product.nombre,
              precioProducto: product.precio,
              ruta: product.ruta,
              tipo: product.tipo
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          setWishlist([data.data]);
          console.log("Producto añadido a la wishlist");
        } else {
          console.log("Error al añadir el producto a la wishlist");
        }
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const loadFullWishlist = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      const response = await fetch(`http://localhost:1337/api/miwishlists?filters[id_usuario]=${userId}`, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        const fullWishlistData = data.data.reduce((acc, item) => {
          acc[item.attributes.idProducto] = item.id;
          return acc;
        }, {});
        setFullWishlist(fullWishlistData);
      } else {
        console.log("Error al obtener los datos de la wishlist completa");
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const addOrRemoveFromFullWishlist = async (producto) => {
    const userId = parseInt(localStorage.getItem('user_id'), 10);
    const productId = producto.id;
    const wishlistItemId = fullWishlist[productId];

    try {
      if (wishlistItemId) {
        const response = await fetch(`http://localhost:1337/api/miwishlists/${wishlistItemId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setFullWishlist(prevWishlist => {
            const newWishlist = { ...prevWishlist };
            delete newWishlist[productId];
            return newWishlist;
          });
        } else {
          console.log("Error al eliminar el producto de la wishlist");
        }
      } else {
        const body = {
          data: {
            "nombreProducto": producto.attributes.nombre,
            "precioProducto": producto.attributes.precio,
            "idUsuario": userId,
            "idProducto": productId,
            "ruta": producto.attributes.ruta,
            "tipo": producto.attributes.tipo
          }
        };
        const response = await fetch('http://localhost:1337/api/miwishlists/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        if (response.ok) {
          const data = await response.json();
          setFullWishlist(prevWishlist => ({
            ...prevWishlist,
            [productId]: data.data.id
          }));
        } else {
          console.log("Error al agregar el producto a la wishlist");
        }
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  const ShowDataArtesanoInf = (idArtesano) => {
    navigate(`/artesanoInfo/${idArtesano}`);
  };

  const isInWishlist = wishlist.length > 0;

  return (
    <div className="containerProductos">
      <Header cartItemCount={cartItemCount} cart={cart} />
      <div className="breadcrumb">
        <p>
          <Link to="/home" className="link">Home</Link> /
          <Link to={
            product.tipo === 1 ? "/joyeria/" :
              product.tipo === 3 ? "/hogar/" :
                product.tipo === 2 ? "/cosmetico/" : "null"
          } className="link">
            {
              product.tipo === 1 ? 'Joyeria' :
                product.tipo === 3 ? 'Hogar' :
                  product.tipo === 2 ? 'Cosmético' : 'Productos'
            }
          </Link>
        </p>
      </div>
      <div className="productos" id={product.id}>
        <img src={product.subir ? product.subir : obtenerRutaImagen(product.tipo, product.ruta)} alt={product.nombre} className="imagenProductDetails" />
        <div className="product-info">
          <label className="tinosGrafiaJoyeria" style={{ fontSize: '32px' }}>{product.nombre}</label>
          <div className="tinosGrafiaJoyeria" style={{ fontSize: '22px', cursor: 'pointer' }} onClick={() => ShowDataArtesanoInf(product.idArtesano)}>{product.nombreArtesano}</div>
          <div className="tinosGrafiaJoyeria" style={{ fontSize: '18px' }}>{product.subtitulo}</div>
          <p className="GideonRomanGrafiaJoyeria" style={{ fontSize: '32px' }}>{product.precio}€</p>
          <div className="GideonRomanGrafiaJoyeria" style={{ fontSize: '16px' }}>incl. IVA, excl. gastos de envío</div>
          <div className="product-actions">
            <div className="CarritoAñadir">
              <button className="add-to-cart" style={{ width: '90%', padding: '20px 0' }} onClick={() => addToCart(product)}>
                <p className="tinosGrafiaJoyeria" style={{ fontSize: '22px', color: 'white' }}>Añadir al Carrito</p>
              </button>
              <button className="especialBoton" onClick={() => addOrRemoveWishlist(product)} >
                {isInWishlist ? (
                  <img src={headRojo} style={{ width: '55px', height: '55px' }} alt="Añadir a la lista de deseos" />
                ) : (
                  <img src={head} style={{ width: '55px', height: '55px' }} alt="Añadir a la lista de deseos" />
                )}
              </button>
            </div>
            <div className="button-container">
              <button className="toggle-details" onClick={toggleDetails}>
                <span className="tinosGrafiaJoyeria" style={{ fontSize: '22px' }}>Detalles del Producto</span> {detailsVisible ? "▲" : "▼"}
              </button>
              <div className={`product-details general-details ${detailsVisible ? "active" : ""}`}>
                <p className="GideonRomanGrafiaJoyeria" style={{ fontSize: '20px' }}>{product.detalles}</p>
              </div>
              <button className="toggle-talla-ajuste" onClick={toggleSizeAdjustment}>
                <span className="tinosGrafiaJoyeria" style={{ fontSize: '22px' }}>Talla y Ajuste</span> {sizeAdjustmentVisible ? "▲" : "▼"}
              </button>
              <div className={`talla-ajuste-details product-details ${sizeAdjustmentVisible ? "active" : ""}`}>
                <p className="GideonRomanGrafiaJoyeria" style={{ fontSize: '20px' }}>{product.tallas}</p>
              </div>
              <button className="toggle-entrega-devolucion" onClick={toggleDeliveryReturn}>
                <span className="tinosGrafiaJoyeria" style={{ fontSize: '22px' }}>Entrega y Devolución</span> {deliveryReturnVisible ? "▲" : "▼"}
              </button>
              <div className={`entrega-devolucion-details product-details ${deliveryReturnVisible ? "active" : ""}`}>
                <p className="GideonRomanGrafiaJoyeria" style={{ fontSize: '20px' }}>Envío estándar gratuito. Política de devolución de 30 días.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="tinosGrafiaJoyeria" style={{ fontSize: '32px', textAlign: 'center', margin: '20px' }}>EXPLORE OTRAS OPCIONES</div>
      <div className="related-products">
        {listProductos.map((producto, index) => (
          <div key={index} className="productRecomendado" style={{ display: 'flex' }}>
            <button className='corazonJoyeria' onClick={() => addOrRemoveFromFullWishlist(producto)}>
              {fullWishlist[producto.id] ? (
                <img src={headRojo} style={{ width: '35px', height: '35px' }} alt="heart icon" />
              ) : (
                <img src={head} style={{ width: '35px', height: '35px' }} alt="heart icon" />
              )}
            </button>
            <div className='nombrePreciJoyeria' onClick={() => showProductDetails(producto.id)}>
              <img src={producto.attributes.subir ? producto.attributes.subir : obtenerRutaImagen(producto.attributes.tipo, producto.attributes.ruta)} alt={producto.attributes.nombre} style={{ width: '100%', height: '250px' }} />
              <label className='letraCardJoyeria'>{producto.attributes.nombre}</label>
              <p className='precioCardJoyeria'>Precio: €{producto.attributes.precio}</p>
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
