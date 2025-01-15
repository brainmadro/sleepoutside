import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  console.log(cartItems)
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty!</p>";
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function addToCart(item) {
  const cartItems = getLocalStorage("so-cart");

  // Verifica si el artículo ya existe en el carrito
  const existingItemIndex = cartItems.findIndex(cartItem => cartItem.Name === item.Name && cartItem.Colors[0].ColorName === item.Colors[0].ColorName);
  
  if (existingItemIndex !== -1) {
    // Si ya existe, actualiza la cantidad
    cartItems[existingItemIndex].Quantity += 1;
  } else {
    // Si no existe, agrega el nuevo artículo
    item.Quantity = 1;  // Asume una cantidad de 1 por defecto
    cartItems.push(item);
  }
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

addToCart(this.cartItem);
renderCartContents();
