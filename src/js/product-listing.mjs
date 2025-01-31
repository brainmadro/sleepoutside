import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const category = getParam("category");
const dataSource = new ProductData();
const title = category.charAt(0).toUpperCase() + category.slice(1);
document.querySelector(".title").textContent = title;
const listElement = document.querySelector(".product-list");
const listing = new ProductListing(category, dataSource, listElement);

loadHeaderFooter();
listing.init();