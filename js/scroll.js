export function initScroll() {
    const backToTop = document.createElement("button");
    backToTop.type = "button";
    backToTop.className = "back-to-top";
    backToTop.setAttribute("aria-label", "Back to top");
    backToTop.title = "Back to top";
    backToTop.innerHTML = '<span aria-hidden="true">↑</span>';
    document.body.appendChild(backToTop);

    const updateVisibility = () => {
        backToTop.classList.toggle("is-visible", window.scrollY > 400);
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth"
        });
    });
}
