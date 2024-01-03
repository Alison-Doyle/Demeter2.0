export async function ReadInProducts() {
    const ProductsDataLocation = "./../resources/data/products.json";
    let productData = [];

    try {
        // Fetch data
        let response = await fetch(ProductsDataLocation);

        // Check if response is valid
        if (!response.ok) {
            throw new Error(`Response Error: ${response.status}`);
        }

        // Parse data
        productData = await response.json();
    }
    catch (error) {
        console.error(`Fetch Error: ${error}`);
    }

    return productData;
}

export async function FetchProductByName(productName) {
    let allProducts = await ReadInProducts();

    // Filter for product
    let productToReturn;
    allProducts.map((product) => {
        if (product.product_name === productName) {
            productToReturn = product;
        }
    });

    return productToReturn;
}

export async function FetchProductById(productId) {
    let allProducts = await ReadInProducts();

    // Filter for product
    let productToReturn;
    allProducts.map((product) => {
        if (product.product_id === productId) {
            productToReturn = product;
        }
    });

    return productToReturn;
}