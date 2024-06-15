import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect, useContext } from 'react';
import defaultImage from '../recipes/default-recipe-img.png';
import ToggleButton from '../common/ToggleButton';
import { useHistory } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import RecipeApi from '../api/api';
import SaveRecipeModal from '../common/SaveRecipeModal';
import useToggle from '../hooks/useToggle';
import './ExtractedRecipe.css';

/**
 * View recipe extracted from url.
 * Recipe has not been added to database.
 * No auth needed.
 * 
 */
const ExtractedRecipe = ({ recipe }) => {

  const { currentUser } = useContext(UserContext);
  const [isMetric, toggleMetric] = useToggle();

  const share = evt => {
    alert(`shared recipe: ${recipe.title}`)
  }

  const print = evt => {
    alert(`printed recipe: ${recipe.title}`)
  }

  const save = async (evt) => {
    await RecipeApi.create(currentUser.username, recipe);
  }


// returns us amounts as default
  const ingredientLis = recipe.ingredients.map(({ id, label, measures }) => {
    const metric = _.find(measures, { unitType: 'metric' });
    const us = _.find(measures, { unitType: 'us' });

    const measurement = isMetric 
      ? `${metric.amount} ${metric.unit}` 
      : `${us.amount} ${us.unit}`

    return <li key={id} >
              {measurement} {label}
           </li>
  });

  const instructionLis = recipe.instructions.map(instruction => {
    return <li key={uuidv4()}>{instruction}</li>
  })

  return (
    <div className="ExtractedRecipe container">
      <div className="m-4">
        {/* <img src={recipe.image ? recipe.image : defaultImage} 
             alt="Recipe" 
             className="float-right fitting-image"/> */}
        <div className="center-cropped float-right" style={{backgroundImage: `url(${recipe.image ? recipe.image : defaultImage})` }}></div>
        <h1>{recipe.title}</h1>
        <div className="source mb-2">from <a href={recipe.sourceUrl}>{recipe.sourceName}</a></div>
        <div className="info">
          <div><b>Servings </b>{recipe.servings}</div>
          <div><b>Total Time </b>30 min</div>
        </div>
        
      </div>
      <div className="utilities mb-4">
          <button className="btn btn-primary" onClick={share} type="button"><i className="bi bi-share"></i> Share</button>
          <button className="btn btn-primary" onClick={print} type="button"><i className="bi bi-printer"></i> Print</button>
          <button type="button" 
                      className="btn btn-primary" 
                      data-bs-toggle="modal" 
                      data-bs-target="#saveRecipeModal">
            <i className="bi bi-bookmark-plus"></i> Save
          </button>
        <SaveRecipeModal saveRecipe={save} />
      </div>
     <div class="row justify-content-around">
      <div class="col-5">
        <h2>Ingredients</h2>
        <ToggleButton toggleState={toggleMetric}/>
        <ul>{ingredientLis}</ul>
      </div>
      <div class="col-5">
      <h2>Instructions</h2>
        <ol>{instructionLis}</ol>
      </div>
     </div>
    </div>
  );
}

export default ExtractedRecipe;