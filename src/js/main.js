import ProductListing from './ProductList.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('/json/tents.json'); // Adjust the path if needed
const listElement = document.querySelector('#product-list'); // The target element for the product list
const productListing = new ProductListing('tents', dataSource, listElement);

productListing.init();