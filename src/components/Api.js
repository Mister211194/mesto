class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _fetch(url, config) {
        return fetch(`${this._baseUrl}${url}`, {
            headers: this._headers,
            ...config
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Произошла ошибка: ${res.status}`))
    }

    getUserInfo() {
        return this._fetch('/users/me', {
            method: 'GET'
        })
    }

    getInitalCards() {
        return this._fetch('/cards', {
            method: 'GET'
        })
    }

    editUserInfo({ name, about }) {
        return this._fetch('/users/me', {
            method: 'PATCH',
            body: JSON.stringify({
                name,
                about
            })
        })
    }

    addNewCard({ name, link }) {
        return this._fetch('/cards', {
            method: 'POST',
            body: JSON.stringify({
                name,
                link
            })
        })
    }

    deleteCard(cardId) {
        return this._fetch(`/cards/${cardId}`, {
            method: 'DELETE',
        })
    }

    addLike(cardId) {
        return this._fetch(`/cards/${cardId}/likes`, {
            method: 'PUT',
        })
    }

    deleteLike(cardId) {
        return this._fetch(`/cards/${cardId}/likes`, {
            method: 'DELETE',
        })
    }

    editAvatar({ avatar }) {
        return this._fetch("/users/me/avatar", {
            method: 'PATCH',
            body: JSON.stringify({ avatar }),
        })
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
        authorization: '2dfb6a8d-e075-4710-ac22-01d3245971a1',
        'Content-Type': 'application/json'
    }
})