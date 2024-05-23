import './App.css';
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
import Productos from './Componentes/productos';
import Contacto from './Componentes/contacto';
import Envio from './Componentes/envio';
import Faqs from './Componentes/faqs';
import Legal from './Componentes/legal';
import Pago from './Componentes/pago';
import Nosotros from './Componentes/sobreNosotros';
import Carrito from './Componentes/carrito';
import Artesano from './Componentes/artesano';
import Home from "./Componentes/home";


import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
      <>
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<MiCuenta/>}/>
            <Route path="/registrarse" element={<Registrarse />}/>
            <Route path="/perfilUser" element={<PerfilUser />}/>
            <Route path='/perfilAdmin' element={<PerfilAdmin />}/>
            <Route path='/perdidosUser' element={<PerdidosUser />}/>
            <Route path='/miWishlist' element={<MiWishlist />}/>
            <Route path='/misPerdidosProvedores' element={<MisPerdidosProvedores />}/>
            <Route path='/perfilArtesanos' element={<PerfilArtesanos />}/>
            <Route path='/perdidosProvedores' element={<PerdidosProvedores />}/>
            <Route path='/addnewArtesano' element={<AddNewArtesano />}/>
            <Route path="/cosmetico" element={<CosmeticosCatalogo />}/>
            <Route path="/hogar" element={<HogarCatalogo />}/>
            <Route path="/joyeria" element={<JoyeriaCatalogo />}/>
            <Route path="/productos" element={<Productos />}/>
            <Route path="/contacto" element={<Contacto />}/>
            <Route path="/envio" element={<Envio />}/>
            <Route path="/faqs" element={<Faqs />}/>
            <Route path="/legal" element={<Legal />}/>
            <Route path="/pago" element={<Pago />}/>
            <Route path="/sobreNosotros" element={<Nosotros />}/>
            <Route path="/carrito" element={<Carrito />}/>
            <Route path="/artesano" element={<Artesano />}/>
            <Route path="/home" element={<Home />}/>

            </Routes>
            
        </BrowserRouter>
        </>
    )
  };

  
  export default App;