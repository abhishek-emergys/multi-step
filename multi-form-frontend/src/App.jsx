import { createContext, useState } from "react";
import "./App.css";
import Home from "./Components/Home";

export const UserInfo = createContext();

function App() {
  const [formData, setFormData] = useState({
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
  });

  return (
    <>
      <UserInfo.Provider value={{ formData, setFormData }}>
        <Home />
      </UserInfo.Provider>
    </>
  );
}

export default App;
