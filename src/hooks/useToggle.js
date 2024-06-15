import React, { useState } from 'react';

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = React.useCallback(() => {
    setValue(v => !v);
  }, []);
  console.log('value', value);
  return [value, toggle];
}

export default useToggle;