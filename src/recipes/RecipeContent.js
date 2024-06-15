import React, { useState, useContext } from 'react';
import defaultImage from './default-recipe-img.png';
import ToggleButton from '../common/ToggleButton';
import { useHistory } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import RecipeApi from '../api/api';

const RecipeContent = ({ recipe }) => {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [isMetric, setIsMetric] = useState(false);
  //{ title, servings, sourceUrl, sourceName, image, instructions,
 //         ingredients, cuisines, courses, diets, occasions }

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
      <UtilityButtons edit={edit} share={share} print={print} remove={remove}/>
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
}

export default RecipeContent;