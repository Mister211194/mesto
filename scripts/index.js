// Добавление выборки DOM элементов
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.profile-popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__closed');
const formElement = document.querySelector('.popup__form');
const nameInput = document.getElementById('input-popup-name');
const jobInput = document.getElementById('input-popup-description');
const nameUser = document.querySelector('.profile__info-title');
const jobUser = document.querySelector('.profile__info-description');

// Функции переключения всплывающего окна
function openPopup() {
    // Заносим данные в форму при открытии popup
    nameInput.value = nameUser.textContent;
    jobInput.value = jobUser.textContent;
    // Добавление класса для открытия popup
    popupElement.classList.add('popup_open');
}

function closePopup() {
    popupElement.classList.remove('popup_open');
}

// Функция закрытия попапа при клике на затемненную область
// function closePopupByClickOverlay(event) {
//     if (event.target !== event.currentTarget) {
//         return;
//     }
//     closePopup()
// }
// popupElement.addEventListener('click', closePopupByClickOverlay);

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameUser.textContent = nameInput.value;
    jobUser.textContent = jobInput.value;
    closePopup()
}

// Добавление слушателя на клик
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


const popupAddCards = document.querySelector('.add-cards-popup');
const buttonAddCards = document.querySelector('.profile__add-button');
const closeButtonAddCardsPopup = popupAddCards.querySelector('.popup__closed');
const inputAddCardTitile = popupAddCards.querySelector('#input-popup-title');
const inputAddCardUrl = popupAddCards.querySelector('#input-popup-url');
const formElementAdd = popupAddCards.querySelector('.popup__form');

// Открытие попап добавления карточек с фото
function openAddCardsPopup() {
    inputAddCardTitile.value = '';
    inputAddCardUrl.value = '';
    popupAddCards.classList.add('popup_open');
}
// Закрытие попап добавления карточек с фото
function closeAddCardsPopup() {
    popupAddCards.classList.remove('popup_open');

}

// Слушатели на попап добавления карточек
buttonAddCards.addEventListener('click', openAddCardsPopup);
closeButtonAddCardsPopup.addEventListener('click', closeAddCardsPopup);

import initialCards from './inital_card.js';

const template = document.querySelector('.template').content;
const cardsSection = document.querySelector('.elements__grid-cards');

function addAllCards() {
    initialCards.forEach(addCards);
}

// функция загрузки карточек
function addCards(value) {
    const newCard = template.cloneNode(true); // Клонируем содержимое тимплейта
    const cardImage = newCard.querySelector('.elements__card-image');
    const cardTitle = newCard.querySelector('.elements__card-title');
    cardImage.src = value.link;
    cardTitle.textContent = value.name;
    cardImage.setAttribute("alt", value.name);

    addListeners(newCard)
    cardsSection.appendChild(newCard);
}

function addListeners(el) {
    el.querySelector('.elements__like-button').addEventListener('click', likeElementActive);
    el.querySelector('.elements__delete-card').addEventListener('click', cardDelete);
}



// Лайк
function likeElementActive(event) {
    event.target.classList.toggle('elements__like-button_active')
}

function cardDelete(event) {
    event.target.closest('.elements__card').remove();
}

addAllCards()


// Функция добавления карточки
function formSubmitAddCard(event) {
    event.preventDefault();

    const newItem = template.cloneNode(true);
    newItem.querySelector('.elements__card-title').textContent = inputAddCardTitile.value;
    newItem.querySelector('.elements__card-image').src = inputAddCardUrl.value;
    newItem.querySelector('.elements__card-image').setAttribute("alt", inputAddCardTitile.value);

    addEvList(newItem);
    cardsSection.prepend(newItem);

    closeAddCardsPopup()
}

formElementAdd.addEventListener('submit', formSubmitAddCard);

function addEvList(item) {
    item.querySelector('.elements__delete-card').addEventListener('click', deleteItem);
    item.querySelector('.elements__like-button').addEventListener('click', likeItem);
}

function deleteItem(event) {
    event.target.closest('.elements__card').remove();
}

function likeItem(event) {
    event.target.classList.toggle('elements__like-button_active')
}