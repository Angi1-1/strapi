import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import "./CSS/joyeria.css";
import head from "./img/heartProducto.svg";
import headRojo from "./img/corazonRojo.svg";

function CatalogoDeJoyeria() {
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState({});
  const [filters, setFilters] = useState({
    nombre: "",
    precioMayor10: false,
    precioMenor10: false,
  });

  useEffect(() => {
    listProductosJoyeria();
    loadWishlist();
  }, []);

  const listProductosJoyeria = async () => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/productos?filters[tipo]=3`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Datos de productos", data);
        setListProduct(data.data);
      } else {
        console.log("Error al obtener los datos de productos");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  const loadWishlist = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const response = await fetch(
        `http://localhost:1337/api/miwishlists?filters[id_usuario]=${userId}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Datos de wishlist", data);
        const wishlistData = data.data.reduce((acc, item) => {
          acc[item.attributes.idProducto] = item.id; // Store the wishlist item ID
          return acc;
        }, {});
        setWishlist(wishlistData);
      } else {
        console.log("Error al obtener los datos de la wishlist");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  const alternarMostrarTodos = () => {
    setMostrarTodos(!mostrarTodos);
  };

  const ShowDataProduct = (id) => {
    console.log("Has seleccionado", id);
    navigate(`/producto/${id}`);
  };

  const añadirWishList = async (producto) => {
    const userId = parseInt(localStorage.getItem("user_id"), 10);
    const productId = producto.id;
    const wishlistItemId = wishlist[productId];

    try {
      if (wishlistItemId) {
        // Eliminar de la wishlist
        console.log("Eliminar Wishlist");
        const response = await fetch(
          `http://localhost:1337/api/miwishlists/${wishlistItemId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setWishlist((prevWishlist) => {
            const newWishlist = { ...prevWishlist };
            delete newWishlist[productId];
            return newWishlist;
          });
        } else {
          console.log("Error al eliminar el producto de la wishlist");
        }
      } else {
        // Agregar a la wishlist
        const body = {
          data: {
            nombreProducto: producto.attributes.nombre,
            precioProducto: producto.attributes.precio,
            idUsuario: userId,
            idProducto: productId,
            ruta: producto.attributes.ruta,
            tipo: producto.attributes.tipo,
          },
        };
        console.log("Añadir Wishlist", body);
        const response = await fetch("http://localhost:1337/api/miwishlists/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Añadir Wishlist", data);
          setWishlist((prevWishlist) => ({
            ...prevWishlist,
            [productId]: data.data.id, // Save the new wishlist item ID
          }));
        } else {
          console.log("Error al agregar el producto a la wishlist");
        }
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: name === "nombre" ? value : checked,
    }));
  };

  const applyFilters = (productos) => {
    return productos.filter((producto) => {
      const nombreMatches =
        filters.nombre === "" ||
        producto.attributes.nombre
          .toLowerCase()
          .includes(filters.nombre.toLowerCase());
      const precioMatches =
        (!filters.precioMayor10 || producto.attributes.precio > 10) &&
        (!filters.precioMenor10 || producto.attributes.precio < 10);
      return nombreMatches && precioMatches;
    });
  };

  const filteredProducts = applyFilters(listProduct);

  console.log("Productos filtrados", filteredProducts);
  return (
    <div className="container">
      <Header />

      <div className="hogar">
        <p className="upper-textJoyeria">DISEÑOS PENSADOS PARA TÍ</p>
        <p className="lower-textJoyeria">MANOS CREADORAS COLECCIÓN 2024</p>
      </div>
      <div className="breadcrumb">
        <p>
          <Link to="/home" className="link">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/hogar/" className="link">
            Hogar
          </Link>{" "}
        </p>
      </div>

      <div className="filters">
        <h3>Filtrar por Nombre</h3>
        <input
          type="text"
          name="nombre"
          value={filters.nombre}
          onChange={handleFilterChange}
          placeholder="Buscar por nombre..."
        />

        <h3>Filtrar por Precio</h3>
        <label>
          <input
            type="checkbox"
            name="precioMayor10"
            checked={filters.precioMayor10}
            onChange={handleFilterChange}
          />
          Mayor de 10 €
        </label>
        <label>
          <input
            type="checkbox"
            name="precioMenor10"
            checked={filters.precioMenor10}
            onChange={handleFilterChange}
          />
          Menor de 10 €
        </label>
      </div>

      <div className="catalogJoyeria">
        {filteredProducts.map((producto, index) => (
          <div
            key={index}
            className="productJoyeria"
            style={{ display: mostrarTodos || index < 12 ? "block" : "none" }}
          >
            <button
              className="corazonJoyeria"
              onClick={() => añadirWishList(producto)}
            >
              {wishlist[producto.id] ? (
                <img
                  src={headRojo}
                  style={{ width: "35px", height: "35px" }}
                  alt="heart icon"
                />
              ) : (
                <img
                  src={head}
                  style={{ width: "35px", height: "35px" }}
                  alt="heart icon"
                />
              )}
            </button>
            <div
              className="nombrePreciJoyeria"
              onClick={() => ShowDataProduct(producto.id)}
            >
              <img
                src={`/hogar/${producto.attributes.ruta}`}
                alt={producto.attributes.nombre}
                style={{ width: "100%", height: "250px" }}
              />
              <label className="letraCardJoyeria">
                {producto.attributes.nombre}
              </label>
              <p className="precioCardJoyeria">
                Precio: €{producto.attributes.precio}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="view-all-button">
        <button
          onClick={alternarMostrarTodos}
          id="viewMoreButton"
          style={{ display: mostrarTodos ? "none" : "inline-block" }}
          className="verMasJoyeria"
        >
          <p>VER MÁS</p>
        </button>
        <button
          onClick={alternarMostrarTodos}
          id="viewLessButton"
          style={{ display: mostrarTodos ? "inline-block" : "none" }}
          className="verMasJoyeria"
        >
          <p>VER MENOS</p>
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default CatalogoDeJoyeria;
