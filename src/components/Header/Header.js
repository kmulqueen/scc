import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/actions/authActions";

import { ReactComponent as Logo } from "../../SVGs/logo/Kyle-logo-drumonly-01.svg";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header className="header">
      <div className="container header__items">
        <Logo className="logo" />
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__list-item">
              <a href="#" className="nav__link">
                Home
              </a>
            </li>
            <li className="nav__list-item">
              <a href="#" className="nav__link">
                Favorites
              </a>
            </li>
            <li className="nav__list-item">
              <a href="#" className="nav__link">
                Community
              </a>
            </li>
            <li className="nav__list-item">
              <a
                href="#"
                className="nav__link"
                onClick={useCallback(() => dispatch(signOut()), [dispatch])}
              >
                Sign Out
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
