
const loginForm = document.querySelector("#login-form");
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const loginMessage = document.querySelector("#login-message");
const loginButton = loginForm.querySelector('button[type="submit"]');

loginForm.addEventListener("submit", event => {
    event.preventDefault();

    loginMessage.textContent = "";

    if (!loginForm.checkValidity()) {
        loginForm.reportValidity();
        return;
    }

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    if (!email || !password) {
        loginMessage.textContent = "Please enter your email and password.";
        return;
    }

    loginButton.disabled = true;
    loginButton.textContent = "Checking...";

    loginMessage.textContent =
        "Login is not connected yet. Account authentication will be enabled when the backend is configured.";

    loginButton.disabled = false;
    loginButton.textContent = "Sign In";
});
