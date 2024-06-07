import React from "react";
import Header from "./header";
import Footer from "./footer";
import "./CSS/inprocess.css"; 

function InProcess() {
  return (
    <>
      <Header />
      <div className="inprocess-container">
        <h1>¡Página en Proceso!</h1>
        <p>Estamos trabajando en esta página. ¡Vuelve pronto para ver el resultado!</p>
      </div>
      <Footer />
    </>
  );
}

export default InProcess;
