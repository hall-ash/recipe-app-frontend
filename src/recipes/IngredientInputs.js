import React, { useState } from 'react';

const IngredientInputs = ({ ingredients, setIngredients, isMetric, metricUnits, usUnits }) => {

  const handleIngredientLabelChange = (idx) => (evt) => {
    const newIngredients = ingredients.map((ingredient, iIdx) => {
      if(idx !== iIdx) return ingredient;
      return { ...ingredient, label: evt.target.value };
    });
   setIngredients(newIngredients);
  };

  const handleIngredientAmountChange = (idx) => (evt) => {
    const newIngredients = ingredients.map((ingredient, iIdx) => {
      if(idx !== iIdx) return ingredient;
      const { usAmount, metricAmount } = ingredient;

      let newMetricAmount, fraction, newUsAmount;
      if (isMetric) {
        newMetricAmount = evt.target.value;
        fraction = newMetricAmount / metricAmount;
        newUsAmount = fraction * usAmount;
      } else {
        newUsAmount = evt.target.value;
        fraction = newUsAmount / usAmount;
        newUsAmount = fraction * metricAmount;
      }
     
      return { 
        ...ingredient, 
        usAmount: newUsAmount,
        metricAmount: newMetricAmount,
      };
    });
    setIngredients(newIngredients);
  };

  const handleIngredientUnitChange = (idx) => (evt) => {
    isMetric ? ingredients[idx].metricUnit = evt.target.value :
               ingredients[idx].usUnit = evt.target.value;
    setIngredients(ingredients);
  };

  const handleAddIngredient = () => {
    const newIngredients = ingredients.concat([{ label: "" }]);
    setIngredients(newIngredients);
  };

  const handleRemoveIngredient = (idx) => () => {
    const newIngredients = ingredients.filter((i, iIdx) => idx !== iIdx);
    setIngredients(newIngredients);
  }

  const amountInput = (ing, idx) => {
    <input className="form-control"
           value={isMetric ? ing.metricAmount : ing.usAmount}
           onChange={handleIngredientAmountChange(idx)}
           type="number"
           min="0"
           step=".001"
    />
  };

  const unitSelect = (ing, idx) => {
    const units = isMetric ? metricUnits : usUnits;
    const currentUnit = isMetric ? ing.metricUnit : ing.usUnit;
    return <select class="form-select" aria-label={`Select ${isMetric ? 'metric' : 'us'} unit`}>
      <option selected value={currentUnit}>{currentUnit}</option>
      {units.map(unit => {
        return <option key={unit.id}
                       value={unit.label}
                       onChange={handleIngredientUnitChange(idx)}>
                {unit.label}
              </option>;
      })}
    </select>;
  } 

  // returns us amounts as default
  const ingredientLis = ingredients.map((ing, idx) => {
    return <li key={ing.id} >
            {amountInput}
            {unitSelect}
            <input 
                   className="form-control"
                   value={ing.label}
                   onChange={handleIngredientLabelChange(idx)}
                   type="text"
                     />
            <button type="button" onClick={handleRemoveIngredient(idx)}>-</button>
          </li>

  });

  return (
    <div className="IngredientInputs">
      <ul>{ingredientLis}</ul>
      <button type="button" onClick={handleAddIngredient}>Add ingredient</button>
    </div>
  )
}

export default IngredientInputs;