export function LoadAppropriateButton() {
    let isUserLoggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));

    RemoveExistingButton();

    if ((isUserLoggedIn === true)) {
        CreateAccountManagerButton();
    } else {
        CreateSignInButton();
    }
}

function CreateSignInButton() {
    // Html elements
    let container = document.getElementById('header-actions-container');

    // Create button
    let button = document.createElement('button');
    button.classList.add('btn');
    button.id = "sign-in-button";
    button.innerText = "Sign In";
    button.onclick = function () { SignInUser() };

    // Append button to page
    container.appendChild(button);
}

function CreateAccountManagerButton() {
    // Get logged in user info
    let loggedInUserId = JSON.parse(sessionStorage.getItem('signedInUser'));
    let users = JSON.parse(localStorage.getItem('users'));
    let loggedInUserDetails;
    for (let i = 0; i < users.length; i++) {
        if (users[i].uid == loggedInUserId) {
            loggedInUserDetails = users[i];
        }
    }

    // Html elements
    let container = document.getElementById('header-actions-container');

    // Create button
    let button = document.createElement('button');
    button.classList.add('btn', 'nav-item', 'dropdown');
    button.id = "account-button";

    let toggler = document.createElement('a');
    toggler.classList.add('nav-link', 'dropdown-toggle');
    toggler.role = 'button';
    toggler.innerText = loggedInUserDetails.email;
    toggler.setAttribute('data-bs-toggle', 'dropdown');

    let dropdownMenu = document.createElement('ul');
    dropdownMenu.classList.add('dropdown-menu');

    let accountManagerButton = '<li><a class="dropdown-item" href="./account-settings.html">Account</a></li>';

    let signOutButtonWrapper = document.createElement('div');
    let signOutButton = document.createElement('a');
    signOutButton.classList.add('dropdown-item');
    signOutButton.id = 'sign-out-button';
    signOutButton.onclick = function () { SignOut() }
    signOutButton.innerText = "Sign Out";

    signOutButtonWrapper.appendChild(signOutButton);

    dropdownMenu.innerHTML += accountManagerButton;
    dropdownMenu.appendChild(signOutButtonWrapper);

    button.appendChild(toggler);
    button.append(dropdownMenu);

    // Append button to page
    container.appendChild(button);
}

function SignOut() {
    sessionStorage.setItem('loggedIn', false);
    window.location.href = "./../html/";
}

function SignInUser() {
    window.location.href = "./../html/sign-in.html";
}

function RemoveExistingButton() {
    let signInButton = document.getElementById('sign-in-button');
    let accountManagerButton = document.getElementById('account-button');

    if (signInButton !== null) {
        signInButton.parentElement.removeChild('sign-in-button');
    } else if (accountManagerButton !== null) {
        accountManagerButton.parentElement.removeChild(accountManagerButton);
    }
}