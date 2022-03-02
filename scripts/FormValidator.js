export default class FormValidator {
    constructor(data, formElement) {
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._formElement = formElement;
        this._inputList = [...formElement.querySelectorAll(this._inputSelector)];
        this._buttonElement = formElement.querySelector(this._submitButtonSelector);
    }

    // Функция добавления ошибки
    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };
    // Функция снятия ошибки
    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    // проверкa формы на валидность
    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    };

    // Функция проверки полей на валидность
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    // функция изменения состояния кнопки
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute("disabled", "disabled");
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute("disabled", "disabled");
        }
    }

    // Обработчик для полей ввода
    _setEventListeners(formElement) {
        this._toggleButtonState();
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState();
            })
        })
    }

    // Обработчик форм
    enableValidation() {
        this._formElement.addEventListener('submit', function (event) {
            event.preventDefault();
        });
        this._setEventListeners(this._formElement);
    };
}