import {
    popupOpenButtonProfileElement, formProfileElement,
    nameInput, infoInput, profileInfo, popupProfile, popupAddCards, buttonAddCards,
    formElementAdd, cardsSection, popupPreview, dataForm
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js'
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupConfirm from "../components/PopupConfirm.js"

import './index.css';

import { api } from "../components/Api.js"

const userInfo = new UserInfo(profileInfo);
const userDatafromServer = api.getUserInfo();

Promise.all([userDatafromServer, api.getInitalCards()])
    .then(([userData, cardsData]) => {
        userInfo.setUserInfo(userData);
        userInfo.setUserId(userData._id);
        cardsList.setItems(cardsData);
        cardsList.renderItems();
    })
    .catch((err) => {
        console.log(`Произошла ошибка при загрузке страницы: ${err}`);
    });

const popupEditProfile = new PopupWithForm(popupProfile, handleProfileSubmit);
popupEditProfile.setEventListeners();

const popupDeleteConfirm = new PopupConfirm('.popup_delete-confirm');
popupDeleteConfirm.setEventListeners();

function handleProfileSubmit(userData) {
    api.editUserInfo(userData)
        .then(res => {
            userInfo.setUserInfo(res);
            popupEditProfile.close();
        }).catch(err => console.log(`Данные не загружены: ${err}`))
}

const cardsList = new Section(
    {
        items: [],
        renderer: (item) => {
            const card = createCard(item);
            cardsList.addItem(card);
        }
    },
    cardsSection);

function createCard(cardData) {
    const card = new Card(
        cardData,
        '.template',
        userInfo.getUserId(),
        handleCardClick,
        () => {
            handleDeleteClick(card, cardData._id)
        },
        (id) => {
            handleLikeClick(id, card)
        }
    );
    return card.returnCard();
}

const popupAdd = new PopupWithForm(popupAddCards, handleAddSubmit);
popupAdd.setEventListeners();

function handleAddSubmit(cardData) {
    api.addNewCard(cardData)
        .then(res => {
            cardsList.addItem(createCard(res))
        }).catch(err => console.log(`Произошла ошибка при добавлении карточки: ${err}`))
    popupAdd.close();
}

function handleLikeClick(id, card) {
    console.log('like')
    if (card.isLiked()) {
        api.deleteLike(id)
            .then(res => {
                console.log(res)
                card.setLikes(res.likes)
            })
    } else {
        api.AddLike(id)
            .then(res => {
                console.log(res)
                card.setLikes(res.likes)
            })
    }
}

function handleDeleteClick(card, cardId) {
    console.log(card)
    popupDeleteConfirm.open();
    console.log(cardId)
    popupDeleteConfirm.setSubmitForm(() => {
        api.deleteCard(cardId)
            .then(res => {
                console.log(res)
                card.deleteCardFromDom();
                popupDeleteConfirm.close();
            })
            .catch(err => console.log("Произошла ошибка при удалении карточки", err))
    })
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
    infoInput.value = userInfo.getUserInfo().about;
    popupEditProfile.open();
}


function openAddPopup() {
    cardAddFormValidator.resetValidation();
    popupAdd.open();
}

profileEditFormValidator.enableValidation();
cardAddFormValidator.enableValidation();

popupOpenButtonProfileElement.addEventListener('click', openProfilePopup);
buttonAddCards.addEventListener('click', openAddPopup);
