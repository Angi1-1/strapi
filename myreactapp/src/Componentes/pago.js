import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import plus from "./img/plus.svg";
import lapiz from "./img/pencil.svg";
import "../Componentes/CSS/pago.css";

function App() {
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [metodoEntrega, setMetodoEntrega] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [mostrarBloque, setMostrarBloque] = useState(false);
  const [direccionEntrega, setDireccionEntrega] = useState("");
  
  const [direccionFacturacion, setDireccionFacturacion] = useState("");
  
  const [mostrarEditarDireccion, setMostrarEditarDireccion] = useState(false);
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [mensajePago, setMensajePago] = useState("");
  const [idArtesano, setIdArtesano] = useState("");
  const [mensajeErrorDireccion, setMensajeErrorDireccion] = useState("");
  const [mensajeErrorMetodoEntrega, setMensajeErrorMetodoEntrega] =
    useState("");
  const [mensajeErrorMetodoPago, setMensajeErrorMetodoPago] = useState("");
  const [aceptoCondiciones, setAceptoCondiciones] = useState(false);
  const [mensajeError, setMensajeError] = useState(""); // Nuevo estado
  const [cart, setCart] = useState([]);
  const [direccionEntregaTemporal, setDireccionEntregaTemporal] = useState("");
const [direccionFacturacionTemporal, setDireccionFacturacionTemporal] = useState("");


useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const idArtesano = obtenerIdArtesano(storedCart);
  setIdArtesano(idArtesano);
  setDireccionEntregaTemporal(direccionEntrega); // Inicializa el estado temporal
  setDireccionFacturacionTemporal(direccionFacturacion); // Inicializa el estado temporal
}, []);

  const toggleMostrarEditarDireccion = () => {
    setMostrarEditarDireccion(!mostrarEditarDireccion);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const totalCarritoP = cart.reduce(
    (acc, product) => acc + product.precio * (product.quantity || 1),
    0
  );


  // Recuperar el contenido del carrito del almacenamiento local al cargar el componente
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const idArtesano = obtenerIdArtesano(storedCart);
    setIdArtesano(idArtesano);
  }, []);

  const obtenerIdArtesano = (productos) => {
    const idsArtesanos = new Set(); // Usamos un conjunto para evitar IDs duplicados

    // Iteramos sobre cada producto en el carrito
    productos.forEach((producto) => {
      // Verificamos si el producto tiene un campo 'idArtesano'
      if (producto.hasOwnProperty("idArtesano")) {
        // Agregamos el ID del artesano al conjunto
        idsArtesanos.add(producto.idArtesano);
      }
    });
    return [...idsArtesanos];
  };

  const handleMetodoEntregaChange = (e) => {
    setMetodoEntrega(e.target.value);
  };

  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value);
  };

    const handleDireccionChange = (e) => {
      setDireccionEntregaTemporal(e.target.value);
    };

  const handleDireccionFacturacionChange = (e) => {
    setDireccionFacturacionTemporal(e.target.value);
  };

  
  const calcularTotal = () => {
    let costoEntrega = 0;
    if (metodoEntrega === "fedex") {
      costoEntrega = 0;
    } else if (metodoEntrega === "correos") {
      costoEntrega = 5;
    }
    return totalCarritoP + costoEntrega;
  };

  const toggleMostrarEditar = () => {
    setMostrarEditar(!mostrarEditar);
  };

  const handleContinuarClick = (e) => {
    e.preventDefault();
    setMostrarBloque(true);
  };

  const handleGuardarDireccion = (e) => {
    e.preventDefault(); // Evitar recargar la página al hacer clic en el botón
  toggleMostrarEditar();
  
  setDireccionEntrega(direccionEntregaTemporal);
  };

  const handleGuardarDireccionFacturacion = (e) => {
    e.preventDefault();
    toggleMostrarEditarDireccion();
    
    setDireccionFacturacion(direccionFacturacionTemporal);
};


  const handleCheckboxChange = (e) => {
    setAceptoCondiciones(e.target.checked);
  };

  const handlePagarClick = (e) => {
    e.preventDefault();
   
    if (!metodoEntrega) {
      setMensajeErrorMetodoEntrega("Debe seleccionar un método de entrega.");
      return;
    }
    if (!metodoPago) {
      setMensajeErrorMetodoPago("Debe seleccionar un método de pago.");
      return;
    }
    if (!aceptoCondiciones) {
      setMensajeError("Por favor, acepta las condiciones generales.");
      return;
    }

   
    
   
    const idUsuario = obtenerIdUsuario(); // función para obtener el ID de usuario
    const productos = obtenerProductosCarrito(); // función para obtener los productos del carrito
    const idArtesano = obtenerIdArtesano(productos); // pasamos la lista de productos a obtenerIdArtesano
    const pedido = {
      idUsuario: idUsuario,
      idArtesano: idArtesano,
      productos: productos,
      domicilio: direccionEntrega,
      direcciónFacturacion:direccionFacturacion,
      precioTotal: calcularTotal(),
    };
    console.log("Pedido:", pedido);
    setMensajePago("¡Pago completado!");
  };

  const obtenerIdUsuario = () => {
    // devuelve el ID de usuario almacenado en localStorage
    return localStorage.getItem("user_id");
  };

  const obtenerProductosCarrito = () => {
    // obtiene los productos del carrito del almacenamiento local
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return storedCart;
  };


  return (
    <div>
      <Header />
      <div className="breadcrumb">
        <p>
          <Link to="/home" className="link">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/pago" className="link">
            Pago
          </Link>
        </p>
      </div>
      <main className="containerPago">
        <div className="row">
          <h1 className="col-md-6">Dirección de entrega</h1>
        </div>
        <div className="form-group">
          <h2>Mi cuenta</h2>
          <p>Correo Electrónico</p>
        </div>
        <div className="row">
          <div className="col-md-6 izquierdaPago">
            <form>
              <div className="group">
                <h2>Opciones de entrega</h2>
                <hr />
                <div className="row">
                  <div className="col">
                    <p>
                      <label htmlFor="calle_entrega">Calle de entrega</label>
                    </p>
                    <p>
                      Dirección de entrega:{direccionEntrega}
                      
                    </p>
                  </div>
                  <div className="col-auto">
                    <img
                      src={lapiz}
                      alt="Lápiz"
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                      onClick={toggleMostrarEditar}
                    />
                  </div>
                </div>
                <div
                  id="editar_direccion"
                  style={{ display: mostrarEditar ? "flex" : "none" }}
                  className="direccionPago"
                >
                  <input
                    type="text"
                    className="direccionInput"
                    id="calle_entrega"
                    name="calle_entrega"
                    value={direccionEntregaTemporal} 
                    onChange={handleDireccionChange}
                  />
                  <button
                    type="submit"
                    className="btnPago"
                    onClick={handleGuardarDireccion}
                  >
                    Guardar
                  </button>
                  {mensajeErrorDireccion && (
                    <p className="error">{mensajeErrorDireccion}</p>
                  )}
                </div>
                <hr />
                <div className="group1">
                  <p>
                    <label htmlFor="metodo_entrega">Método de entrega</label>
                  </p>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="fedex"
                      name="entrega"
                      value="fedex"
                      className="custom-control-input"
                      checked={metodoEntrega === "fedex"}
                      onChange={handleMetodoEntregaChange}
                    />
                    <label className="custom-control-label" htmlFor="fedex">
                      <span style={{ display: "inline-block", width: "100%" }}>
                        FedEx - Standard{" "}
                        <span
                          style={{
                            display: "inline-block",
                            textAlign: "right",
                            width: "10%",
                          }}
                        >
                          <strong>0,00€</strong>
                        </span>
                        <br />
                        Entre 1 a 3 días hábiles
                      </span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="correos"
                      name="entrega"
                      value="correos"
                      className="custom-control-input"
                      checked={metodoEntrega === "correos"}
                      onChange={handleMetodoEntregaChange}
                    />
                    <label className="custom-control-label" htmlFor="correos">
                      <span style={{ display: "inline-block", width: "100%" }}>
                        Correos - España{" "}
                        <span
                          style={{
                            display: "inline-block",
                            textAlign: "right",
                            width: "10%",
                          }}
                        >
                          <strong>5,00€</strong>
                        </span>
                        <br />
                        Entre 7 a 14 días hábiles
                      </span>
                    </label>
                  </div>
                </div>
                {mensajeErrorMetodoEntrega && (
                  <p className="error">{mensajeErrorMetodoEntrega}</p>
                )}
                <hr />
                <div className="group1">
                  <p>
                    <label htmlFor="requisitos">
                      ¿Tiene este pedido algún requisito especial?
                    </label>
                  </p>
                  <textarea
                    className="form-control"
                    id="requisitos"
                    name="requisitos"
                    rows="2"
                    placeholder="Escribe los requisitos"
                    style={{ color: "white", opacity: 1 }}
                  ></textarea>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleContinuarClick}
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="resumen">
              <h2>Resumen</h2>
              <p>Subtotal</p>
              <p>{totalCarritoP.toFixed(2)}€</p>
              <hr />
              <p>Envío</p>
              <p>
                {metodoEntrega === "fedex"
                  ? "FedEx - Standard"
                  : "Correos - España"}
              </p>
              <p>
                {metodoEntrega === "fedex"
                  ? "Entre 1 a 3 días hábiles"
                  : "Entre 7 a 14 días hábiles"}
              </p>
              <p>{metodoEntrega === "fedex" ? "0,00€" : "5,00€"}</p>
              <hr />
              <p>Total</p>
              <p>{calcularTotal().toFixed(2)}€</p>
            </div>
          </div>
        </div>
        {mostrarBloque && (
          <div className="nuevoBloque">
            <form>
              <div className="group">
                <h2>Pago</h2>
                <hr />
                <div className="row">
                  <div className="col">
                    <p>
                      <label htmlFor="direccion_facturacion">
                        Dirección de facturación
                      </label>
                    </p>
                    <p>
                      Dirección de facturación:{direccionFacturacion}
                      
                    </p>
                  </div>
                  <div className="col-auto">
                    <img
                      src={lapiz}
                      alt="Lápiz"
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                      onClick={toggleMostrarEditarDireccion}
                    />
                  </div>
                </div>
                <div
                  id="editar_direccion"
                  style={{ display: mostrarEditarDireccion ? "flex" : "none" }}
                  className="direccionPago"
                >
                  <input
                    type="text"
                    className="direccionInput"
                    id="direccion_facturacion"
                    name="direccion_facturacion"
                    value={direccionFacturacionTemporal}
                    onChange={handleDireccionFacturacionChange}
                  />
                  <button
                    type="submit"
                    className="btnPago"
                    onClick={handleGuardarDireccionFacturacion}
                  >
                    Guardar
                  </button>
                </div>
                {mensajeErrorDireccion && (
                  <p className="error">{mensajeErrorDireccion}</p>
                )}
                <hr />
                <div className="group1">
                  <p>
                    <label htmlFor="metodo_pago">Método de Pago</label>
                  </p>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="credito"
                      name="pago"
                      value="credito"
                      className="custom-control-input"
                      checked={metodoPago === "credito"}
                      onChange={handleMetodoPagoChange}
                    />
                    <label className="custom-control-label" htmlFor="credito">
                      <span style={{ display: "inline-block", width: "100%" }}>
                        Tarjeta de Crédito
                      </span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="paypal"
                      name="pago"
                      value="paypal"
                      className="custom-control-input"
                      checked={metodoPago === "paypal"}
                      onChange={handleMetodoPagoChange}
                    />
                    <label className="custom-control-label" htmlFor="paypal">
                      <span style={{ display: "inline-block", width: "100%" }}>
                        PayPal
                      </span>
                    </label>
                  </div>
                </div>
                {mensajeErrorMetodoPago && (
                  <p className="error">{mensajeErrorMetodoPago}</p>
                )}
                <hr />
                <div className="group1">
                  <p>
                    <label htmlFor="acepto_condiciones">
                      Acepte las condiciones generales
                    </label>
                  </p>
                  <input
                    type="checkbox"
                    id="acepto_condiciones"
                    checked={aceptoCondiciones}
                    onChange={handleCheckboxChange}
                  />
                  <p>
                    Acepto las Condiciones Generales de Venta y doy mi
                    consentimiento al tratamiento de mis datos, de conformidad
                    con la Política de Confidencialidad de Manos Creadoras.
                  </p>
                  {mensajeError && <p className="error">{mensajeError}</p>}
                </div>
                <button className="btn btn-primary" onClick={handlePagarClick}>
                  Pagar
                </button>
                {mensajePago && (
                  <div className="mensaje-pago">
                    <p>{mensajePago}</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
