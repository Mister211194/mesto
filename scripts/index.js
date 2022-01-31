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

// Добавление слушателя на клик
popupOpenButtonProfileElement.addEventListener('click', openProfilePopup);
popupCloseButtonProfileElement.addEventListener('click', () => closePopup(popupProfileElement));
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfileElement.addEventListener('submit', handleProfileFormSubmit);

// Открытие попап добавления карточек с фото
function openAddCardPopup() {
    openPopup(popupAddCards)
    inputAddCardTitile.value = '';
    inputAddCardUrl.value = '';
}

// Слушатели на попап добавления карточек
buttonAddCards.addEventListener('click', openAddCardPopup);
closeButtonAddCardsPopup.addEventListener('click', () => closePopup(popupAddCards));

function addAllCards() {
    initialCards.forEach(addCard);
}

// функция загрузки карточек
function addCard(value) {
    const newCard = template.cloneNode(true); // Клонируем содержимое тимплейта
    const cardImage = newCard.querySelector('.elements__card-image');
    const cardTitle = newCard.querySelector('.elements__card-title');
    cardImage.src = value.link;
    cardTitle.textContent = value.name;
    cardImage.setAttribute("alt", value.name);
    addListeners(newCard)
    cardsSection.appendChild(newCard);
    // Ваш предыдущий комментарий ниже мне совершенно не понятен!(функция добавления карточки в контейнер уже есть: handleCardFormSubmit)
    // Вставка карточек в контейнер должна происходить в другой функции, так как согласно чек-листу:
    // Функция выполняет одно действие, например, возвращает готовую карточку
    // Создайте функцию, которая будет вставлять карточку в контейнер. Вызывать ее будете в функции-сабмите формы добавления карточки и при рендере базовых 6 карточек
}

function addListeners(card) {
    card.querySelector('.elements__like-button').addEventListener('click', likeElementActive);
    card.querySelector('.elements__delete-card').addEventListener('click', deleteCard);
}
// Лайк
function likeElementActive(event) {
    event.target.classList.toggle('elements__like-button_active')
}
// Удаление карточки
function deleteCard(event) {
    event.target.closest('.elements__card').remove();
}

addAllCards()

// Функция добавления карточки
function handleCardFormSubmit(event) {
    event.preventDefault();
    const newItem = template.cloneNode(true);
    newItem.querySelector('.elements__card-title').textContent = inputAddCardTitile.value;
    newItem.querySelector('.elements__card-image').src = inputAddCardUrl.value;
    newItem.querySelector('.elements__card-image').setAttribute("alt", inputAddCardTitile.value);
    addEvList(newItem);
    cardsSection.prepend(newItem);
    closePopup(popupAddCards)
}

formElementAdd.addEventListener('submit', handleCardFormSubmit);

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

// Открытие PreviewPopup фотки
function openPreviewPopup(event) {
    if (event.target.classList.contains('elements__card-image')) {
        openPopup(popupPreview)
        popupPreview.querySelector('.popup__image').src = event.target.src;
        popupPreview.querySelector('.popup__image').alt = event.target.alt;
        popupPreview.querySelector('.popup__figcaption').textContent = event.target.alt;
    }
}

// Слушатели открытия и закрытия PreviewPopup
cardsSection.addEventListener('click', openPreviewPopup);
popupPreview.querySelector('.popup__closed').addEventListener('click', () => closePopup(popupPreview));


// Функция закрытия попапа при клике на затемненную область
// function closePopupByClickOverlay(event) {
//     if (event.target !== event.currentTarget) {
//         return;
//     }
//     closePopup()
// }
// popupProfileElement.addEventListener('click', closePopupByClickOverlay);