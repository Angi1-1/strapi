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

  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value);
  };

    const handleDireccionChange = (e) => {
      const direccionCompleta = e.target.value;
      setDireccionEntrega(direccionCompleta);
    };

  const handleDireccionFacturacionChange = (e) => {
    const direccionCompleta = e.target.value;
    setDireccionFacturacion(direccionCompleta);
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
  
    const nuevaDireccionCalle = document.getElementById("calle_entrega").value;
    setDireccionEntrega(nuevaDireccionCalle);
  };

  const handleGuardarDireccionFacturacion = (e) => {
    e.preventDefault();
    toggleMostrarEditarDireccion();
  
    const nuevaDireccionFacturacion = document.getElementById("direccion_facturacion").value;
  setDireccionFacturacion(nuevaDireccionFacturacion);
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
          <p className="col-md-6 textoletra" style={{ fontSize: '64px' }}>Dirección De Envio</p>
        </div>
        <div className="form-group">
          <p className="textoletra" style={{ fontSize: '32px' }}>Mi cuenta</p>
          <p className="textoletra" style={{ fontSize: '22px' }}>{userData.email}</p>
        </div>
        <div className="row">
          <div className="col-md-6 izquierdaPago">
            <form action="">
              <div className="group">
                <h2>Opciones de entrega</h2>
                <hr />
                <div className="row">
                  <div className="col">
                    <p>
                      <label htmlFor="calle_entrega">Calle de entrega</label>
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
                  />
                  <button type="submit" className="btnPago">
                    Guardar
                  </button>
                </div>
                <hr />
                <div className="row">
                  <div className="col-auto">
                    <img
                      src={plus}
                      alt="Más"
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                      onClick={toggleMostrarNueva}
                    />
                  </div>
                  <div className="col">
                    <p>
                      <label htmlFor="otra_direccion">
                        Añadir una dirección
                      </label>
                    </p>
                  </div>
                </div>
                <div
                  id="nueva_direccion"
                  style={{ display: mostrarNueva ? "block" : "none" }}
                >
                  <form>
                    <div className="groupPago">
                      <input
                        type="text"
                        className="formPago"
                        id="calle"
                        name="calle"
                        placeholder="Calle"
                      />
                    </div>
                    <div className="groupPago">
                      <input
                        type="text"
                        className="formPago"
                        id="piso"
                        name="piso"
                        placeholder="Piso"
                      />
                    </div>
                    <div className="groupPago">
                      <input
                        type="text"
                        className="formPago"
                        id="portal"
                        name="portal"
                        placeholder="Portal"
                      />
                    </div>
                    <div className="groupPago">
                      <input
                        type="text"
                        className="formPago"
                        id="provincia"
                        name="provincia"
                        placeholder="Provincia"
                      />
                    </div>
                    <div className="groupPago">
                      <input
                        type="text"
                        className="formPago"
                        id="comunidad_autonoma"
                        name="comunidad_autonoma"
                        placeholder="Comunidad Autónoma"
                      />
                    </div>
                    <div className="groupPago">
                      <input
                        type="text"
                        className="form-control"
                        id="codigo_postal"
                        name="codigo_postal"
                        placeholder="Código Postal"
                      />
                    </div>
                    <button type="submit" className="btnPago">
                      Guardar
                    </button>
                  </form>
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
                          <strong>0,00€</strong>
                        </span>
                        <br />
                        Entre 7 a 14 días hábiles
                      </span>
                    </label>
                  </div>
                </div>
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
                <button className="btn btn-primary">Continuar</button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="resumen">
              <h2>Resumen</h2>
              <p>Subtotal</p>
              <p>122,00€</p>
              <hr />
              <p>Envío</p>
              <p>
                {metodoEntrega === "fedex" ? "FedEx - Standard" : "Correos - España"}
              </p>
              <p>
                {metodoEntrega === "fedex"
                  ? "Entre 1 a 3 días hábiles"
                  : "Entre 7 a 14 días hábiles"}
              </p>
              <p>0,00€</p>
              <hr />
              <p>Total</p>
              <p>122.00€</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Pago;
