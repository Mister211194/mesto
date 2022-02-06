import initialCards from './inital_card.js';
// Добавление выборки DOM элементов
// Переменные popup Профиля
const popupOpenButtonProfileElement = document.querySelector('.profile__edit-button');
const popupProfileElement = document.querySelector('.profile-popup');
const popupCloseButtonProfileElement = popupProfileElement.querySelector('.popup__closed');
const formProfileElement = document.forms.profile_form;
const nameInput = formProfileElement.elements.name;
const jobInput = formProfileElement.elements.job;
const saveButtonProfile = formProfileElement.elements.save;
const nameUser = document.querySelector('.profile__info-title');
const jobUser = document.querySelector('.profile__info-description');
// Переменные popup Добавления карточек
const popupAddCards = document.querySelector('.add-cards-popup');
const buttonAddCards = document.querySelector('.profile__add-button');
const closeButtonAddCardsPopup = popupAddCards.querySelector('.popup__closed');
const formElementAdd = document.forms.add_cards;
const formInputTitleElement = formElementAdd.elements.title;
const formInputLinkElement = formElementAdd.elements.link;
const template = document.querySelector('.template').content;
const cardsSection = document.querySelector('.elements__grid-cards');
// Переменные Preview popup
const popupPreview = document.querySelector('.popup_view-foto');
const buttonClosePreviewPopup = popupPreview.querySelector('.popup__closed');
const imagePreview = popupPreview.querySelector('.popup__image')
const titlePreview = popupPreview.querySelector('.popup__figcaption')
//Переменная всех Popup
const popupList = document.querySelectorAll('.popup');

// Функци открытия popup
function openPopup(namePopup) {
    namePopup.classList.add('popup_open');
    namePopup.addEventListener('click', closePopupByClickOverlay);
    document.addEventListener('keydown', closePopupDownEsc);
}

// функция закрытия popup
function closePopup(namePopup) {
    namePopup.classList.remove('popup_open');
}

// Функция закрытия попапа при клике на затемненную область
function closePopupByClickOverlay(event) {
    if (event.target === event.currentTarget) {
        closePopup(event.target);
    }
}

const closePopupDownEsc = (event) => {
    if (event.key === 'Escape') {
        popupList.forEach((popup) => {
            closePopup(popup);
        })
    }
}

// Функция открытия popup Профиля
function openProfilePopup() {
    nameInput.value = nameUser.textContent;
    jobInput.value = jobUser.textContent;
    saveButtonProfile.classList.remove('popup__button_disabled');
    openPopup(popupProfileElement)
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
    formInputTitleElement.value = '';
    formInputLinkElement.value = '';
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
        name: formInputTitleElement.value,
        link: formInputLinkElement.value
    };
    renderCard(newObjectCard);
    closePopup(popupAddCards);
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