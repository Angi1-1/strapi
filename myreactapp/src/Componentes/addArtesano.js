import React, { useState } from "react";
import "./CSS/editProduct.css";
import bcrypt from 'bcryptjs';
import BackDrop from "./BackDrop";

const EditarArtesano = ({ onCancel, onload }) => {
  const [nombreApellido, setNombreApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [imagen, setImagen] = useState(null);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };
  const validateForm = () => {
    const newErrors = {};
    const nombreApellidoRegex = /^[A-Za-z\s]+$/;
    const telefonoRegex = /^[0-9]+$/;

    if (!nombreApellido) {
      newErrors.nombreApellido = "El nombre no puede estar vacío";
    } else if (!nombreApellidoRegex.test(nombreApellido)) {
      newErrors.nombreApellido = "El nombre no puede contener números";
    }

    if (!email) {
      newErrors.email = "El email no puede estar vacío";
    }

    if (!telefono) {
      newErrors.telefono = "El teléfono no puede estar vacío";
    } else if (!telefonoRegex.test(telefono)) {
      newErrors.telefono = "El teléfono debe contener solo números";
    } else if (telefono.length !== 9) {
      newErrors.telefono = "El teléfono debe tener 9 dígitos";
    }

    if (!domicilio) {
      newErrors.domicilio = "La descripción no puede estar vacía";
    }

    if (password && password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const enviaApis = async () => {
    const hashedPassword = await bcrypt.hash(password, 10) 

    const body = {
      data: {
        nombreApellido,
        email,
        telefono,
        domicilio,
        passwordUser: hashedPassword,
        acesso: 2,
      },
    };
    console.log(body);

    try {
      const response = await fetch(`http://localhost:1337/api/usuariomanos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Actualización exitosa", data);
        onload();
        onCancel();
      } else {
        console.error("Error al actualizar", await response.text());
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await enviaApis();
    }
  };

  return (
    <>
      <BackDrop>
        <div className="addNewUser">
          <p className="tituloEditProyecto">Editar Artesano</p>
          <form className="formularioEditrProyecto" onSubmit={handleSubmit}>
            <div className="name">
              <div className="Nombre">
                <label className="texto1EditProyecto">Nombre y Apellido</label>
                <input
                  className="inputTextoEditProyecto"
                  type="text"
                  value={nombreApellido}
                  onChange={(e) => setNombreApellido(e.target.value)}
                />
                {errors.nombreApellido && <p className="error">{errors.nombreApellido}</p>}
              </div>
              <div className="Nombre">
                <label className="texto1EditProyecto">Email</label>
                <input
                  className="inputTextoEditProyecto"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
            </div>
            <div className="name">
              <div className="Nombre">
                <label className="texto1EditProyecto">Teléfono</label>
                <input
                  className="inputTextoEditProyecto"
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
                {errors.telefono && <p className="error">{errors.telefono}</p>}
              </div>
              <div className="Nombre">
                <label className="texto1EditProyecto">Contraseña</label>
                <input
                  className="inputTextoEditProyecto"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
            </div>
            <div className="descripciones">
              <label className="texto1EditProyecto">Descripciones</label>
              <textarea
                className="textareaEditarProyecto"
                rows="5"
                cols="50"
                value={domicilio}
                onChange={(e) => setDomicilio(e.target.value)}
              ></textarea>
              {errors.domicilio && <p className="error">{errors.domicilio}</p>}
            </div>
            <div className="addImagenProyecto">
              <label className="texto1EditProyecto">Añadir Imagen</label>
              <input type="file" onChange={handleFileChange} />
            </div>
            <div className="divBtnEditProduct">
              <button className="btnSubmitEditProyecto" type="submit">Guardar</button>
              <button className="btnCancelarEditProyecto" type="button" onClick={onCancel}>Cancelar</button>
            </div>
          </form>
        </div>
      </BackDrop>
    </>
  );
};

export default EditarArtesano;
