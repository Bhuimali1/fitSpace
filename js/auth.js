
const plans = {
    basic: { name: "Basic", price: 29 },
    standard: { name: "Standard", price: 49 },
    premium: { name: "Premium", price: 79 }
};

const params = new URLSearchParams(window.location.search);
const requestedPlan = params.get("plan")?.toLowerCase();

const registrationForm = document.querySelector("#registration-form");
const formMessage = document.querySelector("#form-message");
const planOptions = document.querySelectorAll(
    'input[name="membershipPlan"]'
);

function getSelectedPlan() {
    const selectedOption = document.querySelector(
        'input[name="membershipPlan"]:checked'
    );

    return selectedOption ? plans[selectedOption.value] : null;
}

function showMessage(message) {
    formMessage.textContent = message;
}

if (plans[requestedPlan]) {
    const matchingOption = document.querySelector(
        `input[name="membershipPlan"][value="${requestedPlan}"]`
    );

    if (matchingOption) {
        matchingOption.checked = true;
    }
}

planOptions.forEach(option => {
    option.addEventListener("change", () => {
        showMessage("");
    });
});

registrationForm.addEventListener("submit", event => {
    event.preventDefault();
    showMessage("");

    const selectedPlan = getSelectedPlan();

    if (!selectedPlan) {
        showMessage("Please select a membership plan before continuing.");

        document.querySelector(".plan-selector").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        return;
    }

    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirm-password").value;

    if (password !== confirmPassword) {
        showMessage("Your passwords do not match.");
        document.querySelector("#confirm-password").focus();
        return;
    }

    showMessage(
        `Your details are valid and your ${selectedPlan.name} plan is selected. Account creation and payment will be enabled when the backend is connected.`
    );
});
