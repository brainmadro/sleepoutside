import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.id}">
    <img src="${product.Image}" alt="Image of ${product.name}">
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`;
}

export default class ProductListing {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData();
        const filteredList = this.filterList(list, 4);
        this.renderList(filteredList)
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
    
}

function filterList(list, count) {
    return list.slice(0,count)
}
