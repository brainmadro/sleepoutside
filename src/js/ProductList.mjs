import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // Constructor setup for flexibility and reuse
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Fetch product data
    const list = await this.dataSource.getData();

    // Optional: Filter the list based on the category or other criteria
    const filteredList = this.filterProducts(list);

    // Render the product list
    this.renderList(filteredList);
  }

  filterProducts(list) {
    // Example: Limit to 4 products (customize as needed)
    return list.slice(0, 4);
  }

  renderList(list) {
    // Use the utility function to render the list
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}