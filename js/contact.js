export function initContact() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    const fields = {
        name: form.querySelector("#name"),
        email: form.querySelector("#email"),
        phone: form.querySelector("#phone"),
        program: form.querySelector("#program")
    };

    const fieldNames = {
        name: "name",
        email: "email",
        phone: "phone",
        program: "program"
    };

    Object.entries(fields).forEach(([key, field]) => {
        if (!field) return;
        field.required = true;
        field.name = fieldNames[key];
        if (key === "name") field.autocomplete = "name";
        if (key === "email") field.autocomplete = "email";
        if (key === "phone") field.autocomplete = "tel";
    });

    const message = form.querySelector("#message");
    if (message) message.name = "message";

    let status = form.querySelector(".form-status");
    if (!status) {
        status = document.createElement("p");
        status.className = "form-status";
        status.setAttribute("role", "status");
        status.setAttribute("aria-live", "polite");
        status.hidden = true;
        const submitButton = form.querySelector('.submit-button');
        if (submitButton) form.insertBefore(status, submitButton);
        else form.appendChild(status);
    }

    Object.values(fields).forEach(field => {
        if (!field) return;
        field.addEventListener("input", () => {
            field.setCustomValidity("");
            status.hidden = true;
        });
        field.addEventListener("change", () => {
            field.setCustomValidity("");
            status.hidden = true;
        });
    });

    form.addEventListener("submit", event => {
        event.preventDefault();
        status.hidden = true;
                
        const phone = fields.phone;

        if (phone) {
            phone.setCustomValidity("");

            const mobilePattern = /^[6-9]\d{9}$/;

            if (!mobilePattern.test(phone.value.trim())) {
                phone.setCustomValidity(
                    "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9."
                );
            }
        }
        
        if (!form.reportValidity()) return;

        const selectedPlan = form.querySelector('[name="membershipPlan"]')?.value;
        status.textContent = selectedPlan
            ? `Your details are valid and your selected plan is ${selectedPlan}. This demo form is not connected to a messaging service, so your message has not been sent.`
            : "Your details are valid. This demo form is not connected to a messaging service, so your message has not been sent.";
        status.hidden = false;
        status.classList.add("form-status--notice");
    });
}
