import { LoadAppropriateButton } from "../components/accountButton.js";
import { FetchProductById } from "../database/products.js";

(function () {
    LoadAppropriateButton();
    PopulateFormWithUserData();
    PopulateCountySelect();
    PopulateCartItems();

}())

function PopulateFormWithUserData() {
    // Get user details
    let loggedInUserId = JSON.parse(sessionStorage.getItem('signedInUser'));
    let users = JSON.parse(localStorage.getItem('users'));
    let loggedInUserDetails;
    for (let i = 0; i < users.length; i++) {
        if (users[i].uid == loggedInUserId) {
            loggedInUserDetails = users[i];
        }
    }

    // Populate inputs
    document.getElementById('firstName').value = loggedInUserDetails.first_name;
    document.getElementById('lastName').value = loggedInUserDetails.last_name;
    document.getElementById('email').value = loggedInUserDetails.email;
    document.getElementById('address1').value = loggedInUserDetails.address_line_1;
    document.getElementById('address2').value = loggedInUserDetails.address_line_2;
    document.getElementById('city').value = loggedInUserDetails.city;
    document.getElementById('eircode').value = loggedInUserDetails.eircode;

    document.getElementById('cc-name').value = loggedInUserDetails.name_on_card;
    document.getElementById('cc-number').value = loggedInUserDetails.card_number;
    document.getElementById('cc-expiration').value = loggedInUserDetails.expiration_date;
    document.getElementById('cc-cvv').value = loggedInUserDetails.security_code;
}

function PopulateCountySelect() {
    // Get user details
    let loggedInUserId = JSON.parse(sessionStorage.getItem('signedInUser'));
    let users = JSON.parse(localStorage.getItem('users'));
    let loggedInUserDetails;
    for (let i = 0; i < users.length; i++) {
        if (users[i].uid == loggedInUserId) {
            loggedInUserDetails = users[i];
        }
    }

    // List of counties
    const CountyOptions = [
        "Please select a county",
        "Antrim",
        "Armagh",
        "Carlow",
        "Cavan",
        "Clare",
        "Cork",
        "Derry",
        "Donegal",
        "Down",
        "Dublin",
        "Fermanagh",
        "Galway",
        "Kerry",
        "Kildare",
        "Kilkenny",
        "Laois",
        "Leitrim",
        "Limerick",
        "Longford",
        "Louth",
        "Mayo",
        "Monaghan",
        "Offaly",
        "Roscommon",
        "Sligo",
        "Tipperary",
        "Tyrone",
        "Waterford",
        "Westmeath",
        "Wexford",
        "Wicklow"
    ]

    // Html elements
    let countySelect = document.getElementById("county");

    // Append options to select
    for (let i = 0; i < CountyOptions.length; i++) {
        let newOption = document.createElement('option');
        newOption.innerText = CountyOptions[i];

        if (i === 0) {
            newOption.value = "placeholder";
        } else {
            newOption.value = CountyOptions[i];

            if (loggedInUserDetails.county == newOption.value) {
                newOption.setAttribute('selected', true);
            }
        }

        countySelect.appendChild(newOption);
    }
}

async function PopulateCartItems() {
    // Html elements
    let cartList = document.getElementById('cart');

    // Get cart items
    let cart = JSON.parse(sessionStorage.getItem('cart'));

    // Display cart items
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        // Get product information
        let productInformation = await FetchProductById(cart[i].id);

        // Calcualte product price and add to total
        let productPrice = cart[i].quantity * productInformation.price;
        totalPrice += productPrice;

        // Create display elements
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');

        let nameWrapper = document.createElement('div');

        let productName = document.createElement('h6');
        productName.classList.add('my-0');
        productName.innerText = `${productInformation.product_name} (${cart[i].quantity})`;

        nameWrapper.appendChild(productName);

        let price = document.createElement('span');
        price.classList.add('text-body-secondary');
        price.innerText = `€${productPrice.toFixed(2)}`

        listItem.appendChild(nameWrapper);
        listItem.appendChild(price);

        cartList.appendChild(listItem);
    }

    cartList.innerHTML += `<li class="list-group-item d-flex justify-content-between">
    <span>Total</span>
    <strong>€${totalPrice.toFixed(2)}</strong>
  </li>`;
}