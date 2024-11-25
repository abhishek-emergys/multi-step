import { useContext } from "react";
import { UserInfo } from "../App";

const Sidebar = ({
  currentTab,
  setCurrentTab,
  validateInputs,
  setPlanError,
}) => {
  const { formData, setFormData } = useContext(UserInfo);

  const getNumClass = (step) => {
    return currentTab === step ? "num-1" : "num-2";
  };

  const checkNextStep = (tab) => {
    switch (tab) {
      case 1:
        setCurrentTab(1);
        break;
      case 2:
        if (!validateInputs()) {
          return;
        } else {
          setCurrentTab(tab);
        }
        break;
      case 3:
        if (!formData.planInfo.selectedPlan) {
          setPlanError("Please select your plan");
          return;
        } else {
          setCurrentTab(tab);
          setPlanError("");
        }
        break;

      case 4:
        if (!validateInputs() || !formData.planInfo.selectedPlan) {
          return;
        } else {
          setCurrentTab(tab);
          setPlanError("");
        }
        break;

      default:
        setCurrentTab(tab);
    }
  };

  return (
    <div>
      <div className="image">
        <div className="main-sidebar">
          <div className="sidebar-1">
            <div
              className={getNumClass(1)}
              onClick={() => {
                checkNextStep(1);
              }}
              id="num-1"
            >
              <b>1</b>
            </div>
            <div className="sidebar-flex-1">
              <span className="step-num">STEP 1</span>
              <br />
              <span className="step-title">YOUR INFO</span>
            </div>
          </div>
          <div className="sidebar-2">
            <div
              className={getNumClass(2)}
              onClick={() => {
                checkNextStep(2);
              }}
              id="num-2"
            >
              <b>2</b>
            </div>
            <div className="sidebar-flex-1">
              <span className="step-num">STEP 2</span>
              <br />
              <span className="step-title">SELECT PLAN</span>
            </div>
          </div>
          <div className="sidebar-2">
            <div
              className={getNumClass(3)}
              onClick={() => {
                checkNextStep(3);
              }}
              id="num-3"
            >
              <b>3</b>
            </div>
            <div className="sidebar-flex-1">
              <span className="step-num">STEP 3</span>
              <br />
              <span className="step-title">ADD-ONS</span>
            </div>
          </div>
          <div className="sidebar-2">
            <div
              className={getNumClass(4)}
              onClick={() => {
                checkNextStep(4);
              }}
              id="num-4"
            >
              <b>4</b>
            </div>
            <div className="sidebar-flex-1">
              <span className="step-num">STEP 4</span>
              <br />
              <span className="step-title">SUMMARY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
