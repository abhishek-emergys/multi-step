import { useContext, useEffect, useState } from "react";
import { UserInfo } from "../App";

const FinishUp = ({ currentTab, setCurrentTab }) => {
  const { formData, setFormData } = useContext(UserInfo);
  const [loading, setLoading] = useState(true);
  const addons = formData.addons || [];
  const isChecked = formData.isChecked || false;
  const title = formData.planInfo.selectedPlan || "";
  const updatedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  const preferredOrder = ["online", "large", "custom"];

  const addonNames = {
    online: "Online Service",
    large: "Large Storage",
    custom: "Customizable Profile",
  };

  const addonsDetails = {
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
  };

  useEffect(() => {
    if (addons.length > 0) {
      addons.sort((a, b) => {
        const aIndex = preferredOrder.indexOf(a.plan);
        const bIndex = preferredOrder.indexOf(b.plan);
        return aIndex - bIndex;
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

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
  }, [isChecked]);

  const validAddons = addons.filter((addon) => addon?.plan && addon?.price);

  const calculateAddonsTotal = () => {
    return validAddons.reduce((total, addon) => {
      const addonPrice = parseFloat(addon.price) || 0;
      return total + addonPrice;
    }, 0);
  };

  const basePrice = parseFloat(formData.planInfo.selectedPrice) || 0;
  const totalPrice = calculateAddonsTotal() + basePrice;

  return (
    <div>
      <div className="personal-info">
        <div className="personal-info-main">
          <h2 className="personal-info-h1">Finishing up</h2>
          <p className="personal-info-p">
            Double-check everything looks OK before confirming.
          </p>
        </div>
        <div className="personal-info-form">
          <div className="final-section">
            <div className="change-tab">
              <div className="change-tab-main">
                <span className="change-tab-title" id="change-tab-title">
                  {updatedTitle} {isChecked ? "(Yearly)" : "(Monthly)"}
                </span>
                <br />
                <a onClick={() => setCurrentTab(2)} className="change-tab-link">
                  Change
                </a>
              </div>
              <div></div>

              <div>
                <p className="change-tab-price" id="arcade-price-title">
                  ${formData.planInfo.selectedPrice || "NA"}
                </p>
              </div>
            </div>

            {validAddons.length > 0 ? (
              validAddons.map((addon, index) => (
                <div
                  className="service"
                  key={addon.plan || index}
                  id={`service-${index + 1}`}
                >
                  <span
                    className="service-title"
                    id={`service-title-${index + 1}`}
                  >
                    {addonNames[addon.plan] || "N/A"}
                  </span>
                  <span
                    className="service-price"
                    id={`service-price-${index + 1}`}
                  >
                    {addon.price || "N/A"}
                  </span>
                </div>
              ))
            ) : (
              <div className="no-data">No Addons Added</div>
            )}
          </div>

          <div className="total">
            <span className="service-title" id="service-title">
              Total (per {isChecked ? "Year" : "Month"})
            </span>
            <span className="total-price" id="total-price">
              +${totalPrice.toFixed(0) || "N/A"} {isChecked ? "/yr" : "/mo"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishUp;
