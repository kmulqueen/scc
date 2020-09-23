import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/actions/authActions";

const Login = ({ history }) => {
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
    // history.push("/exercises");
  };
  return (
    <div className="container login">
      <form onSubmit={handleLoginSubmit} className="login__form">
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
      </form>
    </div>
  );
};

export default Login;
