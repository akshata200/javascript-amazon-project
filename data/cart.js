
//localStorage.removeItem('cart')
export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = (localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) :
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


function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;
    let quantityClass = `.js-quantity-selector-${productId}`;
    const selectedQuantityElem = document.body.querySelector(quantityClass);
    let selectedQuantity = selectedQuantityElem ? selectedQuantityElem.value : 1;
    //console.log(selectedQuantity);

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId)
            matchingItem = cartItem;
    });

    if (matchingItem) {
        matchingItem.quantity += Number(selectedQuantity);
    }
    else {
        cart.push({
            productId: productId,
            quantity: Number(selectedQuantity),
            deliveryOptionId: '1'
        });
    }
    saveToLocalStorage();
}

export function deleteFromCart(productId) {
    let newCart = cart.filter((cartItem) => cartItem.productId !== productId);
    cart = newCart;
    saveToLocalStorage();
    // const index = cart.findIndex((cartItem) => cartItem.productId === productId);
    // if (index !== -1) {
    //     cart.splice(index, 1);
    // }
}

export function calcCartQuantity() {
    let totalQuantity = 0;
    cart.forEach(cartItem => {
        totalQuantity += cartItem.quantity;
    });
    return totalQuantity;
}

export function updatecartItemQuantity(productId, newQuantity) {
    if (newQuantity > 0 && newQuantity <= 1000) {
        cart.forEach(cartItem => {
            if (cartItem.productId === productId)
                cartItem.quantity = newQuantity;
        });
        saveToLocalStorage();
    }
}

export function updateDeliveryOption(productId, newDeliveryOptionId) {
    const [cartItem] = cart.filter(cartItem => cartItem.productId === productId);
    cartItem.deliveryOptionId = newDeliveryOptionId;
    saveToLocalStorage();
}