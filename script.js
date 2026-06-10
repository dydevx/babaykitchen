const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");
const footerInner = document.querySelector(".footer-inner");
const announcementModal = document.querySelector("[data-announcement-modal]");
const announcementCard = announcementModal?.querySelector(".announcement-card");
const announcementCloseButtons = announcementModal
  ? Array.from(announcementModal.querySelectorAll("[data-announcement-close]"))
  : [];
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (window.lucide) {
  window.lucide.createIcons();
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (footerInner) {
  footerInner.innerHTML = "<p>&copy; 2026 BA BAY BEP</p><p>Gestaltet von Hoang Caster.</p>";
}

function openAnnouncement() {
  if (!announcementModal) {
    return;
  }

  announcementModal.hidden = false;
  document.body.classList.add("announcement-open");
  announcementCard?.focus();
}

function closeAnnouncement() {
  if (!announcementModal || announcementModal.hidden) {
    return;
  }

  announcementModal.hidden = true;
  document.body.classList.remove("announcement-open");
}

function closeNav() {
  document.body.classList.remove("nav-open");
  nav?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
}

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  document.body.classList.toggle("nav-open", !isOpen);
  nav?.classList.toggle("is-open", !isOpen);
  navToggle.setAttribute("aria-expanded", String(!isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeNav);
});

announcementCloseButtons.forEach((button) => {
  button.addEventListener("click", closeAnnouncement);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAnnouncement();
    closeNav();
  }
});

window.addEventListener("load", openAnnouncement);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: `-${header?.offsetHeight || 74}px 0px -62% 0px`,
    threshold: 0.08,
  },
);

sections.forEach((section) => observer.observe(section));
