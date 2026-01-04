import { cart, deleteFromCart, calcCartQuantity, updatecartItemQuantity } from '../data/cart.js'
import { products } from '../data/products.js'
import { exportCurrency } from './utils/money.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


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
                    Quantity: <span class="quantity-label js-quantity-label-${cartItem.productId}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link"
                        data-product-id="${cartItem.productId}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-inputs js-quantity-input-${cartItem.productId}"
                          data-product-id="${cartItem.productId}">
                  <span class="save-quantity-link link-primary js-save-quantity-link"
                        data-product-id="${cartItem.productId}">
                        Save
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

let date = dayjs()
const deliveryDate = date.add(7,'days');
console.log(deliveryDate.format('dddd, MMMM-D'))


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

function updateCartQuantity() {
  let cartQuantity = calcCartQuantity();
  document.body.querySelector('.js-checkout-cart-quantity').innerHTML = `Checkout (${cartQuantity} items)`;
}

function updateProductConatinerQuantity(productId, productQuantity) {
  const productContainerQuantity = document.body.querySelector(`.js-quantity-label-${productId}`);
  productContainerQuantity.innerHTML = productQuantity;
}

// click on update
const updateCartItemElements = document.body.querySelectorAll('.js-update-quantity-link');
updateCartItemElements.forEach(updateCartItemElement => {
  updateCartItemElement.addEventListener('click', () => {
    const productId = updateCartItemElement.dataset.productId;
    const cartItemContainer = document.body.querySelector(`.js-cart-item-container-${productId}`)
    cartItemContainer.classList.add('is-editing-quantity')
  })
})

// click on Save
const saveLinkElements = document.body.querySelectorAll('.js-save-quantity-link');
saveLinkElements.forEach((saveLinkElement) => {
  saveLinkElement.addEventListener('click', () => {
    const productId = saveLinkElement.dataset.productId;
    handleQuantity(productId)

  })
})

// press enter on quantity-input
const quantityInputElements = document.body.querySelectorAll('.js-quantity-inputs');
quantityInputElements.forEach((quantityInputElement)=>{
  quantityInputElement.addEventListener('keydown',(event)=>{
    if(event.key !=='Enter' && event.key!==' ' )
      return;
    const productId = quantityInputElement.dataset.productId;
    handleQuantity(productId)
  })
});

function handleQuantity(productId){
  const cartItemContainer = document.body.querySelector(`.js-cart-item-container-${productId}`)
    cartItemContainer.classList.remove('is-editing-quantity')

    const quantityInput = document.body.querySelector(`.js-quantity-input-${productId}`);
    const productQuantity = Number(quantityInput.value);

    if (productQuantity > 0 && productQuantity <= 1000) {
      updatecartItemQuantity(productId, productQuantity);
      updateCartQuantity();
      updateProductConatinerQuantity(productId, productQuantity);
    }
}




