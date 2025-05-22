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

  return (
    <>
      <Nav />
      <div className="flex"></div>
    </>
  );
}