// Переменные popup Профиля
export const popupOpenButtonProfileElement = document.querySelector('.profile__edit-button');
export const formProfileElement = document.forms.profile_form;
export const nameInput = formProfileElement.elements.name;
export const infoInput = formProfileElement.elements.about;
export const profileInfo = {
    nameProfileSelector: '.profile__info-title',
    infoProfileSelector: '.profile__info-description',
    AvatarEditSelector: '.profile__avatar'
}
export const popupProfile = '.profile-popup';
export const popupAvatar = '.popup_edit-avatar';
export const popupAvatarOpenBtn = document.querySelector('.profile__avatar-container');
export const formPopupAvatar = document.forms.edit_avatar_form;


// Переменные popup Добавления карточек

export const popupAddCards = '.add-cards-popup';
export const buttonAddCards = document.querySelector('.profile__add-button');
export const formElementAdd = document.forms.add_cards;
export const cardsSection = document.querySelector('.elements__grid-cards');


// Переменные Preview popup
export const popupPreview = '.popup_view-foto';

//
export const dataForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type-error',
    errorClass: 'popup__input-error_active'
}
