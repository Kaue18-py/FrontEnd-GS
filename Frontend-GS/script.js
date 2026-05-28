const canvas = document.getElementById("stars-canvas");
const ctx = canvas.getContext("2d");

let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars() {
  stars = [];

  const amount = Math.floor(
    (canvas.width * canvas.height) / 5000
  );

  for (let i = 0; i < amount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
      speed: Math.random() * 0.002
    });
  }
}

function renderStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const time = Date.now();

  stars.forEach((star) => {
    const opacity =
      0.3 +
      0.5 *
        Math.abs(
          Math.sin(time * star.speed + star.alpha)
        );

    ctx.beginPath();

    ctx.arc(
      star.x,
      star.y,
      star.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = `rgba(255,255,255,${opacity})`;

    ctx.fill();
  });

  requestAnimationFrame(renderStars);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createStars();
});

resizeCanvas();
createStars();
renderStars();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

const reveals = document.querySelectorAll(".reveal");

reveals.forEach((item) => {
  observer.observe(item);
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
});