import {
  LOCAL_STORAGE_KEY,
  USD_TO_INR_RATE,
} from "../Constants/ConstantVariables/constantsVariables";
import type { useLocalStoragetypes } from "./utilityFunction.types";

// Convert ONLY for UI
export const CurrencyConverter = (price: number): number => {
  return Math.floor(price * USD_TO_INR_RATE);
};

// Cget original price from discounted price
export const getOriginalPrice = (
  price: number,
  discountPercentage: number,
): number => {
  return Math.floor(price / (1 - discountPercentage / 100));
};

export const Capitalize = (value: string) => {
  return `${value.trim().charAt(0).toUpperCase() + value.slice(1)}`;
};

export const UpperCase = (value: string) => {
  return value.trim().toUpperCase();
};

//Related to LocalStorage
const handleLocalStorage = ({ value, method }: useLocalStoragetypes) => {
  if (method === "GET") {
    return localStorage.getItem(LOCAL_STORAGE_KEY);
  } else if (method === "SET") {
    return localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
  } else {
    return localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
};

export default handleLocalStorage;
