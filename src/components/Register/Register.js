import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";

const Register = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: "",
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
    const { username, email, password } = input;
    dispatch(registerUser(username, email, password));
    setInput({
      username: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="container register">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={input.username}
        onChange={handleInputChange}
      />
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
