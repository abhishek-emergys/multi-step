import { createContext, useState, useEffect } from "react";
import "./App.css";
import Home from "./Components/Home";

export const UserInfo = createContext();

function App() {
  const storedData = JSON.parse(localStorage.getItem("formData")) || {
    isChecked: false,
    currentTab: 1,
    userInfo: {
      name: "",
      email: "",
      phone: "",
    },
    planInfo: {
      selectedPlan: null,
      selectedPrice: "",
    },
    addons: [],
  };

  const [formData, setFormData] = useState(storedData);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <>
      <UserInfo.Provider value={{ formData, setFormData }}>
        <Home />
      </UserInfo.Provider>
    </>
  );
}

export default App;
