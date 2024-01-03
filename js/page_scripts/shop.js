import { ReadInProducts } from "../database/products.js";
import { ChangeCartDisplay, RedirectToCheckout } from "../components/cart.js";
import { LoadAppropriateButton } from "../components/accountButton.js";

(function() {
    DisplayProducts();
    LoadAppropriateButton();

    // Event listeners
    document.getElementById('cart-button').addEventListener('click', ChangeCartDisplay, false);
    document.getElementById('close-cart-button').addEventListener('click', ChangeCartDisplay, false);
    document.getElementById('checkout-button').addEventListener('click', GoToChekcout, false);
}())

async function DisplayProducts() {
    let products = await ReadInProducts();

    products.map((product) => {
        RenderProduct(product)
    })
}

function RenderProduct(product) {
    // Html elements
    let cardsContainer = document.getElementById('products-container');

    // Create card elements
    let cardWrapper = document.createElement('div');
    cardWrapper.classList.add('mb-3', 'col-6', 'col-md-4', 'col-lg-3');
    
    let card = document.createElement('div');
    card.classList.add('product-card');
    card.onclick = function () { RedirectToProductDetails(this) }

    let image = document.createElement('img');
    image.classList.add('product-image');
    image.src = product.image_url;

    let productName = document.createElement('h2');
    productName.innerText = product.product_name;

    let price = document.createElement('h3');
    price.innerText = `€${product.price.toFixed(2)}`;
    
    // Combine card elements
    card.appendChild(image);
    card.appendChild(productName);
    card.appendChild(price);

    cardWrapper.appendChild(card);

    // Append card to webpage
    cardsContainer.appendChild(cardWrapper);
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