import React from 'react';
import './ToggleButton.css';

const ToggleButton = ({ toggleState }) => {

  const onChange = evt => {
    console.log(evt.target.value);
    toggleState();
  }

  return (
    <div className="ToggleButton mb-3">
      <div className="toggle-label">us</div>
      <div>
      <input
        onChange={onChange}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        
        <span className={`react-switch-button`}></span> 
        
      </label>
      </div>
      
      <div className="toggle-label">metric</div>
    </div>
  );

 
};

export default ToggleButton;