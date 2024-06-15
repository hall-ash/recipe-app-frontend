import React, { useState, useContext } from 'react';
import Alert from '../common/Alert';
import RecipeApi from '../api/api';
import UserContext from '../auth/UserContext';
import defaultImage from './default-recipe-img.png';
import ToggleButton from '../common/ToggleButton';
import IngredientInputs from './IngredientInputs';

const RecipeEdit = ({ recipe }) => {
 
  const { currentUser } = useContext(UserContext);
  const isMetric = false;

  const [formData, setFormData] = useState({
    title: recipe.title,
    url: recipe.url,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    notes: recipe.notes,
  });

  const setIngredients = (newIngredients) => {
    setFormData(f => ({
      ...f,
      ingredients: newIngredients,
    }));
  }

  const [formErrors, setFormErrors] = useState([]);

  const [saveConfirmed, setSaveConfirmed] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let recipeData = {
      title: formData.title,
      url: formData.url,
      servings: formData.servings,
      ingredients: formData.ingredients,
      instructions: formData.instructions,
      notes: formData.notes,
    }

    try {
      await RecipeApi.updateRecipe(currentUser.username, recipe.id, recipeData);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);
    setSaveConfirmed(true);
  }

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  

  const changeImg = evt => {
    alert('edited image');
  }

 

  const instructionLis = formData.instructions.map((ins, i) => {
    return <li key={ins.id}>
            <input name="formData.instructions"
                  className="form-control"
                  value={ins.step}
                  onChange={handleChange} />
          </li>
  });


  return (
    <form>
    <div className="container">
      <div className="info">
        <input name="title"
               className="form-control"
               value={formData.title}
               onChange={handleChange} />
        <ul>
          <li><span>Servings</span>
            <input name="servings"
                   className="form-control"
                   value={formData.servings}
                   onChange={handleChange}
                   type="number"
                   min="1" />
          </li>
          <li><span>Prep Time</span>5 min</li>
          <li><span>Cook Time</span>25 min</li>
          <li><span>Total Time</span>30 min</li>
        </ul>
        <div className="container">
          <img src={recipe.image ? recipe.image : defaultImage} 
             alt="Recipe image" 
             className="float-right"/>
          <button class="btn btn-primary" onClick={changeImg} type="button">Edit</button>
        </div>
        
      </div>
     <div class="row justify-content-around">
      <div class="col-4">
        <h2>Ingredients</h2>
        <ToggleButton labelL="us" labelR="metric" isChecked={isMetric}/>
        <IngredientInputs ingredients={formData.ingredients} 
                          setIngredients={setIngredients} 
                          isMetric={isMetric} />
      </div>
      <div class="col-4">
      <h2>Instructions</h2>
        <ol>{instructionLis}</ol>
      </div>
     </div>
     <div class="row">
       <div class="col">
         <input name="notes"
                className="form-control"
                value={formData.notes}
                onChange={handleChange}
                type="text" />
       </div>
     </div>
    </div>
    </form>
);
  
}

export default RecipeEdit;