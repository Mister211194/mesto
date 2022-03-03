export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._title = data.name;
        this._link = data.link;
        this._template = document.querySelector(templateSelector);
        this._handleCardClick = handleCardClick;
    }

    _getNewCardElement() {
        return this._template.content.querySelector('.elements__card').cloneNode(true);
    }

    _createNewCard() {
        this._newCard = this._getNewCardElement();
        this._cardImage = this._newCard.querySelector('.elements__card-image');
        this._cardTitle = this._newCard.querySelector('.elements__card-title');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._title;
        this._cardTitle.textContent = this._title;
        this._card = this._newCard;
    }

    _likeElementActive(event) {
        event.target.classList.toggle('elements__like-button_active');
    }

    _deleteCard(event) {
        event.target.closest('.elements__card').remove();
    }

    _addListeners() {
        this._card.querySelector('.elements__like-button').addEventListener('click', (event) => this._likeElementActive(event));
        this._card.querySelector('.elements__delete-card').addEventListener('click', (event) => this._deleteCard(event));
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._title, this._link)
        });

    }

    returnCard() {
        this._createNewCard();
        this._addListeners();
        return this._card;
    }
}