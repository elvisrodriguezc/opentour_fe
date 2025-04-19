import React from 'react';
import { Link } from 'react-router-dom';

function DropdownProfile() {
	return (
		<div className="navbar-item navbar-user dropdown">
			<a href="#/" className="navbar-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
				<img src="/assets/img/user/user-13.jpg" alt="" />
				<span>
					<span className="d-none d-md-inline fw-bold">Adam Schwartz</span>
					<b className="caret"></b>
				</span>
			</a>
			<div className="dropdown-menu dropdown-menu-end me-1">
				<Link to="/extra/profile" className="dropdown-item">Edit Profile</Link>
				<Link to="/email/inbox" className="dropdown-item d-flex align-items-center">
					Inbox
					<span className="badge bg-danger rounded-pill ms-auto pb-4px">2</span>
				</Link>
				<Link to="/calendar" className="dropdown-item">Calendar</Link>
				<Link to="/extra/settings-page" className="dropdown-item">Settings</Link>
				<div className="dropdown-divider"></div>
				<Link to="/login" className="dropdown-item" onClick={
					() => {
						localStorage.clear();
						sessionStorage.clear();
					}
				}>Log Out</Link>
			</div>
		</div>
	);
};

export default DropdownProfile;
