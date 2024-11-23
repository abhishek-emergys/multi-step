const Sidebar = ({ currentTab, setCurrentTab }) => {
  const getNumClass = (step) => {
    return currentTab === step ? "num-1" : "num-2";
  };

  return (
    <div>
      <div className="image">
        <div className="main-sidebar">
          <div className="sidebar-1">
            <div
              className={getNumClass(1)}
              onClick={() => {
                setCurrentTab(1);
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
                setCurrentTab(2);
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
                setCurrentTab(3);
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
                setCurrentTab(4);
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
