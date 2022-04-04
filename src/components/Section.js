export default class Section {
    constructor({ items, renderer }, container) {
        this._items = items;
        this._renderer = renderer;
        this._container = container;
    }

    addItem(item, position) {
        position === 'prepend' ? this._container.prepend(item) : this._container.append(item)
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