document.addEventListener("DOMContentLoaded", () => {
  // 1. Cambio de Tema (Modo Oscuro / Claro)
  const themeToggle = document.getElementById("themeToggle");
  const themeLabel = document.getElementById("themeLabel");
  const bodyElement = document.body;

  themeToggle.addEventListener("click", () => {
    bodyElement.classList.toggle("light-mode");
    const isLight = bodyElement.classList.contains("light-mode");
    themeLabel.textContent = isLight ? "Modo oscuro" : "Modo claro";
    themeToggle.setAttribute("aria-pressed", !isLight);
  });

  // 2. Efecto de luz interactiva que sigue al ratón
  const mouseGlow = document.getElementById("mouseGlow");
  window.addEventListener("mousemove", (e) => {
    mouseGlow.style.left = `${e.clientX}px`;
    mouseGlow.style.top = `${e.clientY}px`;
  });

  // 3. Animación de elementos al hacer scroll (Scroll Reveal)
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observerInstance.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-on-scroll").forEach(el => {
    observer.observe(el);
  });

  // 4. Animación del círculo de puntaje principal (Score Ring)
  const ringFill = document.getElementById("ringFill");
  const scoreValueEl = document.getElementById("scoreValue");
  const targetScore = 83.9;
  const circumference = 502.6; // 2 * PI * r (r = 80)

  setTimeout(() => {
    const strokeOffset = circumference - (targetScore / 100) * circumference;
    ringFill.style.strokeDashoffset = strokeOffset;

    let currentScore = 0.0;
    const increment = targetScore / 40;
    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= targetScore) {
        currentScore = targetScore;
        clearInterval(timer);
      }
      scoreValueEl.textContent = currentScore.toFixed(1);
    }, 25);
  }, 400);

  // 5. Navegación interactiva superior (Píldoras activas)
  const navPills = document.querySelectorAll(".nav-pill");
  navPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const targetId = pill.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Marcar píldora activa según la posición de la página
  window.addEventListener("scroll", () => {
    let current = "";
    document.querySelectorAll("main section[id]").forEach(sec => {
      const sectionTop = sec.offsetTop;
      if (window.scrollY >= sectionTop - 140) {
        current = sec.getAttribute("id");
      }
    });

    navPills.forEach(pill => {
      pill.classList.remove("active");
      if (pill.getAttribute("data-target") === current) {
        pill.classList.add("active");
      }
    });
  });
  
});
