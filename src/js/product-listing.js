import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const category = getParam("category") || "backpacks"; // Default to 'backpacks' if undefined
console.log("Category Loaded:", category); // Debugging
const dataSource = new ExternalServices();
const title = document.querySelector("#category-title");
const listElement = document.querySelector(".product-list");

loadHeaderFooter();

title.textContent = category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

dataSource.getData(category).then(data => {
  console.log("Fetched Data:", data); // Debugging
});

const listing = new ProductList(category, dataSource, listElement);
listing.init();
