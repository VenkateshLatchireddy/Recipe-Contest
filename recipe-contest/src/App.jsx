import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import RecipeList from "./components/RecipeList";
import recipesData from "./data/recipes";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState(recipesData); // Default recipes data
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState("default");

  // Function to sort recipes based on the selected sort option
  const sortRecipes = (option, recipesList) => {
    let sortedRecipes;
    switch (option) {
      case "newest":
        sortedRecipes = [...recipesList].sort((a, b) => new Date(b.uploadedOn) - new Date(a.uploadedOn));
        break;
      case "oldest":
        sortedRecipes = [...recipesList].sort((a, b) => new Date(a.uploadedOn) - new Date(b.uploadedOn));
        break;
      case "highestRating":
        sortedRecipes = [...recipesList].sort((a, b) => b.avgRating - a.avgRating);
        break;
      case "lowestRating":
        sortedRecipes = [...recipesList].sort((a, b) => a.avgRating - b.avgRating);
        break;
      default:
        sortedRecipes = recipesData; // Reset to original data when "default" is selected
        break;
    }
    setRecipes(sortedRecipes);
  };

  // Effect to handle sorting when sortOption changes
  useEffect(() => {
    sortRecipes(sortOption, recipesData);
  }, [sortOption]);

  // Filter recipes based on the search query and selected filters
  const filteredRecipes = recipes.filter((recipe) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      recipe.name.toLowerCase().includes(query) ||
      recipe.chef.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query);
  
    // Matches attributes (contestWinner, featured, testKitchenApproved)
    const matchesAttributes =
      !filters.attributes ||
      (filters.attributes === "Contest Winner" && recipe.contestWinner) ||
      (filters.attributes === "Featured" && recipe.featured) ||
      (filters.attributes === "Test Kitchen-Approved" && recipe.testKitchenApproved);
  
    // Matches mealType
    const matchesMealType = !filters.mealType || recipe.mealType === filters.mealType;
  
    // Matches dishType
    const matchesDishType = !filters.dishType || recipe.dishType === filters.dishType;
  
    return matchesSearch && matchesAttributes && matchesMealType && matchesDishType;
  });

  // Reset filters and sorting when "Clear All" is clicked
  const handleClearAll = () => {
    setFilters({});
    setSortOption("default");
    setRecipes(recipesData); // ✅ Reset recipes correctly
  };

  return (
    <div className="container">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {/* Filters Component */}
      <Filters
        filters={filters}
        setFilters={setFilters}
        sortOption={sortOption}
        setSortOption={setSortOption} // ✅ Pass sortOption to update it correctly
        handleClearAll={handleClearAll}
      />
      
      <RecipeList recipes={filteredRecipes} />
    </div>
  );
}

export default App;
