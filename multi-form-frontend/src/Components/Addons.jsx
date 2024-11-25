import { useContext, useEffect, useState } from "react";
import { UserInfo } from "../App";

const Addons = () => {
  const { formData, setFormData } = useContext(UserInfo);
  const isChecked = formData.isChecked;

  const [addonsDetails, setAddonsDetails] = useState({
    online: {
      plan: "Online service",
      price: "1/mo",
      yearlyPrice: "10/yr",
    },
    large: {
      plan: "Large storage",
      price: "2/mo",
      yearlyPrice: "20/yr",
    },
    custom: {
      plan: "Customizable profile",
      price: "2/mo",
      yearlyPrice: "20/yr",
    },
  });

  useEffect(() => {
    const updatedAddons = formData.addons.map((addon) => {
      const addonPrice = isChecked
        ? addonsDetails[addon.plan].yearlyPrice
        : addonsDetails[addon.plan].price;
      return { ...addon, price: addonPrice };
    });

    setFormData((prevData) => ({
      ...prevData,
      addons: updatedAddons,
    }));
  }, [isChecked, addonsDetails]);

  const updateAddons = (addonPlan, checked) => {
    const addonPrice = isChecked
      ? addonsDetails[addonPlan].yearlyPrice
      : addonsDetails[addonPlan].price;

    setFormData((prevData) => {
      const newAddons = checked
        ? [...prevData.addons, { plan: addonPlan, price: addonPrice }]
        : prevData.addons.filter((addon) => addon.plan !== addonPlan);

      return {
        ...prevData,
        addons: newAddons,
      };
    });
  };

  const selectCard = (addonPlan) => {
    const isAddonSelected = formData.addons.some(
      (addon) => addon.plan === addonPlan
    );

    updateAddons(addonPlan, !isAddonSelected);
  };

  return (
    <div className="personal-info">
      <div className="personal-info-main">
        <h2 className="personal-info-h1">Pick add-ons</h2>
        <p className="personal-info-p">
          Add-ons help enhance your gaming experience.
        </p>
      </div>
      <div className="personal-info-form">
        <div className="add-ons">
          <div
            className={`online-services ${
              formData.addons.some((addon) => addon.plan === "online")
                ? "selected"
                : ""
            }`}
            onClick={() => selectCard("online")}
          >
            <div className="addons-checkbox">
              <input
                type="checkbox"
                id="addon-online-service"
                value="online-service"
                onChange={() => {}}
                checked={formData.addons.some(
                  (addon) => addon.plan === "online"
                )}
              />
            </div>
            <div className="addons-info">
              <span className="addons-info-title">Online service</span>
              <br />
              <span className="addons-info-dec">
                Access to multiplayer games
              </span>
            </div>
            <div className="addons-amount">
              <p id="addons-price-1">
                +$
                {isChecked
                  ? addonsDetails.online.yearlyPrice
                  : addonsDetails.online.price}
              </p>
            </div>
          </div>

          <div
            className={`online-services ${
              formData.addons.some((addon) => addon.plan === "large")
                ? "selected"
                : ""
            }`}
            onClick={() => selectCard("large")}
          >
            <div className="addons-checkbox">
              <input
                type="checkbox"
                id="addon-large-profile"
                value="large-storage"
                onChange={() => {}}
                checked={formData.addons.some(
                  (addon) => addon.plan === "large"
                )}
              />
            </div>
            <div className="addons-info">
              <span className="addons-info-title">Large Storage</span>
              <br />
              <span className="addons-info-dec">Extra 1TB of cloud save</span>
            </div>
            <div className="addons-amount">
              <p id="addons-price-2">
                +$
                {isChecked
                  ? addonsDetails.large.yearlyPrice
                  : addonsDetails.large.price}
              </p>
            </div>
          </div>

          <div
            className={`online-services ${
              formData.addons.some((addon) => addon.plan === "custom")
                ? "selected"
                : ""
            }`}
            onClick={() => selectCard("custom")}
          >
            <div className="addons-checkbox">
              <input
                type="checkbox"
                id="addon-custom-profile"
                value="custom-storage"
                onChange={() => {}}
                checked={formData.addons.some(
                  (addon) => addon.plan === "custom"
                )}
              />
            </div>
            <div className="addons-info">
              <span className="addons-info-title">Customizable Profile</span>
              <br />
              <span className="addons-info-dec">
                Custom theme on your profile
              </span>
            </div>
            <div className="addons-amount">
              <p id="addons-price-3">
                +$
                {isChecked
                  ? addonsDetails.custom.yearlyPrice
                  : addonsDetails.custom.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addons;
