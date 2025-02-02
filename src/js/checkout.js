import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", "#cart_total");
checkout.init();

const zipCodeElement = document.querySelector("#checkout--zip-code");

zipCodeElement.addEventListener("input", (event) => {
	const zipCode = event.target.value;
	if (zipCode.length === 5) {
		checkout.calculateOrdertotal();
	}
});
