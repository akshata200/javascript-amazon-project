import { cart, deleteFromCart, calcCartQuantity  } from '../data/cart.js'
import { products } from '../data/products.js'
import { exportCurrency } from './utils/money.js'


let cartSummaryHTML = '';
console.log('Show cart Items');
console.log(cart)
cart.forEach((cartItem) => {
    // fetch product by productId
    const productId = cartItem.productId;
    const [product] = products.filter(product => product.id === productId);

    cartSummaryHTML += `
        <div class="cart-item-container
            js-cart-item-container-${product.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${exportCurrency(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link"
                        data-product-id="${cartItem.productId}" >
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
});
document.body.querySelector('.order-summary').innerHTML = cartSummaryHTML;
updateCartQuantity();


// adding event listener to Delete
const deleteCartItemElements = document.body.querySelectorAll('.js-delete-quantity-link');
deleteCartItemElements.forEach((deleteCartItemElement) => {
    deleteCartItemElement.addEventListener('click', () => {
        const productId = deleteCartItemElement.dataset.productId;
        deleteFromCart(productId);
        const cartItemContainerElement = document.body.querySelector(`.js-cart-item-container-${productId}`);
        cartItemContainerElement.remove();
        updateCartQuantity();
    })
})

function updateCartQuantity(){
  let cartQuantity = calcCartQuantity();
  document.body.querySelector('.js-checkout-cart-quantity').innerHTML =  `Checkout (${cartQuantity} items)`;
}