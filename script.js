// Flag that JavaScript is running, so the CSS can safely hide
// elements that are waiting to be revealed by scrolling.
document.documentElement.classList.add("js");

const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#navigation");

// Mobile navigation: the menu starts hidden on small screens.
function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "Menu +";
  navigation.classList.add("hidden");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.textContent = isOpen ? "Menu +" : "Close -";
  navigation.classList.toggle("hidden", isOpen);
});

navigation.addEventListener("click", (event) => {
  const link = event.target.closest("a");

  if (!link) {
    return;
  }

  closeMenu();

  // Move keyboard focus to the destination without interrupting anchor scrolling.
  const target = document.querySelector(link.getAttribute("href"));
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuToggle.focus();
  }
});

// Leaving the mobile breakpoint should never leave the menu stuck open.
window.matchMedia("(min-width: 768px)").addEventListener("change", closeMenu);

// Scroll reveal: fade in anything marked class="reveal" as it appears.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Scroll progress bar: shows how far down the page you are.
const progressBar = document.querySelector("#scroll-progress");

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;

  progressBar.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
}

updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);

// Portfolio printing
document.querySelector("#print-portfolio").addEventListener("click", () => {
  window.print();
});

// Footer copyright year
document.querySelector("#year").textContent = new Date().getFullYear();