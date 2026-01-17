import { renderOrderSummary } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js'
import { loadProducts,fetchProducts} from "../data/products.js";
import { loadCart } from '../data/cart.js'
//import '../data/backend-practice.js'
// import '../data/cart-oop.js'
//import '../data/cart-class.js'

Promise.all([
    fetchProducts(),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});

/*
Promise.all([
    new Promise((resolve) => {
        console.log('Product promised resolved')
        loadProducts(()=>{
        resolve('Value from 1st resolve');
    });
    }),
    new Promise((resolve) => {
        console.log('Cart Promise resolved')
        loadCart(()=>{
            resolve('Value from the 2nd resolved');
        });
    })
]).then((values) => {
    console.log(values);
    console.log('Since promised resolved then.....')
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
// Multiple promises

new Promise((resolve)=>{
    loadProducts(()=>{
        resolve('value from 1st resolve');
    });
}).then((value)=>{
    console.log(value);
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});

*/
/*

new Promise((resolve)=>{
    loadProducts(()=>{
        resolve();
    });
}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
// Promise example

new Promise((resolve) => {
    console.log('Started Promise');
    loadProducts(() => {
        console.log('Finished Promise');
        resolve(); // resolved triggers the then block
        console.log('Resolved Promise');
        setTimeout(() => {
            console.log('In set Timeout');
        }, 1000);
    });
}).then(() => {
    console.log('Next step since promise is resolved');
});
*/

/*

loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/