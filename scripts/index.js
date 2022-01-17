// Добавление выборки DOM элементов
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__closed');
const formElement = document.querySelector('.popup__form');
const nameInput = document.getElementById('input-popup-name');
const jobInput = document.getElementById('input-popup-description');
const nameUser = document.querySelector('.profile__info-title');
const jobUser = document.querySelector('.profile__info-description');

// Функции переключения всплывающего окна
function openPopup() {
    // Заносим данные в форму при открытии popup
    nameInput.value = nameUser.textContent;
    jobInput.value = jobUser.textContent;
    // Добавление класса для открытия popup
    popupElement.classList.add('popup_open');
}

function closePopup() {
    popupElement.classList.remove('popup_open');
}

// Функция закрытия попапа при клике на затемненную область
// function closePopupByClickOverlay(event) {
//     if (event.target !== event.currentTarget) {
//         return;
//     }
//     closePopup()
// }
// popupElement.addEventListener('click', closePopupByClickOverlay);

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameUser.textContent = nameInput.value;
    jobUser.textContent = jobInput.value;
    closePopup()
}

// Добавление слушателя на клик
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);