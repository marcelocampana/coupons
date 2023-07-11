import { createContext, useState } from "react";

const BARContext = createContext();

const BARProvider = ({ children }) => {
  const [step1Value, setStep1Value] = useState({});
  const [step2Value, setStep2Value] = useState({});
  const [step3Value, setStep3Value] = useState({});

  const updateStep1Value = (value) => {
    setStep1Value(value);
  };
  const updateStep2Value = (value) => {
    setStep2Value(value);
  };
  const updateStep3Value = (value) => {
    setStep3Value(value);
  };

  const contextValue = {
    step1Value,
    updateStep1Value,
    step2Value,
    updateStep2Value,
    step3Value,
    updateStep3Value,
  };

  return (
    <BARContext.Provider value={contextValue}>{children}</BARContext.Provider>
  );
};

export { BARContext, BARProvider };
