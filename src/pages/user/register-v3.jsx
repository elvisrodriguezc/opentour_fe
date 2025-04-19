import React, { useEffect, useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppSettings } from '../../config/app-settings.js';

function RegisterV3() {
  const context = useContext(AppSettings);

  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to='/dashboard/v3' />;
  }

  return (
    <div className="register register-with-news-feed">
      <div className="news-feed">
        <div className="news-image" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-9.jpg)' }}></div>
        <div className="news-caption">
          <h4 className="caption-title"><b>Color</b> Admin App</h4>
          <p>
            Como administrador de la aplicación Color Admin, utilizas la consola de administración de Color Admin para gestionar la cuenta de tu organización, como agregar nuevos usuarios, administrar configuraciones de seguridad y activar los servicios que deseas que tu equipo acceda.
          </p>
        </div>
      </div>
      <div className="register-container">
        <div className="register-header mb-25px h1">
          <div className="mb-1">Regístrate</div>
          <small className="d-block fs-15px lh-16">Crea tu cuenta de Color Admin. Es gratis y siempre lo será.</small>
        </div>
        <div className="register-content">
          <form onSubmit={handleSubmit} className="fs-13px">
            <div className="mb-3">
              <label className="mb-2">Nombre <span className="text-danger">*</span></label>
              <div className="row gx-3">
                <div className="col-md-6 mb-2 mb-md-0">
                  <input type="text" className="form-control fs-13px" placeholder="Nombre" />
                </div>
                <div className="col-md-6">
                  <input type="text" className="form-control fs-13px" placeholder="Apellido" />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="mb-2">Correo Electrónico <span className="text-danger">*</span></label>
              <input type="text" className="form-control fs-13px" placeholder="Dirección de correo electrónico" />
            </div>
            <div className="mb-3">
              <label className="mb-2">Reingresa el Correo Electrónico <span className="text-danger">*</span></label>
              <input type="text" className="form-control fs-13px" placeholder="Reingresa la dirección de correo electrónico" />
            </div>
            <div className="mb-4">
              <label className="mb-2">Contraseña <span className="text-danger">*</span></label>
              <input type="password" className="form-control fs-13px" placeholder="Contraseña" />
            </div>
            <div className="form-check mb-4">
              <input className="form-check-input" type="checkbox" value="" id="agreementCheckbox" />
              <label className="form-check-label" htmlFor="agreementCheckbox">
                Al hacer clic en Registrarse, aceptas nuestros <Link to="/user/register-v3">Términos</Link> y confirmas que has leído nuestra <Link to="/user/register-v3">Política de Datos</Link>, incluyendo nuestro <Link to="/user/register-v3">Uso de Cookies</Link>.
              </label>
            </div>
            <div className="mb-4">
              <button type="submit" className="btn btn-theme d-block w-100 btn-lg h-45px fs-13px">Regístrate</button>
            </div>
            <div className="mb-4 pb-5">
              ¿Ya eres miembro? Haz clic <Link to="/login">aquí</Link> para iniciar sesión.
            </div>
            <hr className="bg-gray-600 opacity-2" />
            <p className="text-center text-gray-600">
              &copy; Color Admin Todos los Derechos Reservados 2025
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterV3;
