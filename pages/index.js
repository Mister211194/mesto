// Добавление выборки DOM элементов
const PopupOpenButtonElement = document.querySelector('.profile__edit-button');
const PopupElement = document.querySelector('.popup');
const PopupCloseButtonElement = PopupElement.querySelector('.popup__closed');

// Функции переключения всплывающего окна
function OpenPopup() {
    PopupElement.classList.add('popup_open');
}

function ClosePopup() {
    PopupElement.classList.remove('popup_open');
}

// Функция закрытия попапа при клике на затемненную область
function ClosePopupByClickOverlay(event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    ClosePopup()
}

// Добавление слушателя на клик
PopupOpenButtonElement.addEventListener('click', OpenPopup);
PopupCloseButtonElement.addEventListener('click', ClosePopup);
PopupElement.addEventListener('click', ClosePopupByClickOverlay);




// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.getElementById('input-popup-name');
const jobInput = document.getElementById('input-popup-description');
const NameUser = document.querySelector('.profile__info-title');
const JobUser = document.querySelector('.profile__info-description');
const PopuSubmitButton = document.querySelector('.popup__button');

// Получаем значения полей Имя и Професии в поля input
nameInput.value = NameUser.textContent;
jobInput.value = JobUser.textContent;
function formSubmitHandler(evt) {
    evt.preventDefault();
    // перезаписываем поля
    NameUser.textContent = nameInput.value;
    JobUser.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', ClosePopup);
formElement.addEventListener('submit', formSubmitHandler);