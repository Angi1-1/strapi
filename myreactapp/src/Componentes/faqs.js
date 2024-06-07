import React, { useState } from 'react';
import './CSS/faqs.css'; // Asegúrate de mover los estilos CSS aquí o adaptarlos como módulos de CSS
import { Link } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

const PrivacyAndCookies = () => {
  const [faq1Visible, setFaq1Visible] = useState(false);
  const [faq2Visible, setFaq2Visible] = useState(false);
  const [faq3Visible, setFaq3Visible] = useState(false);
  const [faq4Visible, setFaq4Visible] = useState(false);

  const toggleFaq1 = () => setFaq1Visible(!faq1Visible);
  const toggleFaq2 = () => setFaq2Visible(!faq2Visible);
  const toggleFaq3 = () => setFaq3Visible(!faq3Visible);
  const toggleFaq4 = () => setFaq4Visible(!faq4Visible);

  return (
    <div className="container">
        <Header/>
        <div className="breadcrumb">
            <p><Link to="/" className="link">Home</Link> / <Link to="/faqs" className="link">FAQS</Link> </p>
        </div>
      <div className="row">
        <div className="container-faq">
          <div className="title-faq">
            <h3 className='color'>FAQS</h3>
          </div>

          <div className="item-faq">
            <div className="question" onClick={toggleFaq1}>
              <h2 className='h2faqs'>¿Es posible seguir la evolución de mi pedido? </h2>
              <div className="more">{faq1Visible ? <i>-</i> : <i>+</i>}</div>
            </div>
            {faq1Visible && (
              <div className="answer">
                <p>
                En Manos Creadoras, valoramos su privacidad y nos comprometemos a ser transparentes sobre el uso de cookies en nuestro sitio web. Nuestra Política de Cookies tiene como objetivo brindarle información clara sobre cómo empleamos estas tecnologías y cómo puede controlar su experiencia de navegación. A continuación, encontrará una descripción detallada de los aspectos fundamentales de nuestra política:

1. **¿Qué son las Cookies?**
Las cookies son pequeños archivos de datos que se almacenan en su dispositivo al visitar nuestro sitio web. Contienen información que nos permite mejorar su experiencia de usuario y comprender mejor cómo interactúa con nuestro sitio.

2. **Tipos de Cookies Utilizadas**
Utilizamos cookies esenciales para el funcionamiento básico del sitio, cookies de rendimiento para recoger datos estadísticos anónimos sobre el uso del sitio, y cookies de funcionalidad que recuerdan sus preferencias y personalizan su interacción con nosotros.

3. **Uso de la Información Recopilada**
Los datos recogidos por las cookies se utilizan exclusivamente para enriquecer su experiencia de navegación y optimizar el rendimiento de nuestro sitio. Analizamos tendencias de uso general para mejorar la usabilidad y ofrecer contenido ajustado a sus intereses.

4. **Control y Configuración de Cookies**
Usted tiene control total sobre el uso de cookies en Manos Creadoras. Puede ajustar la configuración de su navegador en cualquier momento para aceptar o rechazar cookies según su preferencia personal.

5. **Cookies de Terceros**
Colaboramos con proveedores de confianza que también pueden establecer cookies para mejorar la funcionalidad y personalización de nuestros servicios. Aseguramos que todas las cookies de terceros se utilicen con respeto a su privacidad.

6. **Actualizaciones de la Política de Cookies**
Si realizamos cambios en nuestra Política de Cookies, le informaremos oportunamente y, de ser necesario, solicitaremos su consentimiento renovado.

7. **Contáctenos: Su Opinión es Importante**
Estamos a su disposición para resolver cualquier duda o pregunta sobre nuestra Política de Cookies. No dude en comunicarse con nosotros a través de nuestros canales de contacto disponibles en nuestro sitio web.

En Manos Creadoras, nos dedicamos a mantener un equilibrio entre la personalización de su experiencia en línea y la protección de su privacidad. Esta Política de Cookies refleja nuestro compromiso con la transparencia y el respeto hacia las preferencias de nuestros usuarios, asegurándonos de que se sienta informado y en control de su navegación en nuestro sitio.
                </p>
              </div>
            )}
          </div>

          <div className="item-faq">
            <div className="question" onClick={toggleFaq2}>
              <h2 className='h2faqs'>¿Cuáles son los plazos de reembolso?</h2>
              <div className="more">{faq2Visible ? <i>-</i> : <i>+</i>}</div>
            </div>
            {faq2Visible && (
              <div className="answer">
                <p>
                En Manos Creadoras, valoramos su privacidad y nos comprometemos a ser transparentes sobre el uso de cookies en nuestro sitio web. Nuestra Política de Cookies tiene como objetivo brindarle información clara sobre cómo empleamos estas tecnologías y cómo puede controlar su experiencia de navegación. A continuación, encontrará una descripción detallada de los aspectos fundamentales de nuestra política:

1. **¿Qué son las Cookies?**
Las cookies son pequeños archivos de datos que se almacenan en su dispositivo al visitar nuestro sitio web. Contienen información que nos permite mejorar su experiencia de usuario y comprender mejor cómo interactúa con nuestro sitio.

2. **Tipos de Cookies Utilizadas**
Utilizamos cookies esenciales para el funcionamiento básico del sitio, cookies de rendimiento para recoger datos estadísticos anónimos sobre el uso del sitio, y cookies de funcionalidad que recuerdan sus preferencias y personalizan su interacción con nosotros.

3. **Uso de la Información Recopilada**
Los datos recogidos por las cookies se utilizan exclusivamente para enriquecer su experiencia de navegación y optimizar el rendimiento de nuestro sitio. Analizamos tendencias de uso general para mejorar la usabilidad y ofrecer contenido ajustado a sus intereses.

4. **Control y Configuración de Cookies**
Usted tiene control total sobre el uso de cookies en Manos Creadoras. Puede ajustar la configuración de su navegador en cualquier momento para aceptar o rechazar cookies según su preferencia personal.

5. **Cookies de Terceros**
Colaboramos con proveedores de confianza que también pueden establecer cookies para mejorar la funcionalidad y personalización de nuestros servicios. Aseguramos que todas las cookies de terceros se utilicen con respeto a su privacidad.

6. **Actualizaciones de la Política de Cookies**
Si realizamos cambios en nuestra Política de Cookies, le informaremos oportunamente y, de ser necesario, solicitaremos su consentimiento renovado.

7. **Contáctenos: Su Opinión es Importante**
Estamos a su disposición para resolver cualquier duda o pregunta sobre nuestra Política de Cookies. No dude en comunicarse con nosotros a través de nuestros canales de contacto disponibles en nuestro sitio web.

En Manos Creadoras, nos dedicamos a mantener un equilibrio entre la personalización de su experiencia en línea y la protección de su privacidad. Esta Política de Cookies refleja nuestro compromiso con la transparencia y el respeto hacia las preferencias de nuestros usuarios, asegurándonos de que se sienta informado y en control de su navegación en nuestro sitio.
                </p>
              </div>
            )}
          </div>

          <div className="item-faq">
            <div className="question" onClick={toggleFaq3}>
              <h2 className='h2faqs'>Política de privacidad </h2>
              <div className="more">{faq3Visible ? <i>-</i> : <i>+</i>}</div>
            </div>
            {faq3Visible && (
              <div className="answer">
                <p>
                En Manos Creadoras, valoramos su privacidad y nos comprometemos a ser transparentes sobre el uso de cookies en nuestro sitio web. Nuestra Política de Cookies tiene como objetivo brindarle información clara sobre cómo empleamos estas tecnologías y cómo puede controlar su experiencia de navegación. A continuación, encontrará una descripción detallada de los aspectos fundamentales de nuestra política:

                1. **¿Qué son las Cookies?**
                Las cookies son pequeños archivos de datos que se almacenan en su dispositivo al visitar nuestro sitio web. Contienen información que nos permite mejorar su experiencia de usuario y comprender mejor cómo interactúa con nuestro sitio.

                2. **Tipos de Cookies Utilizadas**
                Utilizamos cookies esenciales para el funcionamiento básico del sitio, cookies de rendimiento para recoger datos estadísticos anónimos sobre el uso del sitio, y cookies de funcionalidad que recuerdan sus preferencias y personalizan su interacción con nosotros.

                3. **Uso de la Información Recopilada**
                Los datos recogidos por las cookies se utilizan exclusivamente para enriquecer su experiencia de navegación y optimizar el rendimiento de nuestro sitio. Analizamos tendencias de uso general para mejorar la usabilidad y ofrecer contenido ajustado a sus intereses.

                4. **Control y Configuración de Cookies**
                Usted tiene control total sobre el uso de cookies en Manos Creadoras. Puede ajustar la configuración de su navegador en cualquier momento para aceptar o rechazar cookies según su preferencia personal.

                5. **Cookies de Terceros**
                Colaboramos con proveedores de confianza que también pueden establecer cookies para mejorar la funcionalidad y personalización de nuestros servicios. Aseguramos que todas las cookies de terceros se utilicen con respeto a su privacidad.

                6. **Actualizaciones de la Política de Cookies**
                Si realizamos cambios en nuestra Política de Cookies, le informaremos oportunamente y, de ser necesario, solicitaremos su consentimiento renovado.

                7. **Contáctenos: Su Opinión es Importante**
                Estamos a su disposición para resolver cualquier duda o pregunta sobre nuestra Política de Cookies. No dude en comunicarse con nosotros a través de nuestros canales de contacto disponibles en nuestro sitio web.

                En Manos Creadoras, nos dedicamos a mantener un equilibrio entre la personalización de su experiencia en línea y la protección de su privacidad. Esta Política de Cookies refleja nuestro compromiso con la transparencia y el respeto hacia las preferencias de nuestros usuarios, asegurándonos de que se sienta informado y en control de su navegación en nuestro sitio.
                </p>
              </div>
            )}
          </div>

          <div className="item-faq">
            <div className="question" onClick={toggleFaq4}>
              <h2 className='h2faqs'>Política de privacidad </h2>
              <div className="more">{faq4Visible ? <i>-</i> : <i>+</i>}</div>
            </div>
            {faq4Visible && (
              <div className="answer">
                <p>
                En Manos Creadoras, valoramos su privacidad y nos comprometemos a ser transparentes sobre el uso de cookies en nuestro sitio web. Nuestra Política de Cookies tiene como objetivo brindarle información clara sobre cómo empleamos estas tecnologías y cómo puede controlar su experiencia de navegación. A continuación, encontrará una descripción detallada de los aspectos fundamentales de nuestra política:

1. **¿Qué son las Cookies?**
Las cookies son pequeños archivos de datos que se almacenan en su dispositivo al visitar nuestro sitio web. Contienen información que nos permite mejorar su experiencia de usuario y comprender mejor cómo interactúa con nuestro sitio.

2. **Tipos de Cookies Utilizadas**
Utilizamos cookies esenciales para el funcionamiento básico del sitio, cookies de rendimiento para recoger datos estadísticos anónimos sobre el uso del sitio, y cookies de funcionalidad que recuerdan sus preferencias y personalizan su interacción con nosotros.

3. **Uso de la Información Recopilada**
Los datos recogidos por las cookies se utilizan exclusivamente para enriquecer su experiencia de navegación y optimizar el rendimiento de nuestro sitio. Analizamos tendencias de uso general para mejorar la usabilidad y ofrecer contenido ajustado a sus intereses.

4. **Control y Configuración de Cookies**
Usted tiene control total sobre el uso de cookies en Manos Creadoras. Puede ajustar la configuración de su navegador en cualquier momento para aceptar o rechazar cookies según su preferencia personal.

5. **Cookies de Terceros**
Colaboramos con proveedores de confianza que también pueden establecer cookies para mejorar la funcionalidad y personalización de nuestros servicios. Aseguramos que todas las cookies de terceros se utilicen con respeto a su privacidad.

6. **Actualizaciones de la Política de Cookies**
Si realizamos cambios en nuestra Política de Cookies, le informaremos oportunamente y, de ser necesario, solicitaremos su consentimiento renovado.

7. **Contáctenos: Su Opinión es Importante**
Estamos a su disposición para resolver cualquier duda o pregunta sobre nuestra Política de Cookies. No dude en comunicarse con nosotros a través de nuestros canales de contacto disponibles en nuestro sitio web.

En Manos Creadoras, nos dedicamos a mantener un equilibrio entre la personalización de su experiencia en línea y la protección de su privacidad. Esta Política de Cookies refleja nuestro compromiso con la transparencia y el respeto hacia las preferencias de nuestros usuarios, asegurándonos de que se sienta informado y en control de su navegación en nuestro sitio.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default PrivacyAndCookies;
