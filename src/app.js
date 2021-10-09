const { default: axios } = require("axios");

class Product {
  #baseUrl = "https://fakestoreapi.com/products";
 arr=[];
  async list() {
    return await axios.get(this.#baseUrl);
  }

  
  
}

module.exports = new Product();
