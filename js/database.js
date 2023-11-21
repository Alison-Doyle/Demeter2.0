"use strict"

function FetchProducts() {
    const ProductFilePath = "../resources/json/products.json";
    let products = [];

    // Get data from file
    fetch(ProductFilePath)
        .then((result) => result.json())
        .then((file) => {

            // Add products to array
            for (let i = 0; i < file.products.length; i++) {
                products.push(file.products[i]);
            }

        })
        .catch((error) => {
            console.error("Error:" + error)
        })

    return products;
}