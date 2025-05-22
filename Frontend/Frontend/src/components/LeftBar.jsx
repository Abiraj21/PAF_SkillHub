import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faUsers,
  faEdit,
  faImage,
  faUserPlus,
  faTimes,
  faUtensils,
  faPlus,
  faBookOpen
} from "@fortawesome/free-solid-svg-icons";

export default function LeftBar() {
  return (
    <div className="w-1/5 p-4 bg-gray-100 h-screen sticky top-0">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="rounded-full w-24 h-24 object-cover border-4 border-white shadow"
          />
          <button onClick={openEditModal} className="absolute bottom-0 right-0 bg-blue-500 text-white ml-1 p-2 rounded-full cursor-pointer ">
              <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
          <h2 className="mt-2 font-semibold">{firstName} {lastName}</h2>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faUserFriends} 
            className="text-blue-500" />
            <span className="text-gray-700">Friends</span>
          </div>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faUsers} 
            className="text-green-500" />
            <span className="text-gray-700">Groups</span>
          </div>
          <Link to="/recipe">
          <div className="flex items-center space-x-2 mt-2 cursor-pointer">
            <FontAwesomeIcon icon={faUtensils} 
            className="text-red-500" />
            <span className="text-gray-700">Recipes</span>
          </div>
          </Link>
        </div>
    </div>
    
  );
}