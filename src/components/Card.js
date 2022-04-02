export default class Card {
    constructor(data, templateSelector, userInfo, handleCardClick, handleDeleteClick) {
        this._title = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._myId = data.myId;
        this._cardId = data.id;
        this._ownerId = data.owner._id;
        this._template = document.querySelector(templateSelector);
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._userInfo = userInfo;
    }

    _getNewCardElement() {
        return this._template.content.querySelector('.elements__card').cloneNode(true);
    }

    _createNewCard() {
        this._newCard = this._getNewCardElement();
        this._cardImage = this._newCard.querySelector('.elements__card-image');
        this._cardTitle = this._newCard.querySelector('.elements__card-title');
        this._buttonDelete = this._newCard.querySelector('.elements__delete-card');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._title;
        this._cardTitle.textContent = this._title;
        this._card = this._newCard;
    }

    _likeElementActive(event) {
        event.target.classList.toggle('elements__like-button_active');
    }

    _setLikes() {
        const likeCountElement = this._card.querySelector('.elements__like-number');
        likeCountElement.textContent = this._likes.length;
    }


    _deleteCard() {
        this._handleDeleteClick(this._cardId);
    }

    deleteCardFromDom() {
        this._card.remove();
        this._card = null;
    }

    _hideButtonDelete() {
        this._userInfo.then(res => {
            if (this._ownerId !== res._id) {
                this._buttonDelete.remove();
            }
        })

    }

    _addListeners() {
        this._card.querySelector('.elements__like-button').addEventListener('click', (event) => this._likeElementActive(event));
        this._buttonDelete.addEventListener('click', () => this._deleteCard());
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick({ name: this._title, link: this._link })
        });

    }

    returnCard() {
        this._createNewCard();
        this._setLikes();
        this._hideButtonDelete()
        this._addListeners();
        return this._card;
    }
}