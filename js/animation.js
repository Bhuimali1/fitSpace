export function initAnimations() {
    const revealTargets = document.querySelectorAll(
        ".programs-heading, .program-card, .membership-intro, .plan-card, .contact-image, .contact-info, .contact-form-wrapper"
    );

    if (!revealTargets.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        revealTargets.forEach(element => element.classList.add("is-revealed"));
        return;
    }

    const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
        } else {
            entry.target.classList.remove("is-revealed");
        }
    });
}, {
    threshold: 0.12,
    rootMargin: "0px 0px -35px 0px"
});

    revealTargets.forEach((element, index) => {
        element.classList.add("reveal-on-scroll");
        element.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 90}ms`);
        revealObserver.observe(element);
    });
}
