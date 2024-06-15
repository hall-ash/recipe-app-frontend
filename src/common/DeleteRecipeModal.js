import React from 'react';

const DeleteRecipeModal = ({ deleteRecipe }) => {

  return (
    <div class="modal fade" id="deleteRecipeModal" tabindex="-1" aria-labelledby="deleteRecipeModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteRecipeModal">Delete recipe</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
           Are you sure you want to delete this recipe?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" onClick={deleteRecipe}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteRecipeModal;