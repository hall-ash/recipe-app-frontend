import React, { useContext, useState } from 'react';
import UserContext from "../auth/UserContext";
import { useHistory } from 'react-router-dom';
import defaultImage from './default-recipe-img.png';

const RecipeCard = ({ id, image, title }) => {

  const history = useHistory();

  // go to recipe details page
  const goToDetails = evt => {
    history.push(`/recipes/${id}`);
  }

  return (
    <div onClick={goToDetails} className="RecipeCard card" style="width: 18rem;">
      <img src={image ? image : defaultImage} className="card-img-top" alt="Recipe image"/>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
      </div>
    </div>
  );
}

export default RecipeCard;