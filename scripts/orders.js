import { orders } from "../data/orders.js";
import { formatCurrency } from '../scripts/utils/money.js'
import { products, getProductById, fetchProducts } from '../data/products.js'
import { addToCart, calcCartQuantity  } from "../data/cart.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

console.log(orders)

function loadOrderPage() {
    let ordersHTML = '';

    orders.forEach(order => {
        ordersHTML +=
            `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formattedDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid js-order-details-grid-${order.id}">

          </div>
        </div>
        `
    });
    document.body.querySelector('.js-orders-grid').innerHTML = ordersHTML;

}

function loadOrderProducts() {
    let productHTML = '';
    orders.forEach(order => {
        productHTML = '';
        order.products.forEach(productDetails => {
            const product = getProductById(productDetails.productId);
            //console.log(product)
            productHTML +=
                `
            <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${formattedDate(productDetails.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity"">
                Quantity: ${productDetails.quantity}
              </div>
              <button class="buy-again-button button-primary
                            js-buy-again-button-${order.id}-${productDetails.productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${productDetails.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
            `
        })

        document.body.querySelector(`.js-order-details-grid-${order.id}`).innerHTML = productHTML;
    });
}

function buyProductAgain(){
   orders.forEach(order => {
        order.products.forEach(productDetails => {
            document.body.querySelector(`.js-buy-again-button-${order.id}-${productDetails.productId}`)
                .addEventListener('click',()=>{
                    console.log(`Buy product ${productDetails.productId} again`);
                    addToCart(productDetails.productId);
                    updatecartQuantity();
                })
            
        })

        
    });
}

await fetchProducts();
loadOrderPage();
loadOrderProducts();
buyProductAgain();
updatecartQuantity();



function formattedDate(date) {
    const day = new dayjs(date).format('MMMM D');
    return day;
}

function updatecartQuantity() {
  let cartQuantity = calcCartQuantity();
  document.body.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}