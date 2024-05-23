import React from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import "./CSS/envio.css"

function TiendaDeCosmeticos() {
  return (
    <>
    <Header/>
    <div className="breadcrumb">
            <p><Link to="/home" className="link">Home</Link> / <Link to="/envio" className="link">Envio</Link></p>
        </div>
      <main className="container py-4">
        <div className="productos row">
          <div className="col-md-3">
            <a href="#" className="card-link">
              <div className="card">
                <img src="cosmeticos_fotos/_04d6f160-379a-4ef4-a407-d66f0d7ba951.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Producto 1</h5>
                  <p className="card-text">Descripción del Producto<span className="float-end">Precio: $XX.XX</span></p>
                </div>
              </div>
            </a>
          </div>
          {/* Repite este bloque para cada producto */}
          <div className="col-md-3">
            <a href="#" className="card-link">
              <div className="card">
                <img src="cosmeticos_fotos/_04d6f160-379a-4ef4-a407-d66f0d7ba951.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Producto 2</h5>
                  <p className="card-text">Descripción del Producto<span className="float-end">Precio: $XX.XX</span></p>
                </div>
              </div>
            </a>
          </div>
          {/* Agrega más productos aquí */}
        </div>
      </main>

      <Footer/>
    </>
  );
}

export default TiendaDeCosmeticos;
