import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/registrarse.css';
import Header from './header';
import Footer from './footer';

const Registrarse = () => {
    // Estados para manejar los valores de los inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombreApellido, setNombreApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [aceptoTerminos, setAceptoTerminos] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const todoUser = async (email) => {
        try {
            const response = await fetch(`http://localhost:1337/api/usuariomanos`, {
                method: 'GET'
            });
            if (response.ok) {
                const usuario = await response.json();
                console.log("Usuario registrado", usuario);
                setSuccess('Usuario registrado con éxito');
                setError('');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al registrar usuario');
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
            setSuccess('');
        }
    }
    const registriApi = async (nombreApellido, email, telefono, fechaNacimiento, ubicacion, ciudad, codigoPostal, password) => {
        const body = {
            data: {
                nombreApellido: nombreApellido,
                email: email,
                telefono: telefono,
                fecha_nac: fechaNacimiento,
                domicilio: `${ubicacion}, ${ciudad}, ${codigoPostal}`,
                passwordUser: password,
                acesso: 3
            }
        };
        console.log("El body de registro", body)
        try {
            const response = await fetch(`http://localhost:1337/api/usuariomanos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                const usuario = await response.json();
                console.log("Usuario registrado", usuario);
                setSuccess('Usuario registrado con éxito');
                setError('');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al registrar usuario');
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
            setSuccess('');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación del formulario
        if (!email || !password || !nombreApellido || !telefono || !fechaNacimiento || !ubicacion || !ciudad || !codigoPostal || !aceptoTerminos) {
            setError('Por favor, complete todos los campos y acepte los términos.');
            setSuccess('');
            return;
        }
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            setSuccess('');
            return;
        }

        console.log("Email:", email);
        console.log("Contraseña:", password);
        console.log("Nombre y Apellido:", nombreApellido);
        console.log("Teléfono:", telefono);
        console.log("Fecha de Nacimiento:", fechaNacimiento);
        console.log("Ubicación:", ubicacion);
        console.log("Ciudad:", ciudad);
        console.log("Código Postal:", codigoPostal);
        console.log("Acepto Términos:", aceptoTerminos);

        registriApi(nombreApellido, email, telefono, fechaNacimiento, ubicacion, ciudad, codigoPostal, password);
    }

    return (
        <>
            <Header />
            <div className="breadcrumb">
                <p><Link to="/home" className="link">Home</Link> / <Link to="/registrarse" className="link">Registrarse</Link> </p>
            </div>
            <div className='RegistrarseParte1'>
                <p className="RegistrarseTitulo1">MI CUENTA</p>
                <hr />
                <form className="RegistrarseFormulario" onSubmit={handleSubmit}>
                    <p className="RegistrarseTexto1">Al crear una cuenta, acepta los Términos y Condiciones Generales de Uso y da su consentimiento al tratamiento de sus datos, de conformidad con la Política de Confidencialidad de Manos Creadoras. </p>
                    <div className="ContenidosRegistrarse">
                        <div className="derechaRegistrarse">
                            <label className="RegistrarseTexto1">Email</label>
                            <input
                                type="text"
                                className="rellenarRegistrarse RegistrarseTexto1"
                                placeholder="Introduce un correo electronico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="RegistrarseTexto1">Contraseña</label>
                            <input
                                type="password"
                                className="rellenarRegistrarse RegistrarseTexto1"
                                placeholder="Introduce una contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="RegistrarseTexto2">DATOS PERSONALES</p>
                            <label className="RegistrarseTexto1">Nombre y Apellido</label>
                            <input
                                type="text"
                                className="rellenarRegistrarse RegistrarseTexto1"
                                placeholder="Introduce su nombre y apellido"
                                value={nombreApellido}
                                onChange={(e) => setNombreApellido(e.target.value)}
                            />
                            <label className="RegistrarseTexto1">Telefono</label>
                            <input
                                type="text"
                                className="rellenarRegistrarse RegistrarseTexto1"
                                placeholder="Introduce su telefono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                            <label className="RegistrarseTexto1">Fecha de Nacimiento</label>
                            <input
                                type="date"
                                className="rellenarRegistrarse RegistrarseTexto1"
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                            />
                        </div>
                        <div className="derechaRegistrarse">
                            <p className="RegistrarseTexto2">DATOS DE FACTURACIÓN</p>
                            <label className="RegistrarseTexto1">Ubicación</label>
                            <input
                                type="text"
                                className="rellenarRegistrarse RegistrarseTexto1"
                                placeholder="Introduce su dirección"
                                value={ubicacion}
                                onChange={(e) => setUbicacion(e.target.value)}
                            />
                            <label className="RegistrarseTexto1">Ciudad</label>
                            <input
                                type="text"
                                className="rellenarRegistrarse RegistrarseTexto1"
                                placeholder="Introduce su ciudad"
                                value={ciudad}
                                onChange={(e) => setCiudad(e.target.value)}
                            />
                            <label className="RegistrarseTexto1">Codigo Postal</label>
                            <input
                                type="text"
                                className="rellenarRegistrarse RegistrarseTexto1"
                                placeholder="Introduce su codigo postal"
                                value={codigoPostal}
                                onChange={(e) => setCodigoPostal(e.target.value)}
                            />
                        </div>
                    </div>

                    <label className="checkboxRegistrarseTrajeta">
                        <input
                            type="checkbox"
                            checked={aceptoTerminos}
                            onChange={(e) => setAceptoTerminos(e.target.checked)}
                        />
                        Acepto los Condiciones Generales de Venta y doy mi consentimiento al tratamiento de mis datos, de conformidad con la Política de Confidencialidad de Manos Creadoras.
                    </label>
                    <button className="submitRegistrarseParte1" type="submit">Entrar</button>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {success && <div style={{ color: 'green' }}>{success}</div>}
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Registrarse;
