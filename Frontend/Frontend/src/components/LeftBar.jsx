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
    </div>
  );
}