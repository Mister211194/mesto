import initialCards from './inital_card.js';
// Добавление выборки DOM элементов
// Переменные popup Профиля
const popupOpenButtonProfileElement = document.querySelector('.profile__edit-button');
const popupProfileElement = document.querySelector('.profile-popup');
const popupCloseButtonProfileElement = popupProfileElement.querySelector('.popup__closed');
const formProfileElement = document.querySelector('.popup__form');
const nameInput = document.getElementById('input-popup-name');
const jobInput = document.getElementById('input-popup-description');
const nameUser = document.querySelector('.profile__info-title');
const jobUser = document.querySelector('.profile__info-description');
// Переменные popup Добавления карточек
const popupAddCards = document.querySelector('.add-cards-popup');
const buttonAddCards = document.querySelector('.profile__add-button');
const closeButtonAddCardsPopup = popupAddCards.querySelector('.popup__closed');
const inputAddCardTitile = popupAddCards.querySelector('#input-popup-title');
const inputAddCardUrl = popupAddCards.querySelector('#input-popup-url');
const formElementAdd = popupAddCards.querySelector('.popup__form');
const template = document.querySelector('.template').content;
const cardsSection = document.querySelector('.elements__grid-cards');
// Переменные Preview popup
const popupPreview = document.querySelector('.popup_view-foto');
const buttonClosePreviewPopup = popupPreview.querySelector('.popup__closed');
const imagePreview = popupPreview.querySelector('.popup__image')
const titlePreview = popupPreview.querySelector('.popup__figcaption')

// Функци открытия popup
function openPopup(namePopup) {
    namePopup.classList.add('popup_open');
}
// функция закрытия popup
function closePopup(namePopup) {
    namePopup.classList.remove('popup_open');
}

// Функция открытия popup Профиля
function openProfilePopup() {
    openPopup(popupProfileElement)
    // Заносим данные в форму при открытии popup
    nameInput.value = nameUser.textContent;
    jobInput.value = jobUser.textContent;
}
// Функция изменения значиний в профиле
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameUser.textContent = nameInput.value;
    jobUser.textContent = jobInput.value;
    closePopup(popupProfileElement)
}

// Открытие попап добавления карточек с фото
function openAddCardPopup() {
    openPopup(popupAddCards)
    inputAddCardTitile.value = '';
    inputAddCardUrl.value = '';
}

function addAllCards() {
    initialCards.forEach(renderCard);
}

// функция создания карточки
function createCard(name, link) {
    const newCard = template.cloneNode(true); // Клонируем содержимое тимплейта
    const cardImage = newCard.querySelector('.elements__card-image');
    const cardTitle = newCard.querySelector('.elements__card-title');
    cardImage.src = link;
    cardTitle.textContent = name;
    cardImage.setAttribute("alt", name);
    addListeners(newCard, name, link,)
    return newCard
}

function renderCard(cardData) {
    const newCard = createCard(cardData.name, cardData.link);
    cardsSection.prepend(newCard);
}

function addListeners(card, name, link) {
    card.querySelector('.elements__like-button').addEventListener('click', likeElementActive);
    card.querySelector('.elements__delete-card').addEventListener('click', deleteCard);
    card.querySelector('.elements__card-image').addEventListener('click', () => openPreviewPopup(name, link));
}
// Лайк
function likeElementActive(event) {
    event.target.classList.toggle('elements__like-button_active')
}
// Удаление карточки
function deleteCard(event) {
    event.target.closest('.elements__card').remove();
}

// Функция добавления карточки
function handleCardFormSubmit(event) {
    event.preventDefault();
    const newObjectCard = {
        name: inputAddCardTitile.value,  //Арина Огромное вам спасибо за развернутые комментарии!
        link: inputAddCardUrl.value       // Я просто был в ступоре как передать с этих значений объект на вход функции renderCard
    };                                  // Просто ступор в голове был и все))
    renderCard(newObjectCard);             // P.S. Наставник так и не ответил:)
    closePopup(popupAddCards);          // Вы супер! Спасибо еще раз!
}

// Функция открытия Previev Popup
function openPreviewPopup(name, link) {
    openPopup(popupPreview)
    imagePreview.src = link;
    imagePreview.alt = name;
    titlePreview.textContent = name;
}

addAllCards()

buttonClosePreviewPopup.addEventListener('click', () => closePopup(popupPreview));
// Добавление слушателя на клик Попап Профиля
popupOpenButtonProfileElement.addEventListener('click', openProfilePopup);
popupCloseButtonProfileElement.addEventListener('click', () => closePopup(popupProfileElement));
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfileElement.addEventListener('submit', handleProfileFormSubmit);
// Слушатели на попап добавления карточек
buttonAddCards.addEventListener('click', openAddCardPopup);
closeButtonAddCardsPopup.addEventListener('click', () => closePopup(popupAddCards));
// Слушатель на кнопку добавления карточки
formElementAdd.addEventListener('submit', handleCardFormSubmit);


// Функция закрытия попапа при клике на затемненную область
// function closePopupByClickOverlay(event) {
//     if (event.target !== event.currentTarget) {
//         return;
//     }
//     closePopup()
// }
// popupProfileElement.addEventListener('click', closePopupByClickOverlay);