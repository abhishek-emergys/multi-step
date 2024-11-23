import { useContext, useEffect, useState } from "react";
import { UserInfo } from "../App";

const Info = ({ nameError, emailError, phoneError }) => {
  const { formData, setFormData } = useContext(UserInfo);
  const [name, setName] = useState(formData.userInfo.name);
  const [email, setEmail] = useState(formData.userInfo.email);
  const [phone, setPhone] = useState(formData.userInfo.phone);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "username") setName(value);
    if (id === "email") setEmail(value);
    if (id === "phone") setPhone(value);
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
        <h1>Personal Info</h1>
        <p>Please provide your name, email address, and phone number.</p>
      </div>
      <div className="personal-info-form">
        <div className="flex">
          <label className="input-label">Name</label>
          <label className="input-error">{nameError}</label>
        </div>
        <input
          className="input"
          type="text"
          value={name}
          onChange={handleChange}
          id="username"
          placeholder="e.g. Stephen King"
          autoComplete="off"
        />
        <div className="flex">
          <label className="input-label">Email Address</label>
          <label className="input-error">{emailError}</label>
        </div>
        <input
          className="input"
          type="email"
          id="email"
          value={email}
          onChange={handleChange}
          placeholder="e.g. stephenking@lorem.com"
          autoComplete="off"
        />
        <div className="flex">
          <label className="input-label">Phone Number</label>
          <label className="input-error">{phoneError}</label>
        </div>
        <input
          className="input"
          type="number"
          id="phone"
          value={phone}
          onChange={handleChange}
          placeholder="e.g. +1 234 567 890"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default Info;
