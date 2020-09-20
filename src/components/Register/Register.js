import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";

const Register = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { email, password } = input;
    dispatch(registerUser(email, password));
    setInput({
      email: "",
      password: "",
    });
  };
  return (
    <div className="container register">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={input.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={input.password}
        onChange={handleInputChange}
      />
      <button type="submit" onClick={handleRegisterSubmit}>
        Register
      </button>
    </div>
  );
};

export default Register;
