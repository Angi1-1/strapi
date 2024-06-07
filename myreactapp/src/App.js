import './App.css';
import React, { useEffect, useState } from 'react';
import MiCuenta from './Componentes/miCuenta';
import Registrarse from './Componentes/registrarse';
import PerfilUser from './Componentes/perfilUser';
import PerfilAdmin from './Componentes/perfilAdmin';
import PerdidosUser from './Componentes/perdidosUser';
import MiWishlist from './Componentes/miWishlist';
import PerfilArtesanos from './Componentes/perfilArtesanos';
import MisPerdidosProvedores from './Componentes/misPerdidosProvedores';
import PerdidosProvedores from './Componentes/perdidosProvedores';
import AddNewArtesano from './Componentes/AddNewArtesano'
import HogarCatalogo from './Componentes/hogar';
import JoyeriaCatalogo from './Componentes/joyeria';
import CosmeticosCatalogo from './Componentes/cosmetico';
import ProductDetails from './Componentes/productDetails'; // Asegúrate de importar el componente correcto
import Contacto from './Componentes/contacto';
import Envio from './Componentes/envio';
import Faqs from './Componentes/faqs';
import Legal from './Componentes/legal';
import Pago from './Componentes/pago';
import Nosotros from './Componentes/sobreNosotros';
import Carrito from './Componentes/carrito';
import Artesano from './Componentes/artesano';
import Home from "./Componentes/home";
import GustarProvedor from "./Componentes/gustarProvedor"
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importar BrowserRouter desde 'react-router-dom'

function App() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  useEffect(() => {
    console.log('cart ', cart);
  }, [cart]);

  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Micuenta' element={<MiCuenta/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path="/registrarse" element={<Registrarse />}/>
        <Route path="/perfilUser" element={<PerfilUser />}/>
        <Route path='/perfilAdmin' element={<PerfilAdmin />}/>
        <Route path='/perdidosUser' element={<PerdidosUser />}/>
        <Route path='/miWishlist' element={<MiWishlist />}/>
        <Route path='/misPerdidosProvedores' element={<MisPerdidosProvedores />}/>
        <Route path='/perfilArtesanos' element={<PerfilArtesanos />}/>
        <Route path='/perdidosProvedores/' element={<PerdidosProvedores />}/>
        <Route path='/addnewArtesano' element={<AddNewArtesano />}/>
        <Route path="/cosmetico/" element={<CosmeticosCatalogo />}/>
        <Route path="/hogar" element={<HogarCatalogo />}/>
        <Route path="/joyeria/" element={<JoyeriaCatalogo />}/>
        <Route path="/producto/:id" element={<ProductDetails addToCart={addToCart}  />}/> 
        <Route path="/contacto" element={<Contacto />}/>
        <Route path="/envio" element={<Envio />}/>
        <Route path="/faqs" element={<Faqs />}/>
        <Route path="/legal" element={<Legal />}/>
        <Route path="/pago" element={<Pago  />}/>
        <Route path="/sobreNosotros" element={<Nosotros />}/>
        <Route path="/carrito" element={<Carrito cart={cart} setCart={setCart} />}/>
        <Route path="/artesano" element={<Artesano />}/>
        <Route path="/artesanoInfo/:id" element={<GustarProvedor />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
