class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    
    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
    }

    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }).then((res) => this._checkResponse(res));
    }

    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }).then((res) => {
        return this._checkResponse(res);
      });
    }

    addNewCard(data) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(data),
      }).then((res) => 
        this._checkResponse(res)
      );
    }

    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }).then((res) => {
        return this._checkResponse(res);
      });
    }

    getCardLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }).then((res) => {
        return this._checkResponse(res);
      });
    }

    deleteCardLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }).then((res) => {
        return this._checkResponse(res);
      });
    }

    changeAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(data),
      }).then((res) => {
        return this._checkResponse(res);
      });
    }

    changeUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(data),
      }).then((res) => this._checkResponse(res)
      );
    }
}

const apiData = new Api ({
 // url: 'http://localhost:3000',
  url: 'http://api.valts.mesto.nomoreparties.co',
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
});

export default apiData;
