export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    addItem(item) {
        this._container.prepend(item)
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item)
        })
    }

    setItems(elements) {
        this._items = elements;
    }

}