import React, { useState } from 'react';

function Login(props) {
  const [userData, setUserData] = React.useState({email: '', password: ''})
  
  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value})
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(userData)
      .catch(err => {console.error(err)})
  }

  return (
    <section className="login">
      <form className="login__form" name="login" onSubmit={handleSubmit}>
        <h2 className="login__title">Вход</h2>
        <input className="login__input" type="email" name="email" value={userData.email}
        id="login-email" placeholder="Email" onChange={handleChange} required />
        <input className="login__input" type="password" name="password" value={userData.password}
        id="login-password" placeholder="Пароль" onChange={handleChange} required />
        <button className="login__button" type="submit">Войти</button>
      </form>
    </section>
  );
}

export default Login;