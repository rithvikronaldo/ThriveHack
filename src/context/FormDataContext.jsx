import React, { createContext, useContext, useState } from 'react';

const FormDataContext = createContext();

export const useFormData = () => useContext(FormDataContext);

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  const updateFormData = (newFormData) => {
    setFormData({ ...formData, ...newFormData });
    console.log("Updated form data:", { ...formData, ...newFormData });
  };

  return (
    <FormDataContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

