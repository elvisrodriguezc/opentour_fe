import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppSettings } from './../../config/app-settings.js';
import { slideToggle } from './../../composables/slideToggle.js';

function SidebarProfile() {
	function handleProfileExpand(e) {
		e.preventDefault();

		var targetSidebar = document.querySelector('.app-sidebar:not(.app-sidebar-end)');
		var targetMenu = e.target.closest('.menu-profile');
		var targetProfile = document.querySelector('#appSidebarProfileMenu');
		var expandTime = (targetSidebar && targetSidebar.getAttribute('data-disable-slide-animation')) ? 0 : 250;

		if (targetProfile) {
			if (targetProfile.style.display === 'block') {
				targetMenu.classList.remove('active');
			} else {
				targetMenu.classList.add('active');
			}
			slideToggle(targetProfile, expandTime);
			targetProfile.classList.toggle('expand');
		}
	}
	const [user] = useState(JSON.parse(localStorage.getItem('user')));
	return (
		<AppSettings.Consumer>
			{({ appSidebarMinify }) => (
				<div className="menu">
					<div className="menu-profile">
						<Link to="/" onClick={handleProfileExpand} className="menu-profile-link">
							<div className="menu-profile-cover with-shadow"></div>
							<div className="menu-profile-image">
								<img src="/assets/img/user/user-13.jpg" alt="" />
							</div>
							<div className="menu-profile-info">
								<div className="d-flex align-items-center">
									<div className="flex-grow-1">
										{user.name}
									</div>
									<div className="menu-caret ms-auto"></div>
								</div>
								<small>{user.role.name}</small>
							</div>
						</Link>
					</div>
					<div id="appSidebarProfileMenu" className="collapse">
						<div className="menu-item pt-5px">
							<Link to="/" className="menu-link">
								<div className="menu-icon"><i className="fa fa-cog"></i></div>
								<div className="menu-text">Configuración</div>
							</Link>
						</div>
						<div className="menu-item">
							<Link to="/" className="menu-link">
								<div className="menu-icon"><i className="fa fa-pencil-alt"></i></div>
								<div className="menu-text"> Sugerencias</div>
							</Link>
						</div>
						<div className="menu-item pb-5px">
							<Link to="/" className="menu-link">
								<div className="menu-icon"><i className="fa fa-question-circle"></i></div>
								<div className="menu-text"> Ayuda</div>
							</Link>
						</div>
						<div className="menu-divider m-0"></div>
					</div>
				</div>
			)}
		</AppSettings.Consumer>
	)
}

export default SidebarProfile;