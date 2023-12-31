import { FetchProductByName } from "../database/products.js";
import { AddItemToCart, ChangeCartDisplay, RedirectToCheckout } from "../components/cart.js";
import { LoadAppropriateButton } from "../components/accountButton.js";

(function () {
    DisplayProduct();
    LoadAppropriateButton();

    // Event listeners
    document.getElementById('cart-button').addEventListener('click', ChangeCartDisplay, false);
    document.getElementById('close-cart-button').addEventListener('click', ChangeCartDisplay, false);
    document.getElementById('checkout-button').addEventListener('click', GoToChekcout, false);
}())

async function DisplayProduct() {
    // Get product information
    let productName = GetProductNameFromUrl();
    let product = await FetchProductByName(productName);

    RenderProduct(product);
}

function GetProductNameFromUrl() {
    let productName = "";

    // Get url
    let url = window.location.href;

    // Split url to obtain product name
    let dividedUrl = url.split('?');
    productName = dividedUrl[1];
    productName = productName.replaceAll('-', ' ');

    return productName;
}

function RenderProduct(product) {
    // Html elements
    let container = document.getElementById('item-details');

    // Create product display
    let imageWrapper = document.createElement('div');
    imageWrapper.classList.add('col-12', 'col-md-6', 'col-lg-5');

    let image = document.createElement('img');
    image.src = product.image_url;

    imageWrapper.appendChild(image);

    let body = document.createElement('div');
    body.classList.add('col-12', 'col-md-6', 'col-lg-7');
    body.id = "body-wrapper";

    // Product details
    let name = document.createElement('h1');
    name.innerText = product.product_name;

    let price = document.createElement('h2');
    price.innerText = `€${product.price.toFixed(2)}`;

    let description = document.createElement('p');
    description.innerText = product.description;

    // Add to cart controls
    let addToCartRow = document.createElement('div');
    addToCartRow.classList.add('row');

    let quantityInput = document.createElement('div');
    quantityInput.classList.add('col-12', 'col-md-4', 'col-lg-4');

    let quantityLabel = document.createElement('label');
    quantityLabel.classList.add('form-label');
    quantityLabel.innerText = "Quantity:"

    let quantitySelector = document.createElement('input');
    quantitySelector.id = "product-quantity";
    quantitySelector.classList.add('form-control');
    quantitySelector.type = 'number';

    quantityInput.appendChild(quantityLabel);
    quantityInput.appendChild(quantitySelector);

    let addToCartButton = document.createElement('button');
    addToCartButton.classList.add('btn', 'btn-primary', 'col-12', 'col-md-7', 'col-lg-4');
    addToCartButton.innerText = "Add to Cart";
    addToCartButton.onclick = function () { AddProductToCart() }

    addToCartRow.appendChild(quantityInput);
    addToCartRow.appendChild(addToCartButton);

    // Combine body elements
    body.appendChild(name);
    body.appendChild(price);
    body.appendChild(description)
    body.appendChild(addToCartRow);

    // Append items to page
    container.appendChild(imageWrapper);
    container.appendChild(body)
}

async function AddProductToCart() {
    // Get product id
    let productName = GetProductNameFromUrl();
    let product = await FetchProductByName(productName);
    let productId = product.product_id;
    let productQuantity = document.getElementById('product-quantity').value;
    productQuantity = parseInt(productQuantity);

    // Send item to cart
    AddItemToCart(productId, productQuantity);
}

function GoToChekcout() {
    // Validate items in cart and is user logged in to decide on action
    let cart = sessionStorage.getItem('cart');
    cart = JSON.parse(cart);

    let isLoggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));

    if (cart.length === 0) {
        DisplayToast('No items in cart', 'e');
    } else if ((cart.length > 0) && (isLoggedIn !== true))
        window.location.href = "./../html/sign-in.html";
    else {
        RedirectToCheckout()
    }
}