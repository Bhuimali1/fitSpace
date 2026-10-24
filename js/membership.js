export function initMembership() {
    const planButtons = document.querySelectorAll(".plan-button");
    const form = document.querySelector(".contact-form");
    if (!planButtons.length || !form) return;

    let selectedPlanInput = form.querySelector('[name="membershipPlan"]');
    if (!selectedPlanInput) {
        selectedPlanInput = document.createElement("input");
        selectedPlanInput.type = "hidden";
        selectedPlanInput.name = "membershipPlan";
        selectedPlanInput.id = "membership-plan";
        form.appendChild(selectedPlanInput);
    }

    let planNote = form.querySelector(".membership-selection-note");
    if (!planNote) {
        planNote = document.createElement("p");
        planNote.className = "membership-selection-note";
        planNote.setAttribute("aria-live", "polite");
        planNote.hidden = true;
        const submitButton = form.querySelector('.submit-button');
        if (submitButton) form.insertBefore(planNote, submitButton);
        else form.appendChild(planNote);
    }

    planButtons.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".plan-card");
            const planName = card?.querySelector("h3")?.textContent.trim();
            if (!planName) return;

            selectedPlanInput.value = planName;
            planNote.textContent = `${planName} membership selected. Complete the form to continue.`;
            planNote.hidden = false;
            form.dataset.selectedPlan = planName;
        });
    });
}
