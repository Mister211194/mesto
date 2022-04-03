import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector)
        this._form = this._popup.querySelector('.popup__form')
        this._inputsList = [...this._form.querySelectorAll('.popup__input')]
        this._handleFormSubmit = handleFormSubmit
        this._buttonSubmit = this._popup.querySelector('.popup__button')
    }

    _getInputValues() {
        const inputsValue = {};
        this._inputsList.forEach(item => {
            inputsValue[item.name] = item.value
        })
        return inputsValue;
    }

    loader(isLoading) {
        if (isLoading) {
            this._buttonSubmit.textContent = 'Сохранение...'
        } else {
            if (this._popup.classList.contains('add-cards-popup')) {
                this._buttonSubmit.textContent = 'Создать'
            } else {
                this._buttonSubmit.textContent = 'Сохранить'
            }

        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', () => this._handleFormSubmit(this._getInputValues()));
    }

    close() {
        super.close();
        this._form.reset()
    }
}