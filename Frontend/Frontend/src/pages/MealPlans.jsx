import React, { useState, useEffect } from "react";
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faUsers,
  faUtensils,
  faUserPlus,
  faPlus,
  faBookOpen,
  faClipboardList,
  faTrash,
  faEdit,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export default function MealPlans() {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [editSelectedRecipes, setEditSelectedRecipes] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState({});
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const currentUserId = Number(localStorage.getItem("id"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMealPlans();
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/recipes/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const fetchMealPlans = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/meal/getByUser/${currentUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sortedPlans = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setMealPlans(sortedPlans);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch meal plans:", error);
      setLoading(false);
    }
  };

  const handleSelectRecipe = (day, recipeId) => {
    setSelectedRecipes(prev => ({ ...prev, [day]: recipeId }));
  };

  const handleSaveMealPlan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/meal/add", {
        ...selectedRecipes,
        userId: currentUserId,
      }, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      = async () => {
    try {
      const response = await axios.get("http://localhost:8080/recipes/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const fetchMealPlans = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/meal/getByUser/${currentUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sortedPlans = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setMealPlans(sortedPlans);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch meal plans:", error);
      setLoading(false);
    }
  };

  const handleSelectRecipe = (day, recipeId) => {
    setSelectedRecipes(prev => ({ ...prev, [day]: recipeId }));
  };

  const handleSaveMealPlan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/meal/add", {
        ...selectedRecipes,
        userId: currentUserId,
      }, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      alert("Meal plan saved successfully!");
      setShowMealPlanModal(false);
      setSelectedRecipes({});
      fetchMealPlans();
    } catch (error) {
      console.error("Error saving meal plan:", error);
    }
  };

  const currentMealPlan = mealPlans.length > 0 ? mealPlans[0] : null;
  const oldMealPlans = mealPlans.slice(1);

  return (
   <>
      <Nav />
      <div className="flex">
        <div className="w-1/5 p-4 bg-gray-100 h-screen sticky top-0">
          <h2 className="text-lg font-semibold mb-4">Your Meal Plans</h2>
          <button onClick={() => setShowMealPlanModal(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
            <FontAwesomeIcon icon={faPlus} className="mr-2 " /> New Plan
          </button>
          <nav className="mt-6 space-y-4">
            <div className="flex items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-black hover:text-white group">
              <FontAwesomeIcon icon={faUserFriends} />
              <span>Friends</span>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-black hover:text-white group">
              <FontAwesomeIcon icon={faUsers} />
              <span>Groups</span>
            </div>
            <Link to="/recipe" className="flex items-center px-2 py-1 space-x-2 hover:bg-black hover:text-white group">
              <FontAwesomeIcon icon={faUtensils} />
              <span>Recipes</span>
            </Link>
            <Link to="/techniques" className="flex items-center space-x-2 hover:bg-black px-2 py-1 hover:text-white group transition duration-450">
              <FontAwesomeIcon icon={faBookOpen} />
              <span>Techniques</span>
            </Link>
            <Link to="/meals" className="flex items-center space-x-2 bg-black text-white px-2 py-1 rounded">
              <FontAwesomeIcon icon={faClipboardList} />
              <span>Meal Plans</span>
            </Link>
          </nav>
        </div>
        <div className="w-3/5 p-4 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Current Meal Plan</h2>
          {loading ? <p>Loading...</p> : currentMealPlan ? (
            <MealPlanCard plan={currentMealPlan} onDelete={() => {}} onEdit={() => {}} />
          ) : 
            <p>No meal plans found.</p>
          }
          {oldMealPlans.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mt-8 mb-4">Old Meal Plans</h2>
              {oldMealPlans.map(plan => (
                <MealPlanCard key={plan.id} plan={plan} onDelete={() => {}} onEdit={() => {}} />
              ))}
            </>
          )}
        </div>
      </div>
      {showMealPlanModal && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create Meal Plan</h2>
            <form className="space-y-3">
              {daysOfWeek.map(day => (
                <div key={day}>
                  <label className="block font-semibold mb-1 capitalize">{day}</label>
                  <select
                    value={selectedRecipes[day] || ""}
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select Recipe</option>
                    {recipes.map(recipe => (
                      <option key={recipe.id} value={recipe.recipeName}>{recipe.recipeName}</option>
                    ))}
                  </select>
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowMealPlanModal(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showMealPlanModal && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create Meal Plan</h2>
            <form onSubmit={handleSaveMealPlan} className="space-y-3">
              {daysOfWeek.map(day => (
                <div key={day}>
                  <label className="block font-semibold mb-1 capitalize">{day}</label>
                  <select
                    value={selectedRecipes[day] || ""}
                    onChange={(e) => handleSelectRecipe(day, e.target.value)}
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select Recipe</option>
                    {recipes.map(recipe => (
                      <option key={recipe.id} value={recipe.recipeName}>{recipe.recipeName}</option>
                    ))}
                  </select>
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowMealPlanModal(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function MealPlanCard({ plan, onDelete, onEdit }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{new Date(plan.createdAt).toLocaleDateString()}</h3>
        <div className="space-x-2">
          <button onClick={() => onEdit(plan)} className="text-blue-500 hover:underline">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => onDelete(plan.id)} className="text-red-500 hover:underline">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <ul className="text-sm text-gray-700 space-y-1">
        {Object.entries(plan).filter(([key]) => daysOfWeek.includes(key)).map(([day, recipe], idx) => (
          <li key={idx} className="capitalize">{day}: {recipe}</li>
        ))}
      </ul>
    </div>
  );
}

const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];