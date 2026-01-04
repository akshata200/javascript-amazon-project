import { cart, addToCart, calcCartQuantity } from "../data/cart.js"
import { products } from "../data/products.js";
import { exportCurrency } from './utils/money.js'
// import {cart as mycart} from "../data/cart.js"
// import * as cartModule from "../data/cart.js"

/* product list comes from folder data/product.js. Since we load product.js first in our amazon.html, 
we can use product list form Product.js in amazom.js 

Earlier in code development we were loading all js files, thats why upper comment says all this
Later we switched to using Modules*/

/*
Main idea of Javascript
1. Save the data
2. generate the HTML
3. Make it Interactive
*/

let productHTMLElement = '';
products.forEach((product) => {
  productHTMLElement += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${exportCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
})

document.body.querySelector('.js-products-grid').innerHTML = productHTMLElement;
updatecartQuantity();
const productPreviousTimeouts = [];

// add to cart functionailty
document.body.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    showAddedToCartMessage(productId)
    updatecartQuantity();
  })
});

function updatecartQuantity() {
  let cartQuantity = calcCartQuantity();
  document.body.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

function showAddedToCartMessage(productId) {
  if(productPreviousTimeouts[productId]){
    clearTimeout(productPreviousTimeouts[productId]);
  }
  const messageElement = document.body.querySelector(`.js-added-to-cart-${productId}`)
  productPreviousTimeouts[productId] = setTimeout(() => {
    messageElement.style.opacity = 0;
  }, 2000);
  messageElement.style.opacity = 1;
}
