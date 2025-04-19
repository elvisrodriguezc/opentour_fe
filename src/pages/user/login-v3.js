import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import UsernameForm from './components/UsernameForm';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../reducer/slices/loginSlice';
import { Spinner } from 'react-bootstrap';

function LoginV3() {
  const ref = useRef(null);

  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.login)

  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const tokenSaved = localStorage.getItem('token') || sessionStorage.getItem('token');

  useEffect(() => {
    // Verifica si el token existe y redirige al dashboard
    if (tokenSaved) {
      setRedirectToDashboard(true);
    }
  }, [tokenSaved]);

  if (redirectToDashboard) {
    return <Navigate to='/dashboard/v3' replace={true} />; // ¡Usa replace!
  }

  async function submitForm(query) {

    const formValues = Object.fromEntries(query);
    dispatch(login(formValues))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          if (formValues.hasOwnProperty('rememberMe') && formValues.rememberMe === "1") {
            localStorage.setItem("token", JSON.stringify(res.payload.token));
          } else {
            sessionStorage.setItem("token", JSON.stringify(res.payload.token));
          }
          setRedirectToDashboard(true);
        }
      })
      .catch((error) => {
        console.error("Error in Promise:", error);
        return false; // Indicate failure
      })
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
              <Spinner
                animation="grow"
                variant="success"
                size="md"
                role="status"
                className={`${loading === 'pending' ? '' : 'd-none'}`}
              >
              </Spinner>
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
              await submitForm(formData)
                .then(() => {
                  ref.current.reset();
                })
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