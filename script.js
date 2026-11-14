// Interações leves do portfólio
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
    });
  });
}

// Revela os blocos conforme entram na tela.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Ano automático no rodapé.
const year = document.querySelector("#current-year");
if (year) year.textContent = new Date().getFullYear();

// Botão de voltar ao topo.
const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  }, { passive: true });
}

// Marca o link da seção atualmente visível.
const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

// Objetivo profissional explícito e download do currículo.
const heroDescription = document.querySelector(".hero-description");
if (heroDescription) {
  const objective = document.createElement("p");
  objective.className = "hero-kicker hero-objective";
  objective.textContent = "Objetivo: oportunidade de Estágio ou Desenvolvedor Backend Java Júnior.";
  heroDescription.insertAdjacentElement("afterend", objective);
}

const heroActions = document.querySelector(".hero-actions");
if (heroActions) {
  const resumeLink = document.createElement("a");
  resumeLink.className = "button button-ghost";
  resumeLink.href = "./curriculo-lucas-gomes-araujo.pdf";
  resumeLink.download = "Lucas_Gomes_Araujo_Desenvolvedor_Backend_Java.pdf";
  resumeLink.textContent = "Baixar currículo PDF ↓";
  heroActions.appendChild(resumeLink);
}
