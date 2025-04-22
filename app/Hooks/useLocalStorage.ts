import { useState, useEffect } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Use state to store the value from localStorage or the initial value
  const [value, setValue] = useState<T>(initialValue);

  // Only access localStorage on the client-side (browser)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        setValue(JSON.parse(storedValue));
      } else {
        setValue(initialValue); // Use the initial value if localStorage is empty
      }
    }
  }, [key, initialValue]);

  // Function to update localStorage and state
  const setStoredValue = (newValue: T | ((val: T) => T)): void => {
    const valueToStore =
      newValue instanceof Function ? newValue(value) : newValue;

    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(valueToStore));
    }
    setValue(valueToStore);
  };

  return [value, setStoredValue];
}

export default useLocalStorage;
