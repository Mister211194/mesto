import {
    popupOpenButtonProfileElement, formProfileElement,
    nameInput, infoInput, profileInfo, popupProfile, popupAddCards, buttonAddCards,
    formElementAdd, cardsSection, popupPreview, dataForm
} from '../utils/constants.js';
import initialCards from '../components/initalCard.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js'
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import './index.css';

const userInfo = new UserInfo(profileInfo);
const popupEditProfile = new PopupWithForm(popupProfile, handleProfileSubmit);
popupEditProfile.setEventListeners();

function handleProfileSubmit(userData) {
    userInfo.setUserInfo(userData);
    popupEditProfile.close();
}

const cardsList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const card = createCard(item);
            cardsList.addItem(card);
        }
    },
    cardsSection);

function createCard(cardData) {
    return new Card(cardData, '.template', handleCardClick).returnCard();
}

const popupAdd = new PopupWithForm(popupAddCards, handleAddSubmit);
popupAdd.setEventListeners();

function handleAddSubmit(cardData) {
    cardsList.addItem(createCard(cardData));
    popupAdd.close();
}

const popupImage = new PopupWithImage(popupPreview);
popupImage.setEventListeners();

const profileEditFormValidator = new FormValidator(dataForm, formProfileElement)
const cardAddFormValidator = new FormValidator(dataForm, formElementAdd);

function handleCardClick(data) {
    popupImage.open(data);
}

function openProfilePopup() {
    profileEditFormValidator.resetValidation();
    nameInput.value = userInfo.getUserInfo().name;
    infoInput.value = userInfo.getUserInfo().info;
    popupEditProfile.open();
}


function openAddPopup() {
    cardAddFormValidator.resetValidation();
    popupAdd.open();
}

profileEditFormValidator.enableValidation();
cardAddFormValidator.enableValidation();

cardsList.renderItems();

popupOpenButtonProfileElement.addEventListener('click', openProfilePopup);
buttonAddCards.addEventListener('click', openAddPopup);
