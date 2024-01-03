import { LoadAppropriateButton } from "../components/accountButton.js";
import { ChangeCartDisplay, RedirectToCheckout } from "../components/cart.js";
import { DisplayToast } from "../components/toast.js";

(function(){
    LoadAppropriateButton();
    
    // Event listeners
    document.getElementById('cart-button').addEventListener('click', ChangeCartDisplay, false);
    document.getElementById('checkout-button').addEventListener('click', GoToChekcout, false);
    document.getElementById('close-cart-button').addEventListener('click', ChangeCartDisplay, false);

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