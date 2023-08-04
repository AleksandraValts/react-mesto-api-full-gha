import headerLogo from '../images/Logo.svg';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Место" />  
      <Routes>
        <Route path="/sign-up" element={<Link to="/sign-in" className="header__login">Войти</Link> } />
        <Route path="/sign-in" element={<Link to="/sign-up" className="header__login">Регистрация</Link>} />
        <Route path="/" element={<ul className="header__login-page">
          <li className="header___list">
            <p className="header__text">{props.headerEmail}</p>
          </li>
          <li className="header___list">
            <Link to="/sign-in" className="header__login header__exit" onClick={props.onExit}>Выйти</Link>
          </li>
        </ul>} />
      </Routes>
    </header>
  );
}

export default Header;