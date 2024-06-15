import React, { useState, useEffect, useContext } from "react";
import SearchForm from "../common/SearchForm";
import RecipeApi from "../api/api";
import RecipeCard from "./RecipeCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";

const RecipeCardList = () => {
  const { currentUser } = useContext(UserContext);
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
   getRecipes();
  }, []);

  const getRecipes = async (query) => {
    const recipes = await RecipeApi.getRecipes(currentUser.username, query);
    setRecipes(recipes);
  }

  if (!recipes) return <LoadingSpinner />;

  return (
    <div className="RecipeCardList col-md-8 offset-md-2">
      <SearchForm searchFor={getRecipes} />
      {recipes.length
          ? (
              <div className="RecipeCardList-list">
                {recipes.map(r => (
                    <RecipeCard
                        key={r.id}
                        id={r.id}
                        title={r.title}
                        image={r.image}
                    />
                ))}
              </div>
          ) : (
              <p className="lead">You have no recipes yet!</p>
          )}
    </div>
  );
}

export default RecipeCardList;