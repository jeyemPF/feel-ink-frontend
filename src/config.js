// src/config.js
export const config = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
  
    return {
      apiUrl,
    };
  };
  