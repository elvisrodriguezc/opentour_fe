import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import UsernameForm from './components/UsernameForm';
import { submitForm } from './components/actions';
import { Navigate } from 'react-router-dom';

function LoginV3() {
  const ref = useRef(null);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const tokenSaved = localStorage.getItem('token');
  useEffect(() => {
    // Verifica si el token existe y redirige al dashboard
    if (tokenSaved) {
      console.log("LoginV3: Token encontrado. Redirigiendo al dashboard.");
      setRedirectToDashboard(true);
    } else {
      console.log("LoginV3: Token no encontrado. No redirigiendo.");
    }
  }, [tokenSaved]);

  if (redirectToDashboard) {
    console.log("LoginV3: Estado redirectToDashboard es true. Renderizando <Navigate>.");
    // Renderiza el componente Navigate para ir al dashboard
    return <Navigate to='/dashboard/v3' replace={true} />; // ¡Usa replace!
  }

  return (
    <div className="login login-with-news-feed">
      <div className="news-feed">
        <div className="news-image" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-11.jpg)' }}></div>
        <div className="news-caption">
          <h4 className="caption-title"><b>Sat</b>+ Admin App</h4>
          <p>
            Descarga la aplicación Sat+ para iPhone®, iPad® y Android™. Cadá vez que inicies sesión, podrás adminsitrar tu negocio desde cualquier lugar. La aplicación Sat+ es una herramienta poderosa que te permite gestionar tu negocio de manera eficiente y efectiva, sin importar dónde te encuentres.
          </p>
        </div>
      </div>
      <div className="login-container">
        <div className="login-header mb-30px">
          <div className="brand">
            <div className="d-flex align-items-center">
              <span className="logo"></span>
              <b>Sat</b> +
            </div>
            <small>Prepárate para un gran día de trabajo. </small>
          </div>
          <div className="icon">
            <i className="fa fa-sign-in-alt"></i>
          </div>
        </div>
        <div className="login-content">
          <form
            ref={ref}
            action={async (formData) => {
              await submitForm(formData);
              ref.current.reset();
            }}
            className="fs-13px">
            <UsernameForm />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginV3;