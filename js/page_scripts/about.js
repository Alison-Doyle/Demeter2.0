// Imports
import { ChangeCartDisplay } from "../components/cart.js";
import { LoadAppropriateButton } from "../components/accountButton.js";
import { RedirectToCheckout } from "../components/cart.js";

(function() {
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