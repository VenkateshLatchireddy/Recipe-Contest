import React from "react";
import "../styles/Filters.css";

function Filters({ filters, setFilters, sortOption, setSortOption, handleClearAll }) {
  // Function to update filters
  const handleFilterChange = (e, filterCategory) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterCategory]: e.target.value,
    }));
  };

  // Function to update sorting option
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Function to clear a specific filter
  const handleClearFilter = (filterCategory) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      delete updatedFilters[filterCategory]; // Remove filter from state
      return updatedFilters;
    });
  };

  return (
    <div className="filters">
      <h3>Filters</h3>

      {/* ✅ Sort Options Dropdown (Fixed Clear Button) */}
      <div className="filter-group">
        <label htmlFor="sort">Sort:</label>
        <select id="sort" value={sortOption} onChange={handleSortChange} className="animated-select">
          <option value="default">Show All Recipes</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highestRating">Highest Rating</option>
          <option value="lowestRating">Lowest Rating</option>
        </select>
        <button className="clear-btn" onClick={() => setSortOption("default")}>
          Clear
        </button>
      </div>

      {/* ✅ Attributes Dropdown (Fixed Clearing) */}
      <div className="filter-group">
        <label htmlFor="attributes">Attributes:</label>
        <select
          id="attributes"
          value={filters.attributes || ""}
          onChange={(e) => handleFilterChange(e, "attributes")}
          className="animated-select"
        >
          <option value="">Select Attribute</option>
          <option value="Contest Winner">Contest Winner</option>
          <option value="Featured">Featured</option>
          <option value="Test Kitchen-Approved">Test Kitchen-Approved</option>
        </select>
        <button className="clear-btn" onClick={() => handleClearFilter("attributes")}>
          Clear
        </button>
      </div>

      {/* ✅ Meal Type Dropdown */}
      <div className="filter-group">
        <label htmlFor="mealType">Meal Type:</label>
        <select
          id="mealType"
          value={filters.mealType || ""}
          onChange={(e) => handleFilterChange(e, "mealType")}
          className="animated-select"
        >
          <option value="">Select Meal Type</option>
          <option value="Dinner">Dinner</option>
          <option value="Lunch">Lunch</option>
          <option value="Dessert">Dessert</option>
          <option value="Breakfast">Breakfast</option>
        </select>
        <button className="clear-btn" onClick={() => handleClearFilter("mealType")}>
          Clear
        </button>
      </div>

      {/* ✅ Dish Type Dropdown */}
      <div className="filter-group">
        <label htmlFor="dishType">Dish Type:</label>
        <select
          id="dishType"
          value={filters.dishType || ""}
          onChange={(e) => handleFilterChange(e, "dishType")}
          className="animated-select"
        >
          <option value="">Select Dish Type</option>
          <option value="Curry">Curry</option>
          <option value="Pizza">Pizza</option>
          <option value="Seafood">Seafood</option>
          <option value="Soup">Soup</option>
          <option value="Mexican">Mexican</option>
          <option value="Smoothie">Smoothie</option>
        </select>
        <button className="clear-btn" onClick={() => handleClearFilter("dishType")}>
          Clear
        </button>
      </div>

      {/* ✅ Clear All Button (Now Also Resets Sort) */}
      <button
        className="clear-all-btn"
        onClick={() => {
          setFilters({});
          setSortOption("default"); // ✅ Now resets sorting too
        }}
      >
        Clear All
      </button>
    </div>
  );
}

export default Filters;
