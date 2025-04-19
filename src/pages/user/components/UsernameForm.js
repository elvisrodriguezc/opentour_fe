import { FormControl, FormLabel, Spinner } from 'react-bootstrap';
import { useFormStatus } from 'react-dom';
import { Link } from 'react-router-dom';


export default function UsernameForm() {
    const { pending, data } = useFormStatus();
    return (
        <>
            <div className="form-floating mb-15px">
                <FormControl
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Correo Electrónico"
                    autoComplete="email"
                    autoFocus
                    required
                    className="form-control h-45px fs-13px"
                />
                <FormLabel htmlFor="email" className="d-flex align-items-center fs-13px text-gray-600">Correo Electrónico</FormLabel>
            </div>
            <div className="form-floating mb-15px">
                <FormControl
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    id="password"
                    className="form-control h-45px fs-13px"
                    required
                />
                <FormLabel htmlFor="password" className="d-flex align-items-center fs-13px text-gray-600">Contraseña</FormLabel>
            </div>

            <div className="form-check mb-30px">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="rememberMe"
                    value="1"
                    disabled={pending}
                    id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">
                    Recuérdame
                </label>
            </div>
            <div className="mb-15px">
                <button
                    type="submit"
                    disabled={pending}
                    className="btn btn-theme d-block h-45px w-100 btn-lg fs-14px mt-3">
                    Iniciar Sesión
                </button>
                <br />
                <div className="position-relative">
                    <Spinner
                        animation="grow"
                        variant="success"
                        size="md"
                        role="status"
                        className={`${pending ? '' : 'd-none'}`}
                    >
                    </Spinner>
                </div>
                <div className={`mb-40px pb-40px text-body ${pending ? '' : 'd-none'}`} >
                    {data ? `Solicitando acceso ${data?.get("email")}...` : ''}</div>

            </div>
            <div className={`mb-40px pb-40px text-body ${pending ? 'd-none' : ''}`}>
                ¿No eres miembro aún? Haz clic <Link to="/register" className="text-primary">aquí</Link> para registrarte.
            </div>
            <hr className="bg-gray-600 opacity-2" />
            <div className="text-gray-600 text-center text-gray-500-darker mb-0">
                &copy; Sat+ Todos los derechos reservados 2025
            </div>
        </>
    )
}