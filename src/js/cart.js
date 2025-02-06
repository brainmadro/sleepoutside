import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const cart = new ShoppingCart("so-cart", ".product-list");

loadHeaderFooter();
cart.renderCartContents();

document.addEventListener("DOMContentLoaded", function () {
  const cartp = JSON.parse(localStorage.getItem("so-cart")) || [];
  console.log(cartp);
  const cartTotalElement = document.getElementById("cart-total");

  if (cartp.length > 0) {
    cartTotalElement.style.display = "block"; // Show the element

    // Calculate total price
    const total = cartp.reduce(
      (sum, item) => sum + item.FinalPrice * item.Quantity,
      0
    );

    // Insert total into the element
    cartTotalElement.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
  } else {
    cartTotalElement.style.display = "none"; // Hide if empty
  }
});
