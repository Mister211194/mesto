// Добавление выборки DOM элементов
export const popups = document.querySelectorAll('.popup')
// Переменные popup Профиля
export const popupOpenButtonProfileElement = document.querySelector('.profile__edit-button');
export const popupProfileElement = document.querySelector('.profile-popup');
export const formProfileElement = document.forms.profile_form;
export const nameInput = formProfileElement.elements.name;
export const jobInput = formProfileElement.elements.job;
export const nameUser = document.querySelector('.profile__info-title');
export const jobUser = document.querySelector('.profile__info-description');
// Переменные popup Добавления карточек
export const popupAddCards = document.querySelector('.add-cards-popup');
export const buttonAddCards = document.querySelector('.profile__add-button');
export const formElementAdd = document.forms.add_cards;
export const formInputTitleElement = formElementAdd.elements.title;
export const formInputLinkElement = formElementAdd.elements.link;
export const cardsSection = document.querySelector('.elements__grid-cards');
// Переменные Preview popup
export const popupPreview = document.querySelector('.popup_view-foto');
export const imagePreview = popupPreview.querySelector('.popup__image')
export const titlePreview = popupPreview.querySelector('.popup__figcaption')
//
export const formValidators = {}
export const dataForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type-error',
    errorClass: 'popup__input-error_active'
}
