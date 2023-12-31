import { DisplayToast } from "../components/toast.js";

(function () {
    GenerateDummyUser();

    // Event listeners
    document.getElementById('login-form').addEventListener('submit', SignIn, false);
}())

async function SignIn() {
    // Html elements
    let enteredEmail = document.getElementById('email').value;
    let enteredPassword = document.getElementById('password').value;

    // Get account data
    let users = JSON.parse(localStorage.getItem('users'));

    let userFound = false;

    // Check all users for a matching email and passoword
    users.map((user) => {
        if ((enteredEmail === user.email) && (enteredPassword === user.password)) {
            sessionStorage.setItem('loggedIn', true);
            sessionStorage.setItem('signedInUser', user.uid);
            window.location.href = "index.html";
            userFound = true;
        }
    });

    // Let user know if something went wrong
    if (userFound === false) {
        sessionStorage.setItem('loggedIn', false);
        DisplayToast('Could not find user with entered credentials', 'e');
    }

    event.preventDefault();
}

function GenerateDummyUser() {
    let user = [{
        "uid": 1,
        "email": "johndoe@email.com",
        "password": "test",
        "first_name": "John",
        "last_name": "Doe",
        "dob": "1965-05-22",
        "address_line_1": "Riverside Cottage",
        "address_line_2": "",
        "city": "Sligo",
        "county": "Sligo",
        "eircode": "F91V8D7",
        "card_number": "",
        "expiration_date": "",
        "security_code": "",
        "name_on_card": ""
    }];

    localStorage.setItem('users', JSON.stringify(user));
}