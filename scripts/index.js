import initialCards from './initalCard.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {
    popups, popupOpenButtonProfileElement, popupProfileElement, formProfileElement,
    nameInput, jobInput, nameUser, jobUser, popupAddCards, buttonAddCards,
    formElementAdd, formInputTitleElement, formInputLinkElement, cardsSection, popupPreview,
    imagePreview, titlePreview, formValidators, dataForm
} from '../utils/constants.js';
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

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_open')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__closed')) {
            closePopup(popup)
        }
    })
})


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

// Функция открытия popup Профиля
function openProfilePopup() {
    nameInput.value = nameUser.textContent;
    jobInput.value = jobUser.textContent;
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
    formElementAdd.reset();
}

function createCard(cardData) {
    return new Card(cardData, '.template', handleCardClick).returnCard();
}

function renderCard(cardData) {
    cardsSection.prepend(createCard(cardData));
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
    renderCard(newObjectCard);
    closePopup(popupAddCards);
}

function handleCardClick(name, link) {
    imagePreview.src = link;
    imagePreview.alt = name;
    titlePreview.textContent = name;
    openPopup(popupPreview);
}

// Валидация форм
function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(formElement => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
        console.log(formName)
        validator.enableValidation()
    })
}
enableValidation(dataForm);

// Добавление слушателя на клик Попап Профиля
popupOpenButtonProfileElement.addEventListener('click', () => {
    formValidators['profile_form'].resetValidation();
    openProfilePopup();
});
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfileElement.addEventListener('submit', handleProfileFormSubmit);
// Слушатели на попап добавления карточек
buttonAddCards.addEventListener('click', () => {
    formValidators['add_cards'].resetValidation();
    openAddCardPopup();
});
// Слушатель на кнопку добавления карточки
formElementAdd.addEventListener('submit', handleCardFormSubmit);