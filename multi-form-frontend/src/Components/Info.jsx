import { useContext, useEffect, useState } from "react";
import { UserInfo } from "../App";

const Info = ({ nameError, emailError, phoneError, validateInputs }) => {
  const { formData, setFormData } = useContext(UserInfo);

  const [name, setName] = useState(formData.userInfo.name);
  const [email, setEmail] = useState(formData.userInfo.email);
  const [phone, setPhone] = useState(formData.userInfo.phone);

  // const handleChange = (e) => {
  //   console.log("e ", e.target);

  //   const { id, value } = e.target;
  //   const checkData = setTimeout(() => {
  //     validateInputs(id);
  //   }, 100);

  //   if (id === "username") setName(value);
  //   if (id === "email") setEmail(value);
  //   if (id === "phone") setPhone(value);

  //   return () => clearTimeout(checkData);
  // };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleOnBlur = (e) => {
    const { id } = e.target;
    const checkData = setTimeout(() => {
      validateInputs(id);
    }, 100);

    return () => clearTimeout(checkData);
  };

  useEffect(() => {
    setFormData({
      ...formData,
      userInfo: { ...formData.userInfo, name, email, phone },
    });
  }, [name, email, phone]);

  return (
    <div className="personal-info">
      <div className="personal-info-main">
        <h2>Personal info</h2>
        <p>Please provide your name, email address, and phone number.</p>
      </div>
      <div className="personal-info-form">
        <div className="flex">
          <label className="input-label">Name</label>
          <label className="input-error">{nameError}</label>
        </div>
        <input
          className={nameError ? "input invalid" : "input"}
          type="text"
          value={name}
          onChange={handleName}
          onBlur={handleOnBlur}
          id="username"
          placeholder="e.g. Stephen King"
          autoComplete="off"
        />
        <div className="flex">
          <label className="input-label">Email Address</label>
          <label className="input-error">{emailError}</label>
        </div>
        <input
          className={emailError ? "input invalid" : "input"}
          type="email"
          id="email"
          value={email}
          onChange={handleEmail}
          onBlur={handleOnBlur}
          placeholder="e.g. stephenking@lorem.com"
          autoComplete="off"
        />
        <div className="flex">
          <label className="input-label">Phone Number</label>
          <label className="input-error">{phoneError}</label>
        </div>
        <input
          className={phoneError ? "input invalid" : "input"}
          type="number"
          id="phone"
          value={phone}
          onChange={handlePhone}
          onBlur={handleOnBlur}
          placeholder="e.g. +1 234 567 890"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default Info;
