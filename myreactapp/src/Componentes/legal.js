import React, { useState } from "react";
import "./CSS/legal.css"; // Importa los estilos CSS
import Header from "./header";
import { Link } from "react-router-dom";
import Footer from "./footer";

const PrivacyAndCookies = () => {
  const [faq1Visible, setFaq1Visible] = useState(false);
  const [faq2Visible, setFaq2Visible] = useState(false);

  const toggleFaq1 = () => setFaq1Visible(!faq1Visible);
  const toggleFaq2 = () => setFaq2Visible(!faq2Visible);

  return (
    <div className="container">
      <Header />
      <div className="breadcrumb">
            <p><Link to="/" className="link">Home</Link> / <Link to="/legal" className="link">Legal</Link></p>
        </div>
      <div className="row">
        <div className="container-faq">
          <div className="title-faq">
            <h3 className="color">Política de privacidad y Cookies</h3>
          </div>

          <div className="item-faq">
            <div className="question" onClick={toggleFaq1}>
              <h2 className="h2Legal">Política de privacidad </h2>
              <div className="more">{faq1Visible ? <i>-</i> : <i>+</i>}</div>
            </div>
            {faq1Visible && (
              <div className="answer">
                <p>
                  En Manos Creadoras, valoramos su privacidad y nos
                  comprometemos a ser transparentes sobre el uso de cookies en
                  nuestro sitio web. Nuestra Política de Cookies tiene como
                  objetivo brindarle información clara sobre cómo empleamos
                  estas tecnologías y cómo puede controlar su experiencia de
                  navegación. A continuación, encontrará una descripción
                  detallada de los aspectos fundamentales de nuestra política:
                  <br />
                  <br />
                  <strong>1. ¿Qué son las Cookies?</strong>
                  <br />
                  Las cookies son pequeños archivos de datos que se almacenan en
                  su dispositivo al visitar nuestro sitio web. Contienen
                  información que nos permite mejorar su experiencia de usuario
                  y comprender mejor cómo interactúa con nuestro sitio.
                  <br />
                  <br />
                  <strong>2. Tipos de Cookies Utilizadas</strong>
                  <br />
                  Utilizamos cookies esenciales para el funcionamiento básico
                  del sitio, cookies de rendimiento para recoger datos
                  estadísticos anónimos sobre el uso del sitio, y cookies de
                  funcionalidad que recuerdan sus preferencias y personalizan su
                  interacción con nosotros.
                  <br />
                  <br />
                  <strong>3. Uso de la Información Recopilada</strong>
                  <br />
                  Los datos recogidos por las cookies se utilizan exclusivamente
                  para enriquecer su experiencia de navegación y optimizar el
                  rendimiento de nuestro sitio. Analizamos tendencias de uso
                  general para mejorar la usabilidad y ofrecer contenido
                  ajustado a sus intereses.
                  <br />
                  <br />
                  <strong>4. Control y Configuración de Cookies</strong>
                  <br />
                  Usted tiene control total sobre el uso de cookies en Manos
                  Creadoras. Puede ajustar la configuración de su navegador en
                  cualquier momento para aceptar o rechazar cookies según su
                  preferencia personal.
                  <br />
                  <br />
                  <strong>5. Cookies de Terceros</strong>
                  <br />
                  Colaboramos con proveedores de confianza que también pueden
                  establecer cookies para mejorar la funcionalidad y
                  personalización de nuestros servicios. Aseguramos que todas
                  las cookies de terceros se utilicen con respeto a su
                  privacidad.
                  <br />
                  <br />
                  <strong>6. Actualizaciones de la Política de Cookies</strong>
                  <br />
                  Si realizamos cambios en nuestra Política de Cookies, le
                  informaremos oportunamente y, de ser necesario, solicitaremos
                  su consentimiento renovado.
                  <br />
                  <br />
                  <strong>7. Contáctenos: Su Opinión es Importante</strong>
                  <br />
                  Estamos a su disposición para resolver cualquier duda o
                  pregunta sobre nuestra Política de Cookies. No dude en
                  comunicarse con nosotros a través de nuestros canales de
                  contacto disponibles en nuestro sitio web.
                  <br />
                  <br />
                  En Manos Creadoras, nos dedicamos a mantener un equilibrio
                  entre la personalización de su experiencia en línea y la
                  protección de su privacidad. Esta Política de Cookies refleja
                  nuestro compromiso con la transparencia y el respeto hacia las
                  preferencias de nuestros usuarios, asegurándonos de que se
                  sienta informado y en control de su navegación en nuestro
                  sitio.
                </p>
              </div>
            )}
          </div>

          <div className="item-faq">
            <div className="question" onClick={toggleFaq2}>
              <h2 className="h2Legal">Política de cookies</h2>
              <div className="more">{faq2Visible ? <i>-</i> : <i>+</i>}</div>
            </div>
            {faq2Visible && (
              <div className="answer">
                <p>
                  <strong>
                    Nuestra Promesa de Privacidad en Manos Creadoras
                  </strong>
                  <br />
                  En el corazón de Manos Creadoras yace una promesa
                  inquebrantable: la custodia sagrada de tu privacidad. Cada
                  hilo de información que compartes con nosotros es manejado con
                  el máximo cuidado, porque sabemos que en cada dato hay una
                  historia, un pedazo de tu vida.
                  <br />
                  <br />
                  <strong>La Recolección de Tus Secretos</strong>
                  <br />
                  Cuando navegas por los rincones creativos de nuestra
                  plataforma, recolectamos susurros de tu viaje: tu nombre, el
                  eco de tu voz en un correo electrónico, la huella de tus
                  preferencias. Como guardianes de estos secretos, te aseguramos
                  que cada pedazo de información se recoge no por curiosidad,
                  sino para tejer una experiencia más cálida y personalizada
                  para ti.
                  <br />
                  <br />
                  <strong>La Danza de los Datos</strong>
                  <br />
                  Los datos que nos confías no son estáticos; se mueven y
                  transforman, ayudándonos a crear un sitio que resuene con tus
                  deseos y necesidades. Pero no te preocupes, no vendemos tus
                  secretos. Solo los compartimos con aquellos aliados que nos
                  ayudan a mantener la plataforma viva y vibrante, siempre con
                  tu permiso tácito y bajo la luna de la confidencialidad.
                  <br />
                  <br />
                  <strong>Fortalezas y Candados</strong>
                  <br />
                  Protegemos tus secretos con fortalezas digitales y candados
                  virtuales, pero incluso en este mundo de murallas de datos, la
                  invulnerabilidad es un mito. Aunque nos esforzamos por
                  proteger tu privacidad, hay hechizos—vulnerabilidades de
                  Internet—que están más allá de nuestro control.
                  <br />
                  <br />
                  <strong>Tus Poderes Mágicos</strong>
                  <br />
                  Recuerda, en Manos Creadoras, tú tienes el poder. Puedes ver
                  los secretos que guardamos, cambiarlos, o pedirnos que los
                  hagamos desaparecer. Tu varita mágica es tu voz: háblanos, y
                  nosotros obedeceremos.
                  <br />
                  <br />
                  <strong>Las Migas de Pan Digitales</strong>
                  <br />
                  Ah, las cookies, esas migas de pan digitales que dejas detrás
                  mientras exploras. Las usamos con respeto, como guías para
                  mejorar tu camino en nuestra plataforma, nunca como espías en
                  tu bolsillo.
                  <br />
                  <br />
                  <strong>El Río de los Cambios</strong>
                  <br />
                  Nuestra política de privacidad no es un pergamino antiguo,
                  inmóvil y olvidado. Es un río vivo que fluye y cambia, y te
                  mantendremos al tanto de cada nueva corriente.
                  <br />
                  <br />
                  <strong>Tu Voz en Nuestra Mesa Redonda</strong>
                  <br />
                  Si alguna vez te sientes perdido en el bosque de datos o
                  tienes curiosidad sobre los hechizos que usamos para proteger
                  tus secretos, acércate a nuestra mesa redonda. Estamos aquí
                  para hablar, escuchar y ayudar.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyAndCookies;
