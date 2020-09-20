import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/actions/authActions";

const Login = () => {
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = input;
    dispatch(signIn(email, password));
    setInput({
      email: "",
      password: "",
    });
  };
  return (
    <div className="container login">
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
      <button type="submit" onClick={handleLoginSubmit}>
        Login
      </button>
    </div>
  );
};

export default Login;
