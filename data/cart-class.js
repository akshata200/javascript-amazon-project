class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = (localStorage.getItem(this.#localStorageKey)) ? JSON.parse(localStorage.getItem(this.#localStorageKey)) :
            [
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryOptionId: '3'
                }
            ];
    }

    saveToLocalStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;
        let quantityClass = `.js-quantity-selector-${productId}`;
        const selectedQuantityElem = document.body.querySelector(quantityClass);
        let selectedQuantity = selectedQuantityElem ? selectedQuantityElem.value : 1;
        //console.log(selectedQuantity);

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId)
                matchingItem = cartItem;
        });

        if (matchingItem) {
            matchingItem.quantity += Number(selectedQuantity);
        }
        else {
            this.cartItems.push({
                productId: productId,
                quantity: Number(selectedQuantity),
                deliveryOptionId: '1'
            });
        }
        this.saveToLocalStorage();
    }

    deleteFromCart(productId) {
        let newCart = this.cartItems.filter((cartItem) => cartItem.productId !== productId);
        this.cartItems = newCart;
        this.saveToLocalStorage();
    }

    calcCartQuantity() {
        let totalQuantity = 0;
        this.cartItems.forEach(cartItem => {
            totalQuantity += cartItem.quantity;
        });
        return totalQuantity;
    }

    updatecartItemQuantity(productId, newQuantity) {
        if (newQuantity > 0 && newQuantity <= 1000) {
            this.cartItems.forEach(cartItem => {
                if (cartItem.productId === productId)
                    cartItem.quantity = newQuantity;
            });
            this.saveToLocalStorage();
        }
    }

    updateDeliveryOption(productId, newDeliveryOptionId) {
        const [cartItem] = cart.filter(cartItem => cartItem.productId === productId);
        cartItem.deliveryOptionId = newDeliveryOptionId;
        this.saveToLocalStorage();
    }

}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');
//cart.#localStorageKey = 'somethinYeg';

// cart.addToCart("4e37dd03-3b23-4bc6-9ff8-44e112a92c64");

console.log(cart);
console.log(businessCart);





