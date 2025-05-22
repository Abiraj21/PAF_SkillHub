import Nav from '../components/Nav';
import { Link } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserFriends,
  faUsers,
  faEdit,
  faImage,
  faUserPlus,
  faTimes,
  faUtensils,
  faPlus,
  faBookOpen,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons';

export default function UserProfilePage() {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [profilePic, setProfilePic] = useState('https://www.istockphoto.com/photos/male-profile');
  const [firstName, setFirstName] = useState('');
  const [bio, setBio] = useState('');
  const [lastName, setLastName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tempPic, setTempPic] = useState(profilePic);
  const [tempFirstName, setTempFirstName] = useState(firstName);
  const [tempLastName, setTempLastName] = useState(lastName);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [showTechniqueModal, setShowTechniqueModal] = useState(false);
  const [techniqueName, setTechniqueName] = useState('');
  const [techniqueSteps, setTechniqueSteps] = useState('');
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [showPicModal, setShowPicModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("https://via.placeholder.com/100");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewsByRecipeId, setReviewsByRecipeId] = useState({});

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');
  const fileInputRef = useRef(null);

  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  return (
    <>
      <Nav />
      <div className="flex"></div>
    </>
  );
}