import './CSS/micuenta.css';
import { Link } from 'react-router-dom';
import Header from './header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import bcrypt from 'bcryptjs';

const MiCuenta = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    console.log(localStorage.getItem('user_id'))
    const onLogin = async (email, password) => {
        setError('');
        console.log("User", email);
        console.log("Password", password);
        try {
            const response = await fetch(`http://localhost:1337/api/usuariomanos?filters[email]=${email}`, {
                method: 'GET'
            });

            if (response.ok) {
                const jsonData = await response.json();
                if (jsonData.data.length > 0) {
                    const userData = jsonData.data[0]; // Access the first item in the data array
                    const userId = userData.id;
                    const userAccessLevel = userData.attributes.acesso;
                    const hashedPassword = userData.attributes.passwordUser;

                    const passwordMatch = await bcrypt.compare(password, hashedPassword);
                    if (passwordMatch) {
                        // Store in localStorage or handle as needed
                        localStorage.setItem('user_id', userId);
                        localStorage.setItem('acesso', userAccessLevel);
                        localStorage.setItem('username', userData.attributes.nombreApellido);

                        console.log('Access Level:', localStorage.getItem('acesso'));
                        if (localStorage.getItem('acesso') == 1) {
                            console.log("Admin");
                            navigate('/perfilAdmin');
                        } else if (localStorage.getItem('acesso') == 2) {
                            console.log("Artesano");
                            navigate('/perfilArtesanos');
                        } else {
                            console.log("User");
                            navigate('/perfilUser');
                        }
                    } else {
                        console.log("Credenciales incorrectas");
                        setError("Contraseña incorrectas. Intenta de nuevo");
                    }
                } else {
                    console.log("Credenciales incorrectas");
                    setError("Email o Contraseña incorrectas. Intenta de nuevo");
                }
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'User no encontrado');
            }
        } catch (error) {
            console.error('Error en la petición:', error);
            setError('Error en la conexión con el servidor');
        }
    };

    return (
        <>
            <Header />
            <div className="breadcrumb">
                <p><Link to="/" className="link">Home</Link> / <Link to="/miCuenta" className="link">Mi cuenta</Link> </p>
            </div>
            <div className='MiCuentaParte1'>
                <p className="MiCuentaTitulo1">MI CUENTA</p>
                <hr></hr>
                <form className="MiCuentaFormulario" onSubmit={handleSubmit}>
                    <p className="MiCuentaTexto1">Introduce su correo electrónico y contraseña a continuación para acceder a su cuenta. </p>
                    <Link to='/registrarse' className="MiCuentaTexto1 especial">¿Sin Cuenta?</Link>
                    <label className="MiCuentaTexto1">Email</label>
                    <input type="text" className="rellenarMicuenta MiCuentaTexto1" placeholder="Introduce su correo electronico" value={email} onChange={(e) => setEmail(e.target.value)} ></input>
                    <label className="MiCuentaTexto1">Contraseña</label>
                    <input type="password" className="rellenarMicuenta MiCuentaTexto1" placeholder="Introduce su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                    {error && <div className="MiCuentaError">{error}</div>}
                    <label className="MiCuentaTexto1 especial">¿Olvidó su contraseña?</label>
                    <button className="submitMiCuentaParte1" type="submit">Entrar</button>
                </form>
            </div>
        </>
    );
}

export default MiCuenta;
