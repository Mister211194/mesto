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


const userInfo = new UserInfo(profileInfo);
const popupEditProfile = new PopupWithForm(popupProfile, handleProfileSubmit);

function handleProfileSubmit(userData) {
    userInfo.setUserInfo(userData);
    popupEditProfile.close();
}

const cardsList = new Section({ items: initialCards, renderer: createCard }, cardsSection);

function createCard(cardData) {
    return new Card(cardData, '.template', handleCardClick).returnCard();
}

const popupAdd = new PopupWithForm(popupAddCards, handleAddSubmit);

function handleAddSubmit(cardData) {
    cardsList.addItem(createCard(cardData));
    popupAdd.close();
}

const popupImage = new PopupWithImage(popupPreview);
const EditProfileValidator = new FormValidator(dataForm, formProfileElement)
const AddCardValidator = new FormValidator(dataForm, formElementAdd);

function handleCardClick(data) {
    popupImage.open(data);
}

function openProfilePopup() {
    EditProfileValidator.resetValidation();
    nameInput.value = userInfo.getUserInfo().name;
    infoInput.value = userInfo.getUserInfo().info;
    popupEditProfile.open();
}


function openAddPopup() {
    AddCardValidator.resetValidation();
    popupAdd.open();
}

EditProfileValidator.enableValidation();
AddCardValidator.enableValidation();

cardsList.renderItems();

popupOpenButtonProfileElement.addEventListener('click', openProfilePopup);
buttonAddCards.addEventListener('click', openAddPopup);
