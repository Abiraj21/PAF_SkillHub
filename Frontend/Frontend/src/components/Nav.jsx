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
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} className="text-xl text-gray-600 hover:text-blue-500" />
          </Link>
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
            <input
              type="search"
              placeholder="Search..."
              className="outline-none text-sm w-full"
            />
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="">
            <FontAwesomeIcon icon={faEnvelope} className="text-xl text-gray-600 hover:text-blue-500" />
          </Link>
          <Link to="">
            <FontAwesomeIcon icon={faBell} className="text-xl text-gray-600 hover:text-blue-500" />
          </Link>
          <Link to="/" onClick={() => {
            localStorage.setItem("token", null);
            localStorage.setItem("id", null);
          }}>
            <FontAwesomeIcon icon={faRightFromBracket} className="text-xl text-gray-600 hover:text-blue-500" />
          </Link>
        </div>
      </div>
    </nav>
  );
}