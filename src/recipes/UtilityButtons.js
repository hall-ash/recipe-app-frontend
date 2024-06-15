import React from 'react';
import { useHistory } from 'react-router-dom';

const UtilityButtons = ({edit, share, print, remove}) => {

  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginOrSignUpModal">
    Save
  </button>

  return (
    <div className="utilites">
      <ul>
        <li><button class="btn btn-primary" onClick={edit} type="button">Edit</button></li>
        <li><button class="btn btn-primary" onClick={share} type="button">Share</button></li>
        <li><button class="btn btn-primary" onClick={print} type="button">Print</button></li>
        <li><button class="btn btn-primary" onClick={remove} type="button">Delete</button></li>
      </ul>
   </div>
  );
}