
export function initNavbar() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navbar = document.querySelector(".navbar");

    if (!menuToggle || !navLinks || !navbar) {
        console.error("Navbar elements not found. Check the HTML classes.");
        return;
    }

    function closeMenu() {
        navLinks.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    function openMenu() {
        navLinks.classList.add("show");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
    }

    function scrollToSection(section) {
        if (!section) return;

        const navbarHeight = navbar.getBoundingClientRect().height;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const targetPosition = sectionTop - navbarHeight - 10;

        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: "smooth"
        });
    }

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();

        if (navLinks.classList.contains("show")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            if (href === "#membership") {
                event.preventDefault();
                closeMenu();
                scrollToSection(document.querySelector(".membership-section"));
                return;
            }

            closeMenu();
        });
    });

    document.addEventListener("click", (event) => {
        if (
            navLinks.classList.contains("show") &&
            !navbar.contains(event.target)
        ) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
}
