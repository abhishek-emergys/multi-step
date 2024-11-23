import { useContext, useEffect, useState } from "react";
import { UserInfo } from "../App";

const Plan = ({ planError }) => {
  const { formData, setFormData } = useContext(UserInfo);
  const isChecked = formData.isChecked;
  const selectedPlan = formData.planInfo.selectedPlan;

  console.log(formData);

  const [priceDetails, setPriceDetails] = useState({
    arcade: {
      plan: "Arcade",
      price: "9/mo",
      yearlyPrice: "90/yr",
    },
    advance: {
      plan: "Advanced",
      price: "12/mo",
      yearlyPrice: "120/yr",
    },
    pro: {
      plan: "Pro",
      price: "15/mo",
      yearlyPrice: "150/yr",
    },
  });

  const toggleBilling = (e) => {
    const newIsChecked = e.target.checked;

    setFormData((prevData) => ({ ...prevData, isChecked: newIsChecked }));

    if (selectedPlan) {
      const currentPrice = priceDetails[selectedPlan];
      console.log("currentPrice  ", currentPrice);

      const updatedPrice = newIsChecked
        ? currentPrice.yearlyPrice
        : currentPrice.price;

      console.log("updatedPrice ", updatedPrice);

      setFormData((prevData) => ({
        ...prevData,
        planInfo: {
          ...prevData.planInfo,
          selectedPrice: updatedPrice,
        },
      }));
    }
  };

  const handleCardClick = (plan) => {
    const selectedPrice = isChecked
      ? priceDetails[plan].yearlyPrice
      : priceDetails[plan].price;
    setFormData((prevData) => ({
      ...prevData,
      planInfo: {
        selectedPlan: plan,
        selectedPrice: selectedPrice,
      },
    }));
  };

  return (
    <div className="personal-info" id="main-plan">
      <div className="personal-info-main">
        <h1 className="personal-info-h1">Select your plan</h1>
        <p className="personal-info-p">
          You have the option of monthly or yearly billing.
        </p>
      </div>
      <div className="personal-info-form">
        <div className="cards">
          <div
            className={`card-1 ${
              selectedPlan === "arcade" ? "card-clicked" : ""
            }`}
            id="card-1"
            onClick={() => handleCardClick("arcade")}
          >
            <div className="logo">
              <img src="src/assets/icon-arcade.svg" alt="" />
            </div>
            <div className="card-info">
              <span className="card-info-title">Arcade</span>
              <br />
              <span className="card-info-m" id="card-info-m-1">
                {isChecked
                  ? priceDetails.arcade.yearlyPrice
                  : priceDetails.arcade.price}
              </span>
              <br />
              <span
                className="card-info-y"
                style={{ display: isChecked ? "flex" : "none" }}
                id="card-info-y"
              >
                2 months free
              </span>
            </div>
          </div>
          <div
            className={`card-1 ${
              selectedPlan === "advance" ? "card-clicked" : ""
            }`}
            id="card-2"
            onClick={() => handleCardClick("advance")}
          >
            <div className="logo">
              <img src="src/assets/icon-advance.svg" alt="" />
            </div>
            <div className="card-info">
              <span className="card-info-title">Advanced</span>
              <br />
              <span className="card-info-m" id="card-info-m-2">
                {isChecked
                  ? priceDetails.advance.yearlyPrice
                  : priceDetails.advance.price}
              </span>
              <br />
              <span
                className="card-info-y"
                style={{ display: isChecked ? "flex" : "none" }}
                id="card-info-y"
              >
                2 months free
              </span>
            </div>
          </div>

          <div
            className={`card-1 ${selectedPlan === "pro" ? "card-clicked" : ""}`}
            id="card-3"
            onClick={() => handleCardClick("pro")}
          >
            <div className="logo">
              <img src="src/assets/icon-pro.svg" alt="" />
            </div>
            <div className="card-info">
              <span className="card-info-title">Pro</span>
              <br />
              <span className="card-info-m" id="card-info-m-3">
                {isChecked
                  ? priceDetails.pro.yearlyPrice
                  : priceDetails.pro.price}
              </span>
              <br />
              <span
                className="card-info-y"
                style={{ display: isChecked ? "flex" : "none" }}
                id="card-info-y"
              >
                2 months free
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="month-year-btn">
        <div>
          <span>Monthly</span>
        </div>
        <div>
          <label className="switch">
            <input
              type="checkbox"
              id="checkbox"
              checked={isChecked}
              onChange={toggleBilling}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div>
          <span>Yearly</span>
        </div>
      </div>
      <label className="plan-error">{planError}</label>
    </div>
  );
};

export default Plan;
