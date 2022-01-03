import { useState, useEffect } from 'react';

const getDocumentHiddenProp = _ => {
  if (typeof document.hidden !== 'undefined') return 'hidden';
  if (typeof document.msHidden !== 'undefined') return 'msHidden';
  if (typeof document.webkitHidden !== 'undefined') return 'webkitHidden';
};

const getIsDocumentHidden = _ => {
  if( typeof document !== 'undefined' ) return !document[getDocumentHiddenProp()];
  return false;
};

const useVisibility = _ => {
  const [isVisible, setIsVisible] = useState(getIsDocumentHidden());

  const toggleVisibility = _ => {
    setIsVisible(getIsDocumentHidden());
  };

  useEffect( _ => {
    if( typeof document !== 'undefined' ) document.addEventListener('visibilitychange', toggleVisibility);
    return () => {
      if( typeof document !== 'undefined' ) document.removeEventListener('visibilitychange', toggleVisibility);
    };
  }, []);

  return isVisible;
};

export default useVisibility;
