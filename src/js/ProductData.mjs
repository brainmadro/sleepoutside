const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} - ${res.statusText}`);
  }
}

export default class ProductData {
  async getData(category) {
    try {
      const response = await fetch(`${baseURL}products/search/${category}`);
      
      console.log("API Response:", response);

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return empty array if API fails
    }
  }

  async findProductById(id) {
    try {
      const response = await fetch(`${baseURL}product/${id}`);
      
      console.log("API Response for product:", response);

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null; // Return null if API fails
    }
  }
}