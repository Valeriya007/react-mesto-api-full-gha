class Api {
  constructor(config) {
    this._url = config.baseUrl;
  }

  /*проверка на ошибки*/
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  };

  /*запрос данных о пользователе с сервера*/
  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }


  /*передача данных о пользователе с сервера*/
  setUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.username,
        about: data.info,
      })
    })
      .then(this._checkResponse)
  }


  /*запрос данных с сервера*/
  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }


  /*добавление новой карточки на сервер*/
  addNewCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
      .then(this._checkResponse)
  }


  /*передача на сервер данных нового аватара*/
  setNewAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then(this._checkResponse)
  }


  /*удаление карточки с сервера*/
  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }


  /*отправление лайка на сервер*/
  putLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }

  /*удаление лайка с сервера*/
  deleteLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }
}

/*Api*/
const api = new Api({
  baseUrl: 'https://api.mesto.valeriya.nomoredomainsrocks.ru'
});


export default api;