import { setLocalStorage } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const url = baseURL + 'checkout';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    const response = await fetch(url, options);
    const data = await response.json();
    
    if (data.message === "Order Placed") {
      setLocalStorage("so-cart", []);
      window.location.replace("/");
    } else {
      console.log(data);
    }
  }
}
