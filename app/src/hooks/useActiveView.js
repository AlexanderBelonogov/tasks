import { useState } from 'react'

export const useHorizontalMode = () => {
  const [isHorizontal, setIsHorizontal] = useState((window.localStorage.getItem('HorizontalView') || 'false') === 'true');

  const handleToggleView = () => {
    setIsHorizontal(prevState => !prevState);
    window.localStorage.setItem('HorizontalView', !isHorizontal)
  };

  return [isHorizontal, handleToggleView];
}
