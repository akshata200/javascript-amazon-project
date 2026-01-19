import { products, fetchProducts, getProductById } from "../data/products.js";
import { orders,getOrderById } from "../data/orders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


const url = new URL(window.location.href);
console.log(url.searchParams.get('orderId'))
console.log(url.searchParams.get('productId'))


function loadProductTrackingPage() {
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const order = getOrderById(orderId);
    const orderedProduct = getOrderedProduct(order,productId)
    const product = getProductById(productId);
    
    const deliveryDateElem = document.querySelector('.js-delivery-date');
    deliveryDateElem.innerHTML = ` Arriving on ${formattedDate(orderedProduct.estimatedDeliveryTime)}`

    const productNameElem = document.querySelector('.js-product-info-name');
    productNameElem.innerHTML = product.name;

    const productQuanElem = document.querySelector('.js-product-info-quantity');
    productQuanElem.innerHTML = `Quantity : ${orderedProduct.quantity}`

    const productImgElem = document.querySelector('.js-product-image');
    productImgElem.src = product.image


    // console.log(order)
    // console.log(orderedProduct)
    // console.log(product)
}

await fetchProducts();
loadProductTrackingPage();

function formattedDate(date){
    const day = new dayjs(date)
    return day.format('dddd, MMMM D')
}

function getOrderedProduct(order,productId){
    const [product] = order.products.filter(product => product.productId === productId )
    return product;
}