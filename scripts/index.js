import initialCards from './initalCard.js';
<<<<<<< HEAD
=======
import FormValidator from './FormValidator.js';
import Card from './Card.js';
>>>>>>> develop
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
const buttonCreateCard = formElementAdd.elements.create;
<<<<<<< HEAD
const template = document.querySelector('.template').content;
=======
>>>>>>> develop
const cardsSection = document.querySelector('.elements__grid-cards');
// Переменные Preview popup
const popupPreview = document.querySelector('.popup_view-foto');
const buttonClosePreviewPopup = popupPreview.querySelector('.popup__closed');
const imagePreview = popupPreview.querySelector('.popup__image')
const titlePreview = popupPreview.querySelector('.popup__figcaption')
//
const dataForm = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type-error',
    errorClass: 'popup__input-error_active'
}


// Функци открытия popup
function openPopup(namePopup) {
    namePopup.classList.add('popup_open');
    namePopup.addEventListener('click', closePopupByClickOverlay);
    document.addEventListener('keydown', closeByEscape);
}

// функция закрытия popup
function closePopup(namePopup) {
    namePopup.classList.remove('popup_open');
    namePopup.removeEventListener('click', closePopupByClickOverlay);
    document.removeEventListener('keydown', closeByEscape);
}

// Функция закрытия попапа при клике на затемненную область
function closePopupByClickOverlay(event) {
    if (event.target === event.currentTarget) {
        closePopup(event.target);
    }
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_open')
        closePopup(openedPopup);
    }
}

function clearErrorProfilePopup() {
    const errorElements = [...formProfileElement.querySelectorAll('.popup__input-error')];
    const inputElements = [...formProfileElement.querySelectorAll('.popup__input')];
    errorElements.forEach((errorElement) => errorElement.classList.remove('popup__input-error_active'));
    inputElements.forEach((errorElement) => errorElement.classList.remove('popup__input_type-error'));
}

// Функция открытия popup Профиля
function openProfilePopup() {
    clearErrorProfilePopup();
    saveButtonProfile.classList.remove('popup__button_disabled');
    saveButtonProfile.removeAttribute("disabled", "disabled");
    nameInput.value = nameUser.textContent;
    jobInput.value = jobUser.textContent;
<<<<<<< HEAD
    saveButtonProfile.classList.remove('popup__button_disabled');
    saveButtonProfile.removeAttribute("disabled", "disabled");
=======
>>>>>>> develop
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

function renderCard(cardData) {
    const newCard = new Card(cardData, '.template').returnCard();
    cardsSection.prepend(newCard);
}

function addAllCards() {
    initialCards.forEach(renderCard);
}
addAllCards()

// Функция добавления карточки
function handleCardFormSubmit(event) {
    event.preventDefault();
    const newObjectCard = {
        name: formInputTitleElement.value,
        link: formInputLinkElement.value
    };
    buttonCreateCard.setAttribute("disabled", "disabled");
    renderCard(newObjectCard);
    closePopup(popupAddCards);
}

// Функция открытия Previev Popup
function openPreviewPopup(evt) {
    if (evt.target.classList.contains('elements__card-image')) {
        openPopup(popupPreview)
        imagePreview.src = evt.target.src;
        imagePreview.alt = evt.target.alt;
        titlePreview.textContent = evt.target.alt;
    }
}

// Валидация форм
new FormValidator(dataForm, formProfileElement).enableValidation();
new FormValidator(dataForm, formElementAdd).enableValidation();

cardsSection.addEventListener('click', openPreviewPopup);

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