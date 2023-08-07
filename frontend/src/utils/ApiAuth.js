export const BASE_URL = 'http://api.valts.mesto.nomoreparties.co';
// export const BASE_URL = 'http://localhost:3000';

const checkRes = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Статус ошибки: ${res.status}`)
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  })
  .then(checkRes)
}

export const authorise = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  })
  .then(checkRes)
  
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    }
  })
  .then(checkRes)
}
