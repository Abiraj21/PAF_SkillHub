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

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/profile-picture/get/${userId}`, {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const imageUrl = URL.createObjectURL(response.data);
        setProfilePicUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };
    fetchProfilePic();
  }, [token, userId]);

   useEffect(() => {
    if (!token) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8080/users/get-profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { firstname, lastname, id, email, bio } = res.data.user;
        setFirstName(firstname);
        setLastName(lastname);
        setBio(bio);
        localStorage.setItem('id', id);
        localStorage.setItem('email', email);
      } catch (err) {
        console.error('Error fetching profile data:', err);
      }
    };
    fetchProfile();
  }, [token]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/recipes/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes(response.data);
      fetchAllReviews(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const fetchAllReviews = async (recipes) => {
    const allReviews = {};
    for (const recipe of recipes) {
      try {
        const res = await axios.get(`http://localhost:8080/reviews/${recipe.id}`);
        allReviews[recipe.id] = res.data;
      } catch (error) {
        console.error("Error fetching reviews for recipe " + recipe.id, error);
      }
    }
    setReviewsByRecipeId(allReviews);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const openEditModal = () => {
    setTempFirstName(firstName);
    setTempLastName(lastName);
    setShowModal(true);
  };

  return (
    <>
      <Nav />
      <div className="flex">
        <div className="w-1/5 p-4 bg-gray-100 h-screen sticky top-0">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={profilePicUrl}
                alt="Profile"
                className="rounded-full w-24 h-24 object-cover border-4 border-white shadow"
              />
              <button
                onClick={() => setShowPicModal(true)}
                className="absolute bottom-0 right-0 bg-white text-gray-800 p-1 rounded-full shadow hover:bg-gray-200"
                title="Edit Picture"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
            <div className="flex flex-col items-center mt-2">
              <div className="flex items-center">
                <h2 className="font-semibold mr-2">{firstName} {lastName}</h2>
                <button
                  onClick={openEditModal}
                  className="text-black p-2 rounded-full cursor-pointer"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
              <div className="max-w-xs border-gray-300 rounded-md p-2 text-sm text-gray-700 break-words">
                <p className="text-center font-semibold text-lg">{bio}</p>
              </div>
            </div>
          </div>
          <nav className="mt-6 space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-black px-2 py-1 hover:text-white group transition duration-450">
              <FontAwesomeIcon icon={faUserFriends} />
              <span>Friends</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-black px-2 py-1 hover:text-white group transition duration-450">
              <FontAwesomeIcon icon={faUsers} />
              <span>Groups</span>
            </div>
            <Link to="/recipe" className="flex items-center space-x-2 hover:bg-black px-2 py-1 hover:text-white group transition duration-450">
              <FontAwesomeIcon icon={faUtensils} /> <span>Recipes</span>
            </Link>
            <Link to="/techniques" className="flex items-center space-x-2 hover:bg-black px-2 py-1 hover:text-white group transition duration-450">
              <FontAwesomeIcon icon={faBookOpen} /> <span>Techniques</span>
            </Link>
            <Link to="/meals" className="flex items-center space-x-2 hover:bg-black px-2 py-1 hover:text-white group transition duration-450">
              <FontAwesomeIcon icon={faClipboardList} /> <span>Meal Plans</span>
            </Link>
          </nav>
        </div>
        <div className="w-3/5 p-4">
          <div className="bg-white p-4 rounded shadow mb-4">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's cooking today?"
              className="w-full border rounded p-2 mb-2"
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer space-x-2 text-blue-500">
                <FontAwesomeIcon icon={faImage} />
                <span>Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setPostImage(e.target.files[0])}
                />
              </label>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Post
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div key={index} className="bg-white p-4 rounded shadow">
                <p className="mb-2">{post.text}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="max-h-60 w-full object-cover rounded"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/5 p-4 bg-gray-50 h-screen sticky top-0">
          <h3 className="font-semibold mb-4">Suggested Friends</h3>
          <div className="space-y-4">
            {["Alice", "Bob", "Charlie"].map((name, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <img
                    src={`https://avatars.dicebear.com/api/avataaars/${name}.svg`}
                    alt={name}
                    className="rounded-full w-10 h-10"
                  />
                  <span>{name}</span>
                </div>
                <button className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                  <FontAwesomeIcon icon={faUserPlus} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}