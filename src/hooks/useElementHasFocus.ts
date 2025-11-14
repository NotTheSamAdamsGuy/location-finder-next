import { useEffect, useState } from "react";

/**
 * Check if an element has the focus.
 * @param {HTMLElement | null} element the element to check
 * @returns {boolean} true if the element has focus, otherwise false
 */
export function useElementHasFocus(element: HTMLElement | null) {
  const [elementHasFocus, setElementHasFocus] = useState(false);

  useEffect(() => {
      if (!element) return;
  
      const checkFocus = () => {
        setElementHasFocus(document.activeElement === element);
      };
  
      document.addEventListener("focusin", checkFocus);
      document.addEventListener("focusout", checkFocus);
  
      checkFocus();
  
      return () => {
        document.removeEventListener("focusin", checkFocus);
        document.removeEventListener("focusout", checkFocus);
      };
    }, [element]);

  return elementHasFocus;
}