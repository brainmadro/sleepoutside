import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from './utils.mjs';

const category = getParam('category');
const dataSource = new ExternalServices();
const title = document.querySelector("#category-title");
const listElement = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, listElement);

loadHeaderFooter();
title.textContent = category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
listing.init();