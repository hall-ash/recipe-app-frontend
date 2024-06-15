import React, { useContext, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import RecipeUrlBar from "../common/RecipeUrlBar";
import "./Homepage.css";
import UserContext from "../auth/UserContext";
import RecipeView from "./ExtractedRecipe";
import queryString from 'query-string';
import RecipeApi from '../api/api';

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
  const [recipe, setRecipe] = useState(null);
  const { search } = useLocation();
  const values = queryString.parse(search);

  useEffect(() => {
    const getRecipe = async() => {
      const recipe = await RecipeApi.getRecipeFromUrl({ url: values.url });
      console.debug('recipe', recipe)
      setRecipe(recipe);
    }
    if (values.url) getRecipe();
  }, [values.url]);

  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  return (
      <div className="Homepage">
        {recipe ?
          <RecipeView recipe={recipe} /> :
        
        <div className="container text-center">
          <h1 className="mb-4 font-weight-bold">Recipe App</h1>
          <p className="lead">Get a recipe.</p>
          
          <div className="RecipeUrlBar">
            <RecipeUrlBar setRecipe={setRecipe} />
          </div>
        </div>
        }
      </div>
  );
}

export default Homepage;
