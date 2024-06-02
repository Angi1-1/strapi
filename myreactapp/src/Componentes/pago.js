import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import mapaIcon from "./img/mapaIcon.svg";
import lapiz from "./img/pencilPago.svg";
import "../Componentes/CSS/pago.css";

function Pago() {
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [metodoEntrega, setMetodoEntrega] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [mostrarBloque, setMostrarBloque] = useState(false);
  const [direccionEntrega, setDireccionEntrega] = useState("");
  const [direccionFacturacion, setDireccionFacturacion] = useState("");
  const [mostrarEditar1, setMostrarEditar1] = useState(false); // New state for billing address edit
  const navigate = useNavigate()
  const [mensajePago, setMensajePago] = useState("");
  const [idArtesano, setIdArtesano] = useState("");
  const [mensajeErrorDireccion, setMensajeErrorDireccion] = useState("");
  const [mensajeErrorMetodoEntrega, setMensajeErrorMetodoEntrega] = useState("");
  const [mensajeErrorMetodoPago, setMensajeErrorMetodoPago] = useState("");
  const [aceptoCondiciones, setAceptoCondiciones] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [cart, setCart] = useState([]);
  const [direccionEntregaTemporal, setDireccionEntregaTemporal] = useState("");
  const [direccionFacturacionTemporal, setDireccionFacturacionTemporal] = useState("");

  const idUsuario = localStorage.getItem('user_id');
  const [userData, setUserData] = useState({});
  const [nombreApellido, setNombreApellido] = useState(localStorage.getItem('username') || '');
  const [telefono, setTelefono] = useState('');

  // Función para consultar datos del usuario
  const userDataConsult = async () => {
    console.log("Username:", localStorage.getItem('username'));
    console.log("ID de usuario:", idUsuario);

    try {
      const response = await fetch(`http://localhost:1337/api/usuariomanos/${idUsuario}`, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos de usuario:", data.data.attributes);
        setUserData(data.data.attributes);
        setDireccionEntrega(data.data.attributes.domicilio);
        setNombreApellido(data.data.attributes.nombreApellido);
        setTelefono(data.data.attributes.telefono);
      } else {
        console.log("Error al obtener los datos del usuario");
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  }

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const idArtesano = obtenerIdArtesano(storedCart);
    setIdArtesano(idArtesano);
    setDireccionEntregaTemporal(direccionEntrega); // Inicializa el estado temporal
    setDireccionFacturacionTemporal(direccionFacturacion); // Inicializa el estado temporal
    userDataConsult();
    console.log("Datos de usuario", userData);
  }, []);



  const toggleMostrarEditar1 = () => { // New function to toggle billing address edit
    setMostrarEditar1(!mostrarEditar1);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const totalCarritoP = cart.reduce(
    (acc, product) => acc + product.precio * (product.quantity || 1),
    0
  );

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const idArtesano = obtenerIdArtesano(storedCart);
    setIdArtesano(idArtesano);
  }, []);

  const obtenerIdArtesano = (productos) => {
    const idsArtesanos = new Set();

    productos.forEach((producto) => {
      if (producto.hasOwnProperty("idArtesano")) {
        idsArtesanos.add(producto.idArtesano);
      }
    });
    return [...idsArtesanos];
  };

  const handleMetodoEntregaChange = (e) => {
    setMetodoEntrega(e.target.value);
    setMensajeErrorMetodoEntrega(""); // Clear error message when a method is selected
  };

  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value);
  };

  const handleDireccionChange = (e) => {
    setDireccionEntrega(e.target.value);
  };

  const handleDireccionFacturacionChange = (e) => {
    setDireccionFacturacionTemporal(e.target.value);
  };

  const handleNombreChange = (e) => {
    setNombreApellido(e.target.value);
  };

  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
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

    if (!metodoEntrega) {
      setMensajeErrorMetodoEntrega("Debe seleccionar un método de entrega.");
      return;
    }

    setMostrarBloque(true);
  };

  const handleGuardarDireccion = async (e) => {
    setMensajeErrorMetodoEntrega('')
    setMensajeErrorDireccion('')
    e.preventDefault();

    toggleMostrarEditar();
  };

  const handleGuardarDireccionFacturacion = (e) => {
    e.preventDefault();
    setDireccionFacturacion(direccionFacturacionTemporal);
    toggleMostrarEditar1();
  };

  const handleCheckboxChange = (e) => {
    setAceptoCondiciones(e.target.checked);
  };

  const handlePagarClick = async(e) => {
    e.preventDefault();
    setMensajeErrorMetodoEntrega('');
    setMensajeErrorMetodoPago('');
    setMensajeError('');
  
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
  
    const productos = obtenerProductosCarrito();
    const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '-');
    const precioTotal = calcularTotal();
    const formaPago = metodoPago === "credito" ? 1 : 2;
    const idUsuarioNumber = parseInt(idUsuario, 10);

    for (const producto of productos) {
      const idArtesano = producto.idArtesano || null;
      const productosNombres = producto.nombre;

      try {
        const response = await fetch(`http://localhost:1337/api/pedidos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              fechaPedidos: fecha,
              idUsuario: idUsuarioNumber,
              idArtesano: idArtesano,
              domicilio: direccionEntrega,
              gasto: precioTotal,
              ProductosComprados: productosNombres,
              formaPago: formaPago
            },
          }),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log("Compra:", responseData);
        } else {
          console.log("Error al actualizar los datos del usuario");
        }
      } catch (error) {
        console.error('Error en la petición:', error);
      }
    }
    localStorage.removeItem("cart");
    navigate("/perdidosUser")
  };
  
  const obtenerProductosCarrito = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return storedCart;
  };

  const showOpcionesDeEntrega = () => {
    setMostrarBloque(false);
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
          <p className="col-md-6 textoletra" style={{ fontSize: '64px' }}>Dirección De Envio</p>
        </div>
        <div className="form-group">
          <p className="textoletra" style={{ fontSize: '32px' }}>Mi cuenta</p>
          <p className="textoletra" style={{ fontSize: '22px' }}>{userData.email}</p>
        </div>
        <div className="row">
          <div className="col-md-6 izquierdaPago">
            <form onSubmit={handleGuardarDireccion}>
              <div className="group">
                <p className="textoletra1" style={{ fontSize: '32px' }} onClick={showOpcionesDeEntrega}>Opciones De Entrega</p>

                {!mostrarBloque ? (
                  <>
                    <hr />
                    <div className="rowDerecha">
                      {!mostrarEditar ? (
                        <>
                          <div className="col">
                            <img src={mapaIcon} alt="Mapa" />
                            <div className="datosUsuarios">
                              <p className="textoletra" style={{ fontSize: '18px' }}>{nombreApellido}</p>
                              <p className="textoletra" style={{ fontSize: '18px' }}>{direccionEntrega}</p>
                              <p className="textoletra" style={{ fontSize: '18px' }}>{telefono}</p>
                            </div>
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
                        </>
                      ) : (
                        <>
                          <div className="col">
                            <img src={mapaIcon} alt="Mapa" />
                            <div className="datosUsuarios">
                              <input className="textoletra" style={{ fontSize: '18px' }} value={nombreApellido} onChange={handleNombreChange} />
                              <input className="textoletra" style={{ fontSize: '18px' }} value={direccionEntrega} onChange={handleDireccionChange} />
                              <input className="textoletra" style={{ fontSize: '18px' }} value={telefono} onChange={handleTelefonoChange} />
                            </div>
                          </div>
                          <div className="col-auto">
                            <button
                              type="submit"
                              className="btnPago textoletra1" style={{ fontSize: '18px' }}
                            >
                              Guardar
                            </button>
                            {mensajeErrorDireccion && (
                              <p className="error">{mensajeErrorDireccion}</p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    <hr />
                    <div className="group1">
                      <p>
                        <label htmlFor="metodo_entrega" className="textoletra1" style={{ fontSize: '22px' }}>Método de entrega</label>
                      </p>
                      <div className="custom-control textoletra" style={{ fontSize: '18px' }}>
                        <div className="custom-radio">
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
                              FedEx - Standard
                              <span
                                style={{
                                  display: "inline-block",
                                  textAlign: "right",
                                  width: "10%",
                                }}
                              >
                              </span>
                              <br />
                              Entre 1 a 3 días hábiles
                            </span>
                          </label>
                        </div>
                        <strong>0,00€</strong>
                      </div>
                      <div className="custom-control textoletra" style={{ fontSize: '18px' }}>
                        <div className="custom-radio">
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
                              Correo - España
                              <span
                                style={{
                                  display: "inline-block",
                                  textAlign: "right",
                                  width: "10%",
                                }}
                              >
                              </span>
                              <br />
                              Entre 7 a 14 días hábiles
                            </span>
                          </label>
                        </div>
                        <strong>5,00€</strong>
                      </div>
                    </div>
                    {mensajeErrorMetodoEntrega && (
                      <p className="error">{mensajeErrorMetodoEntrega}</p>
                    )}
                    <hr />
                    <div className="group1">
                      <p>
                        <label htmlFor="requisitos" className="textoletra1" style={{ fontSize: '18px' }}>
                          ¿Tiene este pedido algún requisito especial?
                        </label>
                      </p>
                      <textarea
                        className="form-control textoletra1"
                        id="requisitos"
                        name="requisitos"
                        rows="2"
                        placeholder="Escribe los requisitos"
                        style={{ color: "white", opacity: 1 }}
                      ></textarea>
                    </div>
                    <button
                      className="btn textoletra" style={{ fontSize: '22px' }}
                      onClick={handleContinuarClick}
                    >
                      CONTINUAR
                    </button>
                  </>
                ) : null}
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="resumen">
              <p className="textoletra" style={{ fontSize: '32px' }}>Resumen</p>
              <div className="carritoPago"><p className="textoletra" style={{ fontSize: '22px' }}>Subtotal</p>
                <p className="textoletra" style={{ fontSize: '22px' }}>{totalCarritoP.toFixed(2)}€</p>
              </div>
              <hr />
              <div className="carritoPago">
                <p className="textoletra" style={{ fontSize: '22px' }}>Envío</p>
                <p className="textoletra" style={{ fontSize: '22px' }}>{metodoEntrega === "fedex" ? "0€" : "5.00€"}</p>
              </div>
              <hr />
              <div className="carritoPago">
                <p className="textoletra" style={{ fontSize: '32px' }}>Total</p>
                <p className="textoletra" style={{ fontSize: '32px' }}>{calcularTotal().toFixed(2)}€</p></div>
            </div>
          </div>
        </div>
        {mostrarBloque && (
          <div className="row">
            <form className="col-md-6 izquierdaPago">
              <div className="group">
                <p className="textoletra1" style={{ fontSize: '32px' }}>Pago</p>
                <hr />
                <div className="rowDerecha">
                  {!mostrarEditar1 ? (
                    <>
                      <div className="col">
                        <p htmlFor="direccion_facturacion" style={{ fontSize: '22px' }}>Dirección de facturación</p>
                        <p className="textoletra" style={{ fontSize: '18px' }}>{direccionFacturacion}</p>
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
                          onClick={toggleMostrarEditar1}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="colFactura">
                      
                      <p htmlFor="direccion_facturacion" style={{ fontSize: '22px' }}>Dirección de facturación</p>
                        <input
                          type="text"
                          className="direccionInput textoletra1"
                          style={{height:'30px', fontSize: '18px'}}
                          id="direccion_facturacion"
                          name="direccion_facturacion"
                          value={direccionFacturacionTemporal}
                          onChange={handleDireccionFacturacionChange}
                        />
                        <button
                          type="submit"
                          className="btnPago textoletra1"  style={{ fontSize: '18px' }}
                          onClick={handleGuardarDireccionFacturacion}
                        >
                          Guardar
                        </button>
                        {mensajeErrorDireccion && (
                          <p className="error">{mensajeErrorDireccion}</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <hr />
                <div className="group1">
                  <p>
                    <label htmlFor="metodo_pago" className="textoletra1" style={{ fontSize: '22px' }}>Método de Pago</label>
                  </p>
                  <div className="custom-radio textoletra" style={{ fontSize: '18px' }}>
                    <input
                      type="radio"
                      id="credito"
                      name="pago"
                      value="credito"
                      className="custom-control-input"
                      checked={metodoPago === "credito"}
                      onChange={handleMetodoPagoChange}
                    />
                    <label className="custom-control-label textoletra" htmlFor="credito">
                      <span style={{ display: "inline-block", width: "100%" }}>
                        Tarjeta de Crédito
                      </span>
                    </label>
                  </div>
                  <div className="custom-radio textoletra" style={{ fontSize: '18px' }}>
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
                    <label htmlFor="acepto_condiciones" className="textoletra" style={{fontSize:'18px'}}>
                      Acepte las condiciones generales
                    </label>
                  </p>
                  <div className="columanAcepto textoletra"> <input
                    type="checkbox"
                    id="acepto_condiciones"
                    checked={aceptoCondiciones}
                    onChange={handleCheckboxChange}
                  />
                  <p>
                    Acepto las Condiciones Generales de Venta y doy mi
                    consentimiento al tratamiento de mis datos, de conformidad
                    con la Política de Confidencialidad de Manos Creadoras.
                  </p></div>
                  {mensajeError && <p className="error">{mensajeError}</p>}
                </div>
                <button className="btn textoletra1" style={{ fontSize: '22px' }}onClick={handlePagarClick}>
                  PAGAR
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

export default Pago;
