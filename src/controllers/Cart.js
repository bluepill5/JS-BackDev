class Cart {
    constructor (oldCart) {
        this.items = oldCart.items || {};
        this.totalQty = oldCart.totalQty || 0;
        this.totalPrice = oldCart.totalPrice || 0;
    }

    add = (item, id, qty) => {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }

        storedItem.qty = storedItem.qty + qty;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty += qty;
        this.totalPrice += parseFloat(storedItem.item.price * qty);
    }

    removeItem = (id) => {
        if (JSON.stringify(this.items) === '{}') {
            return 'Product not found.';
        } else {
            this.totalQty -= this.items[id].qty;
            this.totalPrice -= this.items[id].price;
            delete this.items[id];
        }
    }

    generateArray = () => {
        const arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }
}

module.exports = Cart;
