export default class Card {
    constructor(data, templateSelector, userId, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._title = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._myId = data.myId;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._template = document.querySelector(templateSelector);
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    _getNewCardElement() {
        return this._template.content.querySelector('.elements__card').cloneNode(true);
    }

    _createNewCard() {
        this._newCard = this._getNewCardElement();
        this._cardImage = this._newCard.querySelector('.elements__card-image');
        this._cardTitle = this._newCard.querySelector('.elements__card-title');
        this._buttonDelete = this._newCard.querySelector('.elements__delete-card');
        this._buttonLike = this._newCard.querySelector('.elements__like-button');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._title;
        this._cardTitle.textContent = this._title;
        this._card = this._newCard;
    }

    isLiked() {
        const UserHasLikeCard = this._likes.find(user => user._id === this._userId);
        return UserHasLikeCard;
    }

    _checkLikes() {
        if (this.isLiked()) {
            this._buttonLike.classList.add('elements__like-button_active');
        } else {
            this._buttonLike.classList.remove('elements__like-button_active');
        }
    }

    setLikes(NewLikes) {
        this._likes = NewLikes;
        const likeCountElement = this._card.querySelector('.elements__like-number');
        likeCountElement.textContent = this._likes.length;
        this._checkLikes();
    }


    // _deleteCard() {
    //     this._handleDeleteClick(this._cardId);
    // }

    deleteCardFromDom() {
        this._card.remove();
        this._card = null;
    }

    _hideButtonDelete() {
        if (this._ownerId !== this._userId) {
            this._buttonDelete.remove();
        }
    }

    _addListeners() {
        this._buttonLike.addEventListener('click', () => this._handleLikeClick(this._cardId));
        this._buttonDelete.addEventListener('click', () => this._handleDeleteClick(this._cardId));
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick({ name: this._title, link: this._link })
        });
    }

    returnCard() {
        this._createNewCard();
        this.setLikes(this._likes);
        this._hideButtonDelete()
        this._addListeners();
        return this._card;
    }
}