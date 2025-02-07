import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const zipCodeElement = document.querySelector("#checkout--zip-code");
const formElement = document.querySelector("form");
const checkout = new CheckoutProcess("so-cart", "#cart_total");
checkout.init();

if (zipCodeElement) {
	zipCodeElement.addEventListener("input", (event) => {
		const zipCode = event.target.value;
		if (zipCode.length === 5) {
			checkout.calculateOrdertotal();
		}
	});
}

if (formElement) {
	formElement.addEventListener("submit", (event) => {
		event.preventDefault();
		checkout.checkout(event.target)
	})
}

