export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._closeByEscape = this._closeByEscape.bind(this)
        this._closeByClick = this._closeByClick.bind(this)
    }

    // Функци открытия popup
    open() {
        this._popup.classList.add('popup_open');
        this.setEventListeners();
    }

    // функция закрытия popup
    close() {
        this._popup.classList.remove('popup_open');
        this._removeEventListeners();
    }

    _closeByEscape(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closeByClick(evt) {
        if (evt.target.classList.contains('popup_open')) {
            this.close();
        }
        if (evt.target.classList.contains('popup__closed')) {
            this.close();
        }
    }

    _removeEventListeners() {
        this._popup.removeEventListener('mousedown', this._closeByClick);
        document.removeEventListener('keydown', this._closeByEscape);
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._closeByClick);
        document.addEventListener('keydown', this._closeByEscape);
    }

}