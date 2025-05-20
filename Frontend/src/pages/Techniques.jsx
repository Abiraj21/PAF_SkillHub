import React from "react";
import Nav from '../components/Nav';
import {Link} from 'react-router-dom';
import { useRef,useState,useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faUsers,
  faUtensils,
  faUserPlus,
  faPlus,
  faTimes,
  faTrash,
  faEdit,faBookOpen,faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

export default function(){
  const [techniques, setTechniques] = useState([]);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showTechniqueModal, setShowTechniqueModal] = useState(false);
  const [techniqueName, setTechniqueName] = useState("");
  const [techniqueSteps, setTechniqueSteps] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTechnique, setEditTechnique] = useState(null);
  const [editTechniqueName, setEditTechniqueName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const token = localStorage.getItem("token");
  const currentUserId = Number(localStorage.getItem("id"));

  //fetch all techniques
  const fetchTechniques = async () => {
    try {
          const response = await axios.get("http://localhost:8081/techniques/getAll", {
          headers: {
              Authorization: `Bearer ${token}`,
          },
          });
          setTechniques(response.data);
        } 
    catch (error) {
          console.error("Error fetching recipes:", error);
        }
    };

  useEffect(() => {
        fetchTechniques();
      }, []);
  
   //http://localhost:8081/reviews/add/${recipe.id}?userId=${currentUserId}
  // Fetch recipes from backend
  

  const handleEdit = (technique) => {
    setEditTechnique(technique);
    setEditTechniqueName(technique.name);
    setEditDescription(technique.description);
    setEditMode(true);
  };

  const handleUpdateTechnique = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/techniques/update/${editTechnique.id}`, {
        name: editTechniqueName,
        description: editDescription,
        userId: currentUserId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
  
      alert("Cooking Technique updated!");
      setEditMode(false);
      setEditTechnique(null);
      fetchTechniques();
    } catch (error) {
      alert("Update failed: " + error.message);
    }
  };


    const hadndleNewRecipe = async (e) => {
        e.preventDefault();
        const currentUserId = localStorage.getItem('id');
        const data = {
          recipeName:recipeName,
          ingredients:ingredients,
          instructions:instructions,
          cookingTime:cookingTime,
          userId:currentUserId,
        };
      
        try {
          const response = await fetch('http://localhost:8081/recipes/add', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
      
          const result = await response.json();
      
          if (response.ok) {
            alert('New Recipe added successful!');
            console.log("Data being sent:", data);
            setShowRecipeModal(false);
            setCookingTime('');
            setIngredients('');
            setInstructions('');
            setRecipeName('');
          } else {
            alert(result.message || 'Something went wrong.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Something went wrong: ' + error.message);
        }
      };
       // Handle Delete Recipe
  const handleDelete = async (techniqueid) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this cooking technique?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8081/techniques/delete/${techniqueid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Cooking Technique deleted!");
      fetchTechniques();
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
  };

  const handleAddTechnique = async (e) => {
    e.preventDefault();
    const currentUserId = localStorage.getItem('id');
    const data = {
      name:techniqueName,
      description:techniqueSteps,
      userId:currentUserId,
      
    };
  
    try {
      const response = await fetch('http://localhost:8081/techniques/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('New Cooking Technique added successful!');
        console.log("Data being sent:", data);
        setTechniqueName("");
        setTechniqueSteps("");
        setShowTechniqueModal(false);
        fetchTechniques();
      } else {
        alert(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong: ' + error.message);
    }
  };
  return (
          <>
            <Nav/>
            <div className="flex">
              {/* Sidebar */}
              <div className="w-1/5 p-4 bg-gray-100 h-screen sticky top-0">
                <h2 className="text-lg font-semibold mb-4">Explore Cooking Techniques</h2>
                <button onClick={() => setShowTechniqueModal(true)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded cursor-pointer">
                  <FontAwesomeIcon icon={faPlus} className="mr-2 " /> New Technique
                </button>
                <nav className="mt-6 space-y-4">
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-black px-2 py-1  hover:text-white group transition duration-450">
                    <FontAwesomeIcon icon={faUserFriends} />
                    <span >Friends</span>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-black px-2 py-1  hover:text-white group transition duration-450">
                    <FontAwesomeIcon icon={faUsers} />
                    <span >Groups</span>
                  </div>
                  <Link to="/recipe" className="flex items-center space-x-2 hover:bg-black px-2 py-1  hover:text-white group transition duration-450">
                    <FontAwesomeIcon icon={faUtensils} /> <span>Recipes</span>
                  </Link>
                  <Link to="/techniques" className="flex items-center space-x-2 px-2 py-1 bg-black text-white px-2 py-1 rounded">
                    <FontAwesomeIcon icon={faBookOpen} /> <span>Techniques</span>
                  </Link>
                  <Link to="/meals" className="flex items-center space-x-2 hover:bg-black px-2 py-1  hover:text-white group transition duration-450">
                    <FontAwesomeIcon icon={faClipboardList} /> <span>Meal Plans</span>
                  </Link>
                </nav>
              </div>
              {/* Main Content */}
              <div className="w-3/5 p-6 space-y-4">
                {techniques.map((technique) => (
                  <div key={technique.id} className="bg-white p-4 rounded shadow-md relative">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold">{technique.name}</h3>
                    </div>
                    <p><strong>Steps:</strong> {technique.description}</p>
                    {/* Update & Delete Buttons (Only for owner) */}
                    {technique.user.id == currentUserId && (
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          onClick={() => handleEdit(technique)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          onClick={() => handleDelete(technique.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    )}
                    <br/>
                  </div>
                ))}
              </div>
              {/* Right Sidebar */}
              <div className="w-1/5 p-4 bg-gray-50 h-screen sticky top-0">
                <h3 className="font-semibold mb-4">Suggested Friends</h3>
                <div className="space-y-4">
                      {["Alice", "Bob", "Charlie"].map((name, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                              <img
                                src={`https://via.placeholder.com/40`}
                                alt={name}
                                className="rounded-full w-10 h-10"/>
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
            {/* Cooking Technique Modal */}
            {showTechniqueModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-40">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-xl font-semibold mb-4">Add Cooking Technique</h2>
                  <input
                    type="text"
                    placeholder="Technique Name"
                    value={techniqueName}
                    onChange={(e) => setTechniqueName(e.target.value)}
                    className="w-full border rounded p-2 mb-3"
                  />
                  <textarea
                    placeholder="Step-by-step Description"
                    value={techniqueSteps}
                    onChange={(e) => setTechniqueSteps(e.target.value)}
                    className="w-full border rounded p-2 mb-4 h-32"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowTechniqueModal(false)}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddTechnique}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
            {editMode && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                    onClick={() => setEditMode(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <h2 className="text-xl font-semibold mb-4">Update Recipe</h2>
                  <input
                    type="text"
                    placeholder="Cooking Technique Name"
                    value={editTechniqueName}
                    onChange={(e) => setEditTechniqueName(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"/>

                  <textarea
                    placeholder="Ingredients"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"/>

                  <button
                    onClick={handleUpdateTechnique}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </>
        )
}