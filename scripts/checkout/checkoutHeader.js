import { calcCartQuantity } from '../../data/cart.js'


export function updateCartQuantityHeader() {
    let cartQuantity = calcCartQuantity();
    document.body.querySelector('.js-checkout-cart-quantity').innerHTML = `Checkout (${cartQuantity} items)`;
}