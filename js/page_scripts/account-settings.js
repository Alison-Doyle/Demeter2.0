import { LoadAppropriateButton } from "../components/accountButton.js";
import { ChangeCartDisplay, RedirectToCheckout } from "../components/cart.js";
import { DisplayToast } from "../components/toast.js";

(function () {
    LoadAppropriateButton();
    PopulateUserInfo();
    PopulateCountySelect();

    // Event listeners
    document.getElementById('cart-button').addEventListener('click', ChangeCartDisplay, false);
    document.getElementById('checkout-button').addEventListener('click', GoToChekcout, false);
    document.getElementById('close-cart-button').addEventListener('click', ChangeCartDisplay, false);
    document.getElementById('update-details-form').addEventListener('submit', UpdateSettings, false);
}())

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
    let countySelect = document.getElementById("countySelect");

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

function PopulateUserInfo() {
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
    // Personal details
    document.getElementById('first_name').value = loggedInUserDetails.first_name;
    document.getElementById('last_name').value = loggedInUserDetails.last_name;
    document.getElementById('date_of_birth').value = loggedInUserDetails.dob;

    // Address
    document.getElementById('address_line_1').value = loggedInUserDetails.address_line_1;
    document.getElementById('address_line_2').value = loggedInUserDetails.address_line_2;
    document.getElementById('city').value = loggedInUserDetails.city;
    document.getElementById('countySelect').value = loggedInUserDetails.county;
    document.getElementById('eircode').value = loggedInUserDetails.eircode;

    // Billing Information
    document.getElementById('card_number').value = loggedInUserDetails.card_number;
    document.getElementById('expiration_date').value = loggedInUserDetails.expiration_date;
    document.getElementById('security_code').value = loggedInUserDetails.security_code;
    document.getElementById('name_on_card').value = loggedInUserDetails.name_on_card;
}

function GoToChekcout() {
    // Validate items in cart and is user logged in to decide on action
    let cart = sessionStorage.getItem('cart');
    cart = JSON.parse(cart);

    let isLoggedIn = sessionStorage.getItem('loggedIn');

    if (cart.length === 0) {
        DisplayToast('No items in cart', 'e');
    } else if ((cart.length > 0) && (isLoggedIn !== true))
        window.location.href = "./../html/sign-in.html";
    else {
        RedirectToCheckout()
    }
}

function UpdateSettings() {
    // Get user details
    let loggedInUserId = JSON.parse(sessionStorage.getItem('signedInUser'));
    let users = JSON.parse(localStorage.getItem('users'));
    let loggedInUserDetails;
    let userIndex;
    for (let i = 0; i < users.length; i++) {
        if (users[i].uid == loggedInUserId) {
            loggedInUserDetails = users[i];
            userIndex = i;
        }
    }

    // Create updated user
    let updatedUser = {
        "uid": loggedInUserDetails.uid,
        "email": loggedInUserDetails.email,
        "password": loggedInUserDetails.password,
        "first_name": ValidateInput(loggedInUserDetails.first_name, document.getElementById('first_name').value),
        "last_name": ValidateInput(loggedInUserDetails.last_name, document.getElementById('last_name').value),
        "dob": ValidateInput(loggedInUserDetails.dob, document.getElementById('date_of_birth').value),
        "address_line_1": ValidateInput(loggedInUserDetails.address_line_1, document.getElementById('address_line_1').value),
        "address_line_2": ValidateInput(loggedInUserDetails.address_line_2, document.getElementById('address_line_2').value),
        "city": ValidateInput(loggedInUserDetails.city, document.getElementById('city').value),
        "county": ValidateInput(loggedInUserDetails.county, document.getElementById('countySelect').value),
        "eircode": ValidateInput(loggedInUserDetails.eircode, document.getElementById('eircode')),
        "card_number": ValidateInput(loggedInUserDetails.card_number, document.getElementById('card_number').value),
        "expiration_date": ValidateInput(loggedInUserDetails.expiration_date, document.getElementById('expiration_date').value),
        "security_code": ValidateInput(loggedInUserDetails.security_code, document.getElementById('security_code').value),
        "name_on_card": ValidateInput(loggedInUserDetails.name_on_card, document.getElementById('name_on_card').value)
    };

    console.log(document.getElementById('countySelect').value)

    // Append updated user to users array
    users.splice(userIndex, 1, updatedUser);

    // Update local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Stop page from resetting
    event.preventDefault();
}

function ValidateInput(existingValue, newValue) {
    let value = newValue == null ? existingValue : newValue;
    return value;
}