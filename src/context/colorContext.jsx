// src/context/colorContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useFetchSetting } from "../features/setting/hook/useFetchSetting";

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const { data: colorData, loading } = useFetchSetting("settings");

  // Initialize with undefined/empty values
  const [primaryColor, setPrimaryColor] = useState(undefined);
  const [secondaryColor, setSecondaryColor] = useState(undefined);
  const [negativeColor, setNegativeColor] = useState(undefined);

  // Debug - log what's coming from the API

  useEffect(() => {
    // Try to get stored colors from localStorage
    const storedPrimary = localStorage.getItem("primaryColor");
    const storedSecondary = localStorage.getItem("secondaryColor");
    const storedNegative = localStorage.getItem("negativeColor");

    // If not loading and we have data
    if (!loading && colorData) {
      // Extract the actual data - handle both {data: {...}} and {...} structures
      const settingsData = colorData?.data || colorData;

      // Get colors from API or fallback to localStorage
      const newPrimary = settingsData?.primary_color || storedPrimary;
      const newSecondary = settingsData?.secondary_color || storedSecondary;
      const newNegative = settingsData?.negative_color || storedNegative;

      // Set primary color if available
      if (newPrimary) {
        localStorage.setItem("primaryColor", newPrimary);
        document.documentElement.style.setProperty(
          "--color-primary",
          newPrimary,
        );
        setPrimaryColor(newPrimary);
      }

      // Set secondary color if available
      if (newSecondary) {
        localStorage.setItem("secondaryColor", newSecondary);
        document.documentElement.style.setProperty(
          "--color-secondary",
          newSecondary,
        );
        setSecondaryColor(newSecondary);
      }

      // Set negative color if available
      if (newNegative) {
        localStorage.setItem("negativeColor", newNegative);
        document.documentElement.style.setProperty(
          "--color-negative",
          newNegative,
        );
        setNegativeColor(newNegative);
      }
    }
    // If not loading but no API data, use localStorage
    else if (!loading) {
      if (storedPrimary) {
        document.documentElement.style.setProperty(
          "--color-primary",
          storedPrimary,
        );
        setPrimaryColor(storedPrimary);
      }

      if (storedSecondary) {
        document.documentElement.style.setProperty(
          "--color-secondary",
          storedSecondary,
        );
        setSecondaryColor(storedSecondary);
      }

      if (storedNegative) {
        document.documentElement.style.setProperty(
          "--color-negative",
          storedNegative,
        );
        setNegativeColor(storedNegative);
      }
    }
  }, [colorData, loading]);

  return (
    <ColorContext.Provider
      value={{
        primaryColor,
        secondaryColor,
        negativeColor,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export const useColors = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColors must be used within a ColorProvider");
  }
  // Return the colors as they are without fallbacks
  return {
    primaryColor: context.primaryColor,
    secondaryColor: context.secondaryColor,
    negativeColor: context.negativeColor,
  };
};
