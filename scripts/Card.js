export default class Card {
    constructor(data, templateSelector) {
        this.title = data.name;
        this.link = data.link;
        this.template = document.querySelector(templateSelector);
    }

    _getNewCardElement() {
        return this.template.content.querySelector('.elements__card').cloneNode(true);
    }

    _createNewCard() {
        const newCard = this._getNewCardElement();
        const cardImage = newCard.querySelector('.elements__card-image');
        const cardTitle = newCard.querySelector('.elements__card-title');
        cardImage.src = this.link;
        cardTitle.textContent = this.title;
        cardImage.setAttribute("alt", this.title);
        this._card = newCard;
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
    }

    returnCard() {
        this._createNewCard();
        this._addListeners();
        return this._card;
    }
}