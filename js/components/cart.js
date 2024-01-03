import { FetchProductById, FetchProductByName } from "../database/products.js";

export function ChangeCartDisplay() {
    // Html elements
    let cartWrapper = document.getElementById('cart-wrapper');
    let cartItemsList = document.getElementById('cart-item-list');

    if (window.getComputedStyle(cartWrapper, null).display == "none") {
        // Show cart
        PopulateCart();
        cartWrapper.style.display = "flex";
    } else {
        // Hide cart
        cartItemsList.innerHTML = "";
        cartWrapper.style.display = "none";
    }
}

function PopulateCart() {
    // Html elements
    let cartItemsList = document.getElementById('cart-item-list');

    // Fetch cart data
    let cart = sessionStorage.getItem('cart');
    cart = JSON.parse(cart);

    // Render cart items
    if ((cart != null) && (cart != [])) {
        cart.map(async (product) => {
            let cartItem = await RenderCart(product);
            cartItemsList.appendChild(cartItem);
        });
    } else {
        let noItemsNotifier = document.createElement('i');
        noItemsNotifier.innerText = "You have not added any items to the cart";

        cartItemsList.appendChild(noItemsNotifier);
    }
}

async function RenderCart(product) {
    // Get product information
    let productInformation = await FetchProductById(product.id);

    // Create elements
    let cartItem = document.createElement('li');
    cartItem.classList.add('cart-item');

    let itemImage = document.createElement('img');
    itemImage.classList.add('rounded');
    itemImage.src = productInformation.image_url;

    let productDetails = document.createElement('div');
    productDetails.classList.add('product-details');

    let productName = document.createElement('h2');
    productName.innerText = productInformation.product_name;
    productName.id = "product-name";

    let quantityControl = document.createElement('input');
    quantityControl.classList.add('form-control', 'quantity-control');
    quantityControl.type = 'number';
    quantityControl.value = product.quantity;
    quantityControl.oninput = function () { UpdateItemQuantity(this.parentElement) };

    let deleteItemButton = document.createElement('button');
    deleteItemButton.classList.add('btn', 'btn-outline-danger', 'delete-item-button');
    deleteItemButton.innerHTML = '<i class="bi bi-trash-fill"></i>';
    deleteItemButton.onclick = function () { DeleteItem(this.parentElement) };

    // Combine elements
    productDetails.appendChild(productName);
    productDetails.appendChild(quantityControl);

    cartItem.appendChild(itemImage);
    cartItem.appendChild(productDetails);
    cartItem.appendChild(deleteItemButton);

    return cartItem;
}

export function AddItemToCart(productId, quantity) {
    // Fetch cart data
    let cart = sessionStorage.getItem('cart');
    cart = JSON.parse(cart);

    // Add item appropriatly depending on if it already exists
    let itemIndex = -1;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == productId) {
            itemIndex = i;
        }
    }

    if (itemIndex === -1) {
        // Create new cart item
        let newCartItem = {
            "id": productId,
            "quantity": quantity
        };

        cart.push(newCartItem);
    } else {
        // Update cart item quantity
        cart[itemIndex].quantity += quantity;
    }

    // Update cart in session storage
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

export async function UpdateItemQuantity(cartItem) {
    // Parse cart item for details
    let newQuantity = ParseCartQuantity(cartItem);
    let productId = await ParseCartItem(cartItem)

    // Fetch cart data
    let cart = sessionStorage.getItem('cart');
    cart = JSON.parse(cart);

    // Find item in cart
    let itemIndex = -1;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == productId) {
            itemIndex = i;
        }
    }

    // Reduce quantity by x amount/remove item entirely
    if (itemIndex !== -1) {
        if (newQuantity > 0) {
            cart[itemIndex].quantity = newQuantity;
        }
    } else {
        console.error("Could not find item");
    }

    // Update cart in session storage
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

async function ParseCartItem(cartItem) {
    let productName = cartItem.innerText;

    let productDetails = await FetchProductByName(productName);
    let productId = productDetails.product_id;
    // console.log(productId)

    return productId;
}

function ParseCartQuantity(cartItem) {

    return cartItem.childNodes[1].value;
}

export function RedirectToCheckout() {
    window.location.href = "./../html/checkout.html";
}

async function DeleteItem(cartItem) {
    // Parse item for name
    let nameWrapper = cartItem.childNodes[1];
    let name = nameWrapper.childNodes[0].innerText;

    // Get id of item
    let itemInfo = await FetchProductByName(name);

    // Get cart
    let currentCart = JSON.parse(sessionStorage.getItem('cart'));

    // Remove item from cart
    for (let i = 0; i < currentCart.length; i++) {
        if (currentCart[i].id == itemInfo.product_id) {
            currentCart.splice(i, 1);
        }
    }

    // Update session storage
    sessionStorage.setItem('cart', JSON.stringify(currentCart));

    // Refresh cart
    let cartItemsList = document.getElementById('cart-item-list');
    cartItemsList.innerHTML = "";
    PopulateCart();
}