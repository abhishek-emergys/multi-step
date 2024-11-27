import Info from "./Info";
import Plan from "./Plan";
import Addons from "./Addons";
import FinishUp from "./FinishUp";
import Sidebar from "./Sidebar";
import ThankYou from "./ThankYou";
import { useContext, useState, useMemo, useEffect } from "react";
import { UserInfo } from "../App";

const Home = () => {
  const { formData, setFormData } = useContext(UserInfo);

  const [currentTab, setCurrentTab] = useState(
    localStorage.getItem("currentTab")
      ? Number(localStorage.getItem("currentTab"))
      : formData.currentTab
  );

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [planError, setPlanError] = useState("");
  const userInfo = formData.userInfo;

  const checkMail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const checkPhone = (num) => {
    const phonePattern = /^(?:\+?\d{1,2}[- ]?)?\d{10}$/;
    return phonePattern.test(num);
  };

  const checkName = (str) => {
    const namePattern = /^[A-Za-z]+$/;
    return namePattern.test(str);
  };

  const validateInputs = (id) => {
    if (id === undefined) {
      let hasError = false;

      if (!userInfo.name.trim()) {
        setNameError("This field is required");
        hasError = true;
      } else if (!checkName(userInfo.name.trim())) {
        setNameError("Invalid name");
        hasError = true;
      } else {
        setNameError("");
      }

      if (!userInfo.email.trim()) {
        setEmailError("This field is required");
        hasError = true;
      } else if (!checkMail(userInfo.email)) {
        setEmailError("Invalid email");
        hasError = true;
      } else {
        setEmailError("");
      }

      if (!userInfo.phone.length) {
        setPhoneError("This field is required");
        hasError = true;
      } else if (!checkPhone(userInfo.phone)) {
        setPhoneError("Invalid phone");
        hasError = true;
      } else {
        setPhoneError("");
      }
      return !hasError;
    }

    if (id === "username") {
      let hasError = false;
      if (!userInfo.name.trim()) {
        setNameError("This field is required");
        hasError = true;
      } else if (!checkName(userInfo.name.trim())) {
        setNameError("Invalid name");
        hasError = true;
      } else {
        setNameError("");
      }
      return !hasError;
    }

    if (id === "email") {
      let hasError = false;
      if (!userInfo.email.trim()) {
        setEmailError("This field is required");
        hasError = true;
      } else if (!checkMail(userInfo.email)) {
        setEmailError("Invalid email");
        hasError = true;
      } else {
        setEmailError("");
      }
      return !hasError;
    }

    if (id === "phone") {
      let hasError = false;
      if (!userInfo.phone) {
        setPhoneError("This field is required");
        hasError = true;
      } else if (!checkPhone(userInfo.phone)) {
        setPhoneError("Invalid phone");
        hasError = true;
      } else if(userInfo.phone.length >= 10 && userInfo.phone.length <= 12){
        setPhoneError("");
      }
      return !hasError;
    }
  };

  const handleNext = (e) => {
    console.log("currentTab next", currentTab);
    
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    if (currentTab === 2 && !formData.planInfo.selectedPlan) {
      setPlanError("Please select your plan");
      return;
    }
    setPlanError("");
console.log("currentTab ", currentTab);

    if (currentTab === 4) {
      setFormData({
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
    }

    if (currentTab <= 4) {
      setCurrentTab(currentTab + 1);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (currentTab > 1) {
      setCurrentTab(currentTab - 1);
    }
  };

  const renderStep = useMemo(() => {
    switch (currentTab) {
      case 1:
        return (
          <Info
            nameError={nameError}
            handleNext={handleNext}
            validateInputs={validateInputs}
            emailError={emailError}
            phoneError={phoneError}
          />
        );
      case 2:
        return <Plan planError={planError} />;
      case 3:
        return <Addons />;
      case 4:
        return (
          <FinishUp currentTab={currentTab} setCurrentTab={setCurrentTab} />
        );
      case 5:
        return <ThankYou />;
      default:
        return null;
    }
  }, [
    currentTab,
    nameError,
    emailError,
    phoneError,
    planError,
    handleNext,
    validateInputs,
  ]);

  useEffect(() => {
    localStorage.setItem("currentTab", currentTab);
  }, [currentTab]);

  return (
    <div className="main">
      <div className="container">
        <div className="step-1">
          <Sidebar
            currentTab={currentTab}
            setPlanError={setPlanError}
            setCurrentTab={setCurrentTab}
            validateInputs={validateInputs}
          />
          <div>
            {renderStep}
            <div
              className="btn"
              style={{ display: currentTab === 5 ? "none" : "flex" }}
            >
              <button
                className="back-btn"
                onClick={handlePrev}
                style={{ visibility: currentTab === 1 ? "hidden" : "visible" }}
              >
                Go Back
              </button>
              <button onClick={handleNext}>
                {currentTab !== 4 ? "Next Step" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
