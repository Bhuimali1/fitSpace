import { initNavbar } from "./navbar.js";
import { initMembership } from "./membership.js";
import { initContact } from "./contact.js";
import { initScroll } from "./scroll.js";
import { initAnimations } from "./animation.js";

function initFitspace() {
    initNavbar();
    initMembership();
    initContact();
    initScroll();
    initAnimations();

    const year = document.querySelector("#current-year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFitspace, { once: true });
} else {
    initFitspace();
}
