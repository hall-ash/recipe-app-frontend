import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../auth/UserContext';

const SaveRecipeModal = ({ saveRecipe }) => {

  const { currentUser } = useContext(UserContext);
  const { history } = useHistory();

  const goToLoginForm = evt => {
    history.push('/login');
  }

  const goToSignUpForm = evt => {
    history.push('/signup');
  }

  return (
    <div className="modal fade" id="saveRecipeModal" tabIndex="-1" aria-labelledby="saveRecipeModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="saveRecipeModal">{currentUser ? 'Login or Sign up for free' : 'Save recipe'}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {currentUser ? 'Do you want to save this recipe?' : 
            <React.Fragment>
              <button type="button" className="btn btn-primary" onClick={goToLoginForm}>Log in</button>
              <button type="button" className="btn btn-primary" onClick={goToSignUpForm}>Sign up</button>
            </React.Fragment>
             }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            {currentUser && <button type="button" className="btn btn-primary" onClick={saveRecipe}>Save</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SaveRecipeModal;