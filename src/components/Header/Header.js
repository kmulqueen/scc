import React from "react";
import { ReactComponent as Logo } from "../../SVGs/logo/Kyle-logo-plain.svg";
import "./Header.scss";

const Header = () => {
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
