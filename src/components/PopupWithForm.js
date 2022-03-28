import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector)
        this._form = this._popup.querySelector('.popup__form')
        this._inputsList = [...this._form.querySelectorAll('.popup__input')]
        this._handleFormSubmit = handleFormSubmit
    }

    _getInputValues() {
        const inputsValue = {};
        this._inputsList.forEach(item => {
            inputsValue[item.name] = item.value
        })
        return inputsValue;
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