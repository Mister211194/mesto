export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._closeByEscape = this._closeByEscape.bind(this)
        this._closeByClick = this._closeByClick.bind(this)
    }

    // Функци открытия popup
    open() {
        this._popup.classList.add('popup_open');
        document.addEventListener('keydown', this._closeByEscape);
    }

    // функция закрытия popup
    close() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', this._closeByEscape);
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

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._closeByClick);
    }

}