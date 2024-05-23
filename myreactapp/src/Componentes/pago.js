import "../Componentes/CSS/pago.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import plus from "../Icon/plus.svg";
import lapiz from "../Icon/pencil.svg";

function App() {
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [mostrarNueva, setMostrarNueva] = useState(false);
  const [metodoEntrega, setMetodoEntrega] = useState("");

  const toggleMostrarEditar = () => {
    setMostrarEditar(!mostrarEditar);
  };

  const toggleMostrarNueva = () => {
    setMostrarNueva(!mostrarNueva);
  };

  const handleMetodoEntregaChange = (e) => {
    setMetodoEntrega(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="breadcrumb">
        <p>
          <Link to="/home" className="link">Home</Link> / <Link to="/pago" className="link">Pago</Link>
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

export default App;
