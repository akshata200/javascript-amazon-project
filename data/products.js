import { formatCurrency } from "../scripts/utils/money.js";

class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords

  }

  getStarImageUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `${formatCurrency(this.priceCents)}`;
  }

  extraDetailsHTML() {
    return ``;
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);  /// to call the base class constructor
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraDetailsHTML() {
    return `<a href="${this.sizeChartLink}" target="_blank">Size Chart</a>`;
  }

}

export let products = [];

export function fetchProducts() {

  const promise = fetch('https://supersimplebackend.dev/products')
    .then(response => response.json())
    .then((productList) => {
      products = productList.map(product => {
        if (product.type === "clothing")
          return new Clothing(product);
        return new Product(product);
      });
      console.log('Fetch Products')
    });
  return promise;
}
/*
fetchProducts().then(()=>{
  console.log('Next step after fetcing product')
});
*/

export function loadProducts(func) {
  const request = new XMLHttpRequest();
  request.addEventListener('load', () => {
    const productList = JSON.parse(request.response);
    products = productList.map((productDetails) => {
      if (productDetails.type === "clothing")
        return new Clothing(productDetails);
      return new Product(productDetails);
    });

    console.log('Load products')
    func();

  });

  request.open('GET', 'https://supersimplebackend.dev/products');
  request.send();
}





export function getProductById(productId) {
  const [product] = products.filter(product => product.id === productId);
  return product;
}
