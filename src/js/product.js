import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
console.log(setLocalStorage);
import { getParams } from './utils.mjs';  // Import getParams function



const dataSource = new ProductData("tents");
console.log(dataSource.findProductById(productId));

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

  const productId = getParams('product'); 

  async function displayProductDetails() {
    const product = await dataSource.findProductById(productId); 
  }
  displayProductDetails();

  document
  .getElementById("addToCart")
  .addEv