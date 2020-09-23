import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/actions/authActions";
import { appAuth } from "../../firebase";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../SVGs/logo/Kyle-logo-drumonly-01.svg";
import "./Header.scss";

const SignedOutNav = () => {
  {
    /* Signed Out Nav */
  }
  return (
    <ul className="nav__list">
      <li className="nav__list-item">
        <Link to="/register" className="nav__link">
          Register
        </Link>
      </li>
      <li className="nav__list-item">
        <Link to="/login" className="nav__link">
          Login
        </Link>
      </li>
    </ul>
  );
};

const SignedInNav = ({ handleClick }) => {
  {
    /* Signed In Nav */
  }
  return (
    <ul className="nav__list">
      <li className="nav__list-item">
        <Link to="/exercises" className="nav__link">
          Stick Control
        </Link>
      </li>
      <li className="nav__list-item">
        <Link to="/favorites" className="nav__link">
          Favorites
        </Link>
      </li>
      <li className="nav__list-item">
        <Link to="/community" className="nav__link">
          Community
        </Link>
      </li>
      <li className="nav__list-item">
        <Link to="/login" className="nav__link" onClick={handleClick}>
          Sign Out
        </Link>
      </li>
    </ul>
  );
};

const Header = () => {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    appAuth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setLoading(false);
      } else {
        setLoggedIn(false);
        setLoading(false);
      }
    });
  }, [loggedIn]);
  const handleSignOut = () => {
    dispatch(signOut());
  };
  return (
    <header className="header">
      <div className="container header__items">
        <Logo className="logo" />
        {loading ? null : (
          <nav className="nav">
            {!loggedIn ? (
              <SignedOutNav />
            ) : (
              <SignedInNav handleClick={handleSignOut} />
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
