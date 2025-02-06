import ExternalServices from "./ExternalServices.mjs";
import { formDataToJSON, getLocalStorage } from "./utils.mjs";

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  return items.map((item) => ({
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
		// calculate and display the total amount of the items in the cart, and the number of items.
		this.itemTotal = this.list.reduce((acc, item) => {
			return acc + item.FinalPrice * item.Quantity;
		}, 0);
  }

  calculateOrdertotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
		this.tax = this.itemTotal * 0.06;
		this.shipping = this.list.length * 10 + 2;
		this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
		const subtotalElement = document.querySelector("#cart_subtotal");
		const estiamteElement = document.querySelector("#cart_estimate");
		const taxElement = document.querySelector("#cart_tax");
    const totalElement = document.querySelector(this.outputSelector);
		subtotalElement.textContent = `$${this.itemTotal.toFixed(2)}`;
		estiamteElement.textContent = `$${this.shipping.toFixed(2)}`;
		taxElement.textContent = `$${this.tax.toFixed(2)}`;
		totalElement.textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    const items = packageItems(this.list);
    const data = formDataToJSON(form)
    const payload = {
      items: items,
      orderDate: new Date(),
      tax: this.tax,
      shipping: this.shipping,
      orderTotal: this.orderTotal,
      ...data
    }

    // call the checkout method in our ExternalServices module and send it our data object.
    const externalServices = new ExternalServices();
    externalServices.checkout(payload)
  }
}