import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

// Ensure ZIP Code updates order total
document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

// ✅ Fix: Validate form before processing checkout
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  const myForm = document.forms["checkout"];
  const isValid = myForm.checkValidity(); // Check form validity
  myForm.reportValidity(); // Show error messages if invalid

  if (isValid) {
    prepareAndSubmitCheckout(); // Proceed with checkout
  }
});

/**
 * ✅ Fix: Prepare checkout data before sending the request.
 */
function prepareAndSubmitCheckout() {
  let myForm = document.forms["checkout"];

  // ✅ Fix: Format Expiration Date (YYYY-MM → MM/YY)
  let expirationValue = myForm["expiration"].value; // "YYYY-MM"
  let formattedExpiration = "00/00"; // Default in case of issue
  if (expirationValue && expirationValue.includes("-")) {
    let [year, month] = expirationValue.split("-");
    formattedExpiration = `${month}/${year.slice(-2)}`; // Converts "2027-10" → "10/27"
  } else {
    console.error("⚠️ Expiration Date is invalid!", expirationValue);
  }

  // ✅ Fix: Remove spaces from card number
  let cleanCardNumber = myForm["cardNumber"].value.replace(/\D/g, ""); // Remove all non-numeric characters

  // ✅ Ensure order total, tax, and shipping are numbers
  let orderTotal = parseFloat(document.querySelector("#orderTotal").textContent) || 0;
  let tax = parseFloat(document.querySelector("#tax").textContent) || 0;
  let shipping = parseFloat(document.querySelector("#shipping").textContent) || 16; // Default shipping cost

  // ✅ Build the payload with cleaned data
  let payload = {
    cardNumber: cleanCardNumber,
    expiration: formattedExpiration, // ✅ This will now be in MM/YY format
    fname: myForm["fname"].value.trim(),
    lname: myForm["lname"].value.trim(),
    street: myForm["street"].value.trim(),
    city: myForm["city"].value.trim(),
    state: myForm["state"].value.trim(),
    zip: myForm["zip"].value.trim(),
    code: myForm["code"].value.trim(),
    orderDate: new Date().toISOString(),
    orderTotal: orderTotal,
    tax: tax,
    shipping: shipping,
    items: JSON.parse(localStorage.getItem("cart")) || [] // Assuming cart is stored in localStorage
  };

  console.log("🚀 Prepared Payload:", payload); // ✅ Debugging Step to confirm correct format

  // ✅ Proceed with Checkout
  myCheckout.checkout(payload);
}
