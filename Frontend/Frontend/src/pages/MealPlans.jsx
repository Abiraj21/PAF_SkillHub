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

  return (
    <>
      <Nav />
      <div className="flex"></div>
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