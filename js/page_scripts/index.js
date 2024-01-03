// Imports
import { ReadInProducts } from "../database/products.js";
import { ChangeCartDisplay, RedirectToCheckout } from "../components/cart.js";
import { LoadAppropriateButton } from "../components/accountButton.js";
import { DisplayToast } from "../components/toast.js";

(function() {
    DisplayBestSellers();
    LoadAppropriateButton();

    // Initialise cart
    let cart = sessionStorage.getItem('cart');

    if (cart === null) {
        cart = []
        sessionStorage.setItem('cart', JSON.stringify(cart));
        console.log(JSON.parse(sessionStorage.getItem('cart')))
    }

    // Event listeners
    document.getElementById('cart-button').addEventListener('click', ChangeCartDisplay, false);
    document.getElementById('close-cart-button').addEventListener('click', ChangeCartDisplay, false);
    document.getElementById('checkout-button').addEventListener('click', GoToChekcout, false);
}())

async function DisplayBestSellers() {
    let products = await ReadInProducts();
    
    let bestsellingProducts = FilterForBestsellers(products);

    // Create product cards and add them to homepage
    bestsellingProducts.map((product) => {
        RenderProduct(product);
    });
}

function FilterForBestsellers(products) {
    let bestsellers = [];

    // Push all bestsellers into their own array
    products.map((product) => {
        if ((product.hasOwnProperty('bestseller')) && (product.bestseller === true)) {
            bestsellers.push(product);
        }
    });

    return bestsellers
}

function RenderProduct(product) {
    // Html elements
    let productCardsContainer = document.getElementById('products-container');

    // Card
    let card = document.createElement('div');
    card.classList.add('product-card');
    card.onclick = function () { RedirectToProductDetails(this) }

    // Card image
    let image = document.createElement('img');
    image.classList.add('product-image');
    image.src = product.image_url;

    // Card body
    let body = document.createElement('div');
    body.classList.add('product-description');

    let productName = document.createElement('h2');
    productName.innerText = product.product_name;

    let productPrice = document.createElement('h3');
    productPrice.innerText = `€${product.price.toFixed(2)}`;

    body.appendChild(productName);
    body.appendChild(productPrice);

    // Combine card elements
    card.appendChild(image);
    card.appendChild(body);

    // Append to webpage
    productCardsContainer.appendChild(card);
}

function RedirectToProductDetails(productCard) {
    // Get project selected
    let rawProductName = productCard.innerHTML;
    let parsedProductName = rawProductName.split('h2>');
    parsedProductName = parsedProductName[1].replace("</", "");
    parsedProductName = parsedProductName.replaceAll(" ", "-")

    // Pass project to next page
    let projectDetailsPage = `./product.html?${parsedProductName}`

    // Redirect user to project details
    window.open(projectDetailsPage, "_self");
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