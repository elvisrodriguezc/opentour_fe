import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function DropdownProfile() {
	const [user] = useState(JSON.parse(localStorage.getItem('user')));
	return (
		<div className="navbar-item navbar-user dropdown">
			<a href="#/" className="navbar-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
				<img src="/assets/img/user/user-13.jpg" alt="" />
				<span>
					<span className="d-none d-md-inline fw-bold">{user.name}</span>
					<b className="caret"></b>
				</span>
			</a>
			<div className="dropdown-menu dropdown-menu-end me-1">
				<Link to="/extra/profile" className="dropdown-item">Editar Perfil</Link>
				<Link to="/email/inbox" className="dropdown-item d-flex align-items-center">
					Mensajes
					<span className="badge bg-danger rounded-pill ms-auto pb-4px">2</span>
				</Link>
				<Link to="/calendar" className="dropdown-item">Calendario</Link>
				<Link to="/extra/settings-page" className="dropdown-item">Configurar</Link>
				<div className="dropdown-divider"></div>
				<Link to="/login" className="dropdown-item " onClick={
					() => {
						localStorage.clear();
						sessionStorage.clear();
					}
				}>Cerrar Sesión</Link>
			</div>
		</div>
	);
};

export default DropdownProfile;
