const root = document.documentElement;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const nav = document.querySelector("[data-nav]");
const toast = document.querySelector("[data-toast]");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
}

const closeMenu = () => {
  document.body.classList.remove("nav-open");
  menuToggle?.setAttribute("aria-label", "打开导航");
};

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 12);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeMenu();
  }
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.getAttribute("data-copy") ?? "";
    try {
      await navigator.clipboard.writeText(text);
      toast?.classList.add("show");
      window.setTimeout(() => toast?.classList.remove("show"), 1800);
    } catch {
      window.prompt("复制这段邮箱：", text);
    }
  });
});

const filterButtons = [...document.querySelectorAll("[data-filter]")];
const projectCards = [...document.querySelectorAll("[data-category]")];

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    projectCards.forEach((card) => {
      const categories = card.getAttribute("data-category")?.split(" ") ?? [];
      card.classList.toggle("hidden", filter !== "all" && !categories.includes(filter));
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    const id = visible.target.getAttribute("id");
    if (!id) return;

    document.querySelectorAll(".nav a").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  },
  {
    rootMargin: "-30% 0px -55% 0px",
    threshold: [0.1, 0.3, 0.6],
  },
);

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
