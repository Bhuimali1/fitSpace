
export function initHeroSlider() {
    const hero = document.querySelector(".hero");
    const slides = [...document.querySelectorAll(".hero-slides .hero-slide")];
    const content = document.querySelector(".hero-content");

    if (!hero || slides.length < 2 || !content) return;

    const label = content.querySelector(".hero-label");
    const heading = content.querySelector("h1");
    const paragraph = content.querySelector("p");
    const button = content.querySelector(".hero-btn");

    if (!label || !heading || !paragraph || !button) return;

        
    const slideData = [
        {
            label: "FITNESS / HEALTH / WELLNESS",
            heading: "Build Your<br><span>Stronger Self</span>",
            paragraph: "At FITSPACE, we believe a healthier you builds a happier tomorrow. Get fit, feel great and reach your goals with our expert trainers and personalized programs.",
            button: "Get Started",
            link: "#membership"
        },
        {
            label: "STRENGTH / ENDURANCE / POWER",
            heading: "Push Beyond<br><span>Your Limits</span>",
            paragraph: "Challenge yourself with every movement. Improve your endurance, build full-body strength and discover what you can achieve with focused training at FITSPACE.",
            button: "Explore Programs",
            link: "#membership"
        },
        {
            label: "STRENGTH / CONFIDENCE / PROGRESS",
            heading: "Stronger Body.<br><span>Stronger You.</span>",
            paragraph: "Every rep brings you closer to your goals. Build strength, improve your technique and create lasting fitness habits with training designed around your progress.",
            button: "Join FITSPACE",
            link: "#membership"
        },
        {
            label: "DISCIPLINE / FOCUS / RESULTS",
            heading: "Train With<br><span>Purpose</span>",
            paragraph: "Build consistency, sharpen your focus and take your training to the next level. FITSPACE helps you turn everyday effort into lasting progress.",
            button: "Start Training",
            link: "#membership"
        }
    ];


    const count = Math.min(slides.length, slideData.length);
    let current = 0;
    let timer;

    const dots = document.createElement("div");
    dots.className = "hero-slide-dots";
    dots.setAttribute("aria-label", "Choose hero slide");

    for (let i = 0; i < count; i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hero-slide-dot";
        dot.setAttribute("aria-label", `Show slide ${i + 1}`);

        dot.addEventListener("click", () => {
            showSlide(i);
            startTimer();
        });

        dots.appendChild(dot);
    }

    hero.appendChild(dots);

      function showSlide(index) {
          current = ((index % count) + count) % count;

          slides.forEach((slide, i) => {
              slide.classList.toggle("active", i === current);
          });

          [...dots.children].forEach((dot, i) => {
              dot.classList.toggle("active", i === current);
              dot.setAttribute("aria-current", i === current ? "true" : "false");
          });

          const data = slideData[current];

          content.classList.remove("hero-text-enter");
          void content.offsetWidth;

          label.textContent = data.label;
          heading.innerHTML = data.heading;
          
          paragraph.textContent = "";
            paragraph.classList.add("typewriter-text");

            let charIndex = 0;
            const textToType = data.paragraph;

            clearInterval(paragraph.typewriterTimer);

            paragraph.typewriterTimer = setInterval(() => {
                paragraph.textContent += textToType.charAt(charIndex);
                charIndex++;

                if (charIndex >= textToType.length) {
                    clearInterval(paragraph.typewriterTimer);
                }
            }, 22);
          
          button.href = data.link;

          const buttonLabel = [...button.childNodes].find(
              node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
          );

          if (buttonLabel) {
              buttonLabel.textContent = ` ${data.button} `;
          } else {
              button.textContent = data.button;
          }

          content.classList.add("hero-text-enter");
      }

    function startTimer() {
        clearInterval(timer);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        timer = setInterval(() => {
            showSlide((current + 1) % count);
        }, 6000);
    }

    showSlide(0);
    startTimer();
}
