import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import defaultImage from './default-recipe-img.png';
import ToggleButton from '../common/ToggleButton';
import RecipeApi from '../api/api';
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";
import DeleteRecipeModal from '../common/DeleteRecipeModal';

const RecipeDetail = () => {
  const { currentUser } = useContext(UserContext);
  const { id } = useParams();
  const history = useHistory();
  const [isMetric, setIsMetric] = useState(false);

  const [recipe, setRecipe] = useState(null);
 
  const edit = evt => {
    history.push({
      pathname: `/recipes/edit`,
      state: { recipe }
    });
  }

  const share = evt => {
    alert(`shared recipe: ${recipe.title}`)
  }

  const print = evt => {
    alert(`printed recipe: ${recipe.title}`)
  }

  const remove = async (evt) => {
    await RecipeApi.deleteRecipe(currentUser.username, recipe.id);
    history.push('/recipes');
  }

  useEffect(() => {
    const getRecipe = async () => {
      setRecipe(await RecipeApi.getRecipe(currentUser.username, id))
    }
    getRecipe()
  }, [id]);

  if (!recipe) return <LoadingSpinner />;

  // returns us amounts as default
  const ingredientLis = recipe.ingredients.map(({ id, label, metricAmount, metricUnit, usAmount, usUnit }) => {
    return <li key={id} >
                  {isMetric ? `${metricAmount} ${metricUnit}` :
                    `${usAmount} ${usUnit}`}
                  {label}
           </li>
  });

  const instructionLis = recipe.instructions.map(({ id, step }) => {
    return <li key={id}>{step}</li>
  })
 
  //{ title, servings, sourceUrl, sourceName, image, instructions,
 //         ingredients, cuisines, courses, diets, occasions }

  return (
      <div className="container">
        <div className="info">
          <h1>{recipe.title}</h1>
          <ul>
            <li><span>Servings</span>{recipe.servings}</li>
            <li><span>Prep Time</span>5 min</li>
            <li><span>Cook Time</span>25 min</li>
            <li><span>Total Time</span>30 min</li>
          </ul>
          <img src={recipe.image ? recipe.image : defaultImage} 
               alt="Recipe image" 
               className="float-right"/>
        </div>
        <div className="utilites">
          <ul>
            <li><button class="btn btn-primary" onClick={edit} type="button">Edit</button></li>
            <li><button class="btn btn-primary" onClick={share} type="button">Share</button></li>
            <li><button class="btn btn-primary" onClick={print} type="button">Print</button></li>
            <li><button type="button" 
                        class="btn btn-primary" 
                        data-bs-toggle="modal" 
                        data-bs-target="#deleteRecipeModal">
              Delete
            </button></li>
          </ul>
          <DeleteRecipeModal deleteRecipe={remove} />
        </div>
       <div class="row justify-content-around">
        <div class="col-4">
          <h2>Ingredients</h2>
          <ToggleButton labelL="us" labelR="metric" isChecked={isMetric}/>
          <ul>{ingredientLis}</ul>
        </div>
        <div class="col-4">
        <h2>Instructions</h2>
          <ol>{instructionLis}</ol>
        </div>
       </div>
      </div>
  );
// returns us amounts as default

}

export default RecipeDetail;