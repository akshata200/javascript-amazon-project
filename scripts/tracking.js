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

    deliveryProgress(order, orderedProduct)


     console.log(order)
     console.log(orderedProduct)
     console.log(product)
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

function deliveryProgress(order, orderedProduct){
    //((currentTime - deliveryTime)/(deliveryTime - orderedTime)) * 100
    const currentTime = dayjs().valueOf();
    const deliveryTime = dayjs(orderedProduct.estimatedDeliveryTime).valueOf();
    const orderedTime = dayjs(order.orderTime).valueOf();
    console.log(currentTime);
    console.log(deliveryTime)
    console.log(orderedTime)

    const progressPerc = Math.round(((currentTime - orderedTime)/(deliveryTime - orderedTime)) * 100);
    
    const progressBarElem = document.querySelector('.progress-bar')
    console.log(progressPerc)


    
    if(progressPerc >= 100){
        progressBarElem.style="width:100%";
        updateProgressLabel('delivered')
    }
    else if(progressPerc >= 50 && progressPerc <= 99){
        progressBarElem.style="width:50%";
        updateProgressLabel('shipped');
    }   
    else if(progressPerc >= 0 && progressPerc <= 49){
        progressBarElem.style="width:30%";
        updateProgressLabel('preparing')
    }
        
}

function updateProgressLabel(progress){
    const preparingElem = document.querySelector('.js-progress-label-preparing');
    const shippedElem = document.querySelector('.js-progress-label-shipped');
    const deliveredElem = document.querySelector('.js-progress-label-delivered');

    if(progress === 'preparing'){
        preparingElem.classList.add('current-status');
        shippedElem.classList.remove('current-status');
        deliveredElem.classList.remove('current-status');
    }
    else if(progress === 'shipped'){
        preparingElem.classList.remove('current-status');
        shippedElem.classList.add('current-status');
        deliveredElem.classList.remove('current-status');
    }
    else if(progress === 'delivered'){
        preparingElem.classList.remove('current-status');
        shippedElem.classList.remove('current-status');
        deliveredElem.classList.add('current-status');
    }
}