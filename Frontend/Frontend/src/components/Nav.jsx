import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faEnvelope, faHome, faSearch, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/logo2.jpg';

export default function Nav() {
  return (
    <nav className="bg-white shadow-md px-4 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-9">
          <Link to="/" onClick={() => {
            localStorage.setItem("token", null);
            localStorage.setItem("id", null);
          }}>
            <img src={Logo} alt="Skillhub logo" className="w-30 h-auto float-left" />
          </Link>
        </div>
      </div>
    </nav>
  );
}