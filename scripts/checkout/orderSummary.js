import { cart, deleteFromCart, calcCartQuantity, updatecartItemQuantity, updateDeliveryOption } from '../../data/cart.js'
import { products, getProductById} from '../../data/products.js'
import { formatCurrency } from '../utils/money.js'
import { deliveryOptions, getDeliveryOptionsById } from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


export function renderOrderSummary() {


  let cartSummaryHTML = '';
  //console.log('Show cart Items');
  //console.log(cart)
  cart.forEach((cartItem) => {
    // fetch product by productId
    const productId = cartItem.productId;
    const product = getProductById(productId)

    let productDeliveryDetails = getDeliveryOptionsById(cartItem.deliveryOptionId);
    //console.log(productDeliveryDetails);
    let formattedDeliveryDate = generateFormattedDate(productDeliveryDetails.deliveryDays);

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container
            js-cart-item-container-${product.id}">
            <div class="delivery-date js-delivery-date">
              Delivery date: ${formattedDeliveryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${product.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${product.id}">
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
                  <span class="delete-quantity-link link-primary js-delete-quantity-link
                              js-delete-quantity-link-${cartItem.productId}"
                        data-product-id="${cartItem.productId}" >
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${generateDeliveryOptions(cartItem.productId, cartItem)}
              </div>
            </div>
          </div>
    `;
  });
  
  if(document.body.querySelector('.js-order-summary') != null)
    document.body.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  //document.body.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
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
      renderPaymentSummary();
    })
  })

  // click on update
  const updateCartItemElements = document.body.querySelectorAll('.js-update-quantity-link');
  updateCartItemElements.forEach(updateCartItemElement => {
    updateCartItemElement.addEventListener('click', () => {
      const productId = updateCartItemElement.dataset.productId;
      const cartItemContainer = document.body.querySelector(`.js-cart-item-container-${productId}`)
      cartItemContainer.classList.add('is-editing-quantity');
    })
  })

  // click on Save
  const saveLinkElements = document.body.querySelectorAll('.js-save-quantity-link');
  saveLinkElements.forEach((saveLinkElement) => {
    saveLinkElement.addEventListener('click', () => {
      const productId = saveLinkElement.dataset.productId;
      handleQuantity(productId);
      renderPaymentSummary();

    })
  })

  // press enter on quantity-input
  const quantityInputElements = document.body.querySelectorAll('.js-quantity-inputs');
  quantityInputElements.forEach((quantityInputElement) => {
    quantityInputElement.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ')
        return;
      const productId = quantityInputElement.dataset.productId;
      handleQuantity(productId);
      renderPaymentSummary();
    })
  });

  // on selecting different devlivery options
  const deliveryOptionsList = document.body.querySelectorAll('.js-delivery-option');
  deliveryOptionsList.forEach(deliveryOption => {
    deliveryOption.addEventListener('click', () => {
      const { productId, deliveryOptionId } = deliveryOption.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })


}

renderOrderSummary();



function updateCartQuantity() {
  let cartQuantity = calcCartQuantity();
  if(document.body.querySelector('.js-checkout-cart-quantity') != null)
    document.body.querySelector('.js-checkout-cart-quantity').innerHTML = `Checkout (${cartQuantity} items)`;
}

function updateProductConatinerQuantity(productId, productQuantity) {
  const productContainerQuantity = document.body.querySelector(`.js-quantity-label-${productId}`);
  productContainerQuantity.innerHTML = productQuantity;
}

function handleQuantity(productId) {
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

function generateDeliveryOptions(productId, cartItem) {
  let deliveryOptionsHTML = '';
  deliveryOptions.forEach(deliveryOption => {
    let formattedDeliveryDate = generateFormattedDate(deliveryOption.deliveryDays);

    const price = (deliveryOption.priceCents === 0) ? "Free" : `$${formatCurrency(deliveryOption.priceCents)} - `

    const isChecked = (deliveryOption.id === cartItem.deliveryOptionId)
    deliveryOptionsHTML +=
      `
                <div class="delivery-option js-delivery-option"
                  data-product-id = ${productId} data-delivery-option-id=${deliveryOption.id}>
                  <input type="radio" ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      ${formattedDeliveryDate}
                    </div>
                    <div class="delivery-option-price">
                      ${price} Shipping
                    </div>
                  </div>
                </div>
    `;
  })


  return deliveryOptionsHTML;
}


function generateFormattedDate(daysCount) {
  let today = dayjs();
  const deliveryDate = today.add(daysCount, 'days');
  const formattedDeliveryDate = deliveryDate.format('dddd, MMMM D')
  return formattedDeliveryDate;
}


