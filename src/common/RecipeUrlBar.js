/**
 * Recipe url bar
 */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RecipeUrlBar = () => {
  const [url, setUrl] = useState('');
  const history = useHistory();

  const handleChange = evt => {
    setUrl(evt.target.value);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    
    history.push({
      pathname: '/',
      search: `?url=${url}`,
    });
  }

  return (
    <div className="RecipeUrlBar">
      <form onSubmit={handleSubmit} className="form-inline d-flex">
          <input className="form-control form-control-lg flex-grow-1"
                 placeholder="Paste a recipe url"
                 type="url"
                 name="url"
                 id="url"
                 value={url}
                 onChange={handleChange}/>
       
        <button className="btn btn-lg btn-primary">Get Recipe</button>
      </form>
    </div>
    
  );
}

export default RecipeUrlBar;