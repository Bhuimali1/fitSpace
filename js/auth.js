
const plans = {
    basic: { name: "Basic", price: 29 },
    standard: { name: "Standard", price: 49 },
    premium: { name: "Premium", price: 79 }
};

const params = new URLSearchParams(window.location.search);
const selectedPlan = params.get("plan")?.toLowerCase();
const plan = plans[selectedPlan];

const planName = document.querySelector("#plan-name");
const planPrice = document.querySelector("#plan-price");
const registrationForm = document.querySelector("#registration-form");
const formMessage = document.querySelector("#form-message");

if (!plan) {
    planName.textContent = "Choose a Plan";
    planPrice.textContent = "—";
    registrationForm.querySelector('button[type="submit"]').disabled = true;
    formMessage.textContent = "Please select a membership plan first.";
} else {
    planName.textContent = plan.name;
    planPrice.textContent = `$${plan.price}`;
}

registrationForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!plan) return;

    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirm-password").value;

    if (password !== confirmPassword) {
        formMessage.textContent = "Your passwords do not match.";
        return;
    }

    formMessage.textContent =
        "The form is valid. Account creation will be enabled when authentication is connected.";
});


