import Info from "./Info";
import Plan from "./Plan";
import Addons from "./Addons";
import FinishUp from "./FinishUp";
import Sidebar from "./Sidebar";
import ThankYou from "./ThankYou";
import { useContext, useState } from "react";
import { UserInfo } from "../App";

const Home = () => {
  const { formData, setFormData } = useContext(UserInfo);
  const [currentTab, setCurrentTab] = useState(formData.currentTab);
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

  const validateInputs = () => {
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
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    if (currentTab === 2 && !formData.planInfo.selectedPlan) {
      setPlanError("Please select your plan");
      return;
    }
    setPlanError("");

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

    if (currentTab < 5) {
      setCurrentTab(currentTab + 1);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (currentTab > 1) {
      setCurrentTab(currentTab - 1);
    }
  };

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
            {
              {
                1: (
                  <Info
                    nameError={nameError}
                    handleNext={handleNext}
                    validateInputs={validateInputs}
                    emailError={emailError}
                    phoneError={phoneError}
                  />
                ),
                2: <Plan planError={planError} />,
                3: <Addons />,
                4: (
                  <FinishUp
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                  />
                ),
                5: <ThankYou />,
              }[currentTab]
            }
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
