"use strict";

(function () {
    ReadInProducts();
}())

function ReadInProducts() {
    const ProductFilePath = "../resources/json/products.json";
    let products = FetchProducts();

    // Get html elements
    let productsContainer = document.getElementById("products-container");

    // Create and add products if they are a bestseller/featured product
    for (let i = 0; i < products.length; i++) {
    }
}