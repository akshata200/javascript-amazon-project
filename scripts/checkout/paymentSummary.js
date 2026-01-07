import { getProductById } from "../../data/products.js";
import { cart, calcCartQuantity} from "../../data/cart.js";
import { deliveryOptions, getDeliveryOptionsById } from "../../data/deliveryOptions.js";
import { formatCurrency } from '../utils/money.js'

export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let totalBeforeTaxCents = 0;
    let taxCents = 0;
    let totalceents = 0;


    cart.forEach(cartItem =>{
        const product = getProductById(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOptionsById(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;

        totalBeforeTaxCents = productPriceCents + shippingPriceCents;
        taxCents = totalBeforeTaxCents * 0.1;
        totalceents = totalBeforeTaxCents + taxCents;

    })

    const paymentSummaryHTML = 
    `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calcCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalceents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `

    document.body.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    
}