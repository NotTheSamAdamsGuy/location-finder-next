import { RefObject, useEffect, useState } from "react";

/**
 * Determine if the targeted element is visible on the screen. 
 * @param {RefObject<null | HTMLElement>} targetRef the target element
 * @param {number} threshold the amount of the element that must be on or off the screen to trigger a change. Must be between 0 and 1, inclusive.
 * @param {boolean} initialValue set to true if the element is visible on page load, otherwise set to false
 * @returns {boolean}
 */
export function useIntersection(
  targetRef: RefObject<null | HTMLElement>,
  threshold: number = 1,
  initialValue: boolean = true
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(initialValue);

  useEffect(() => {
    const currentRef = targetRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: threshold } // Adjust threshold as needed
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup function to unobserve the element when the component unmounts
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect(); // Disconnect the observer entirely
    };
  }, [targetRef, threshold]); // Empty dependency array ensures observer is created and cleaned up once

  return isIntersecting;
}
