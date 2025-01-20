import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");
const product = new ProductDetails(productId, dataSource);

product.init();

  const productId = getParams('product'); 

  async function displayProductDetails() {
    const product = await dataSource.findProductById(productId); 
  }
  displayProductDetails();

  document
  .getElementById("addToCart")
  .addEv