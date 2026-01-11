import { cart, addToCart, loadFromStorage } from "../../data/cart.js";

describe("test suite : addToCart",()=>{
    it("add an existing product to cart",()=>{
        // it should update the quantity of that existing product
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: '1' 
            }])
        });

        loadFromStorage();
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toEqual(1);
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it("add a new product to cart",()=>{
        // mocking test case

        spyOn(localStorage,'setItem');
        // read it like : mock localStorage.getItem and return resposnse as whatever we return from callFake
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        // console.log(localStorage.getItem('cart'));
        loadFromStorage();

        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toEqual(1);
        // we can use toHaveBeenCalledTimes only if we are mocking that method
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[0].quantity).toEqual(1);

    });
});
