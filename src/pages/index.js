import {
    popupOpenButtonProfileElement, formProfileElement,
    nameInput, infoInput, profileInfo, popupProfile, popupAvatar, popupAvatarOpenBtn, formPopupAvatar, popupAddCards, buttonAddCards,
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

// Получение данных с сервера и рендер данных на страницу
const userInfo = new UserInfo(profileInfo);
const userDatafromServer = api.getUserInfo();

Promise.all([userDatafromServer, api.getInitalCards()])
    .then(([userData, cardsData]) => {
        userInfo.setUserInfo(userData);
        userInfo.setUserId(userData._id);
        userInfo.setAvatar(userData)
        cardsList.setItems(cardsData);
        cardsList.renderItems();
    })
    .catch((err) => {
        console.log(`Произошла ошибка при загрузке страницы: ${err}`);
    });


//Изменение Аватара пользователя
const popupEditAvatar = new PopupWithForm(popupAvatar, handleAvatarSubmit);
function handleAvatarSubmit(userData) {
    popupEditAvatar.loader(true);
    api.editAvatar(userData)
        .then(res => {
            userInfo.setAvatar(res)
            popupEditAvatar.close();
        })
        .catch(err => console.log("Произошла ошибка при смене Аватара:", err))
        .finally(() => popupEditAvatar.loader(false))
}
popupEditAvatar.setEventListeners();

// Изменение данных пользователя
const popupEditProfile = new PopupWithForm(popupProfile, handleProfileSubmit);
function handleProfileSubmit(userData) {
    popupEditProfile.loader(true);
    api.editUserInfo(userData)
        .then(res => {
            userInfo.setUserInfo(res);
            popupEditProfile.close();
        }).catch(err => console.log(`Данные не загружены: ${err}`))
        .finally(() => popupEditProfile.loader(false))
}
popupEditProfile.setEventListeners();

// Добавление новой карточки
const popupAdd = new PopupWithForm(popupAddCards, handleAddSubmit);

function handleAddSubmit(cardData) {
    popupAdd.loader(true);
    api.addNewCard(cardData)
        .then(res => {
            cardsList.addItem(createCard(res))
            popupAdd.close();
        }).catch(err => console.log(`Произошла ошибка при добавлении карточки: ${err}`))
        .finally(() => popupAdd.loader(false))

}
popupAdd.setEventListeners();

// Создание и отрисовка всех карточек
function createCard(cardData) {
    const card = new Card(
        cardData,
        '.template',
        userInfo.getUserId(),
        handleCardClick,
        (id) => {
            handleDeleteClick(id, card)
        },
        (id) => {
            handleLikeClick(id, card)
        }
    );
    return card.returnCard();
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

// Удаление карточки с сервера
const popupDeleteConfirm = new PopupConfirm('.popup_delete-confirm');
function handleDeleteClick(cardId, card) {
    popupDeleteConfirm.open();
    popupDeleteConfirm.setSubmitForm(() => {
        api.deleteCard(cardId)
            .then(() => {
                card.deleteCardFromDom();
                popupDeleteConfirm.close();
            })
            .catch(err => console.log("Произошла ошибка при удалении карточки", err))
    })
}
popupDeleteConfirm.setEventListeners();

// Добавление и удаление лайков
function handleLikeClick(id, card) {
    if (card.isLiked()) {
        api.deleteLike(id)
            .then(res => {
                card.setLikes(res.likes)
            })
            .catch(err => console.log(`Произошла ошибка при удалении лайка: ${err}`))
    } else {
        api.AddLike(id)
            .then(res => {
                card.setLikes(res.likes)
            })
            .catch(err => console.log(`Произошла ошибка при добавлении лайка: ${err}`))
    }
}


// Функции открытия попапов
const popupImage = new PopupWithImage(popupPreview);
popupImage.setEventListeners();

function handleCardClick(data) {
    popupImage.open(data);
}

function handleClickOpenAvatarPopup() {
    AvatarFormValidator.resetValidation();
    popupEditAvatar.open();
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

// Валидация форм
const AvatarFormValidator = new FormValidator(dataForm, formPopupAvatar);
const profileEditFormValidator = new FormValidator(dataForm, formProfileElement)
const cardAddFormValidator = new FormValidator(dataForm, formElementAdd);

profileEditFormValidator.enableValidation();
cardAddFormValidator.enableValidation();
AvatarFormValidator.enableValidation();

// Слушатели
popupOpenButtonProfileElement.addEventListener('click', openProfilePopup);
buttonAddCards.addEventListener('click', openAddPopup);
popupAvatarOpenBtn.addEventListener('click', handleClickOpenAvatarPopup);