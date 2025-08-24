// Cronometro
let tempoRestante = 10 * 60;
const tempoSpan = document.getElementById("tempo-restante");
const cronometro = setInterval(() => {
  tempoRestante--;
  const tempo = new Date(tempoRestante * 1000).toISOString().substr(11, 8);
  tempoSpan.textContent = tempo;
  if (tempoRestante <= 0) {
    tempoRestante = 10 * 60;
  }
}, 1000);

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // Salva os dados no localStorage
  localStorage.setItem("email", email);
  localStorage.setItem("senha", senha);

  // Redireciona para a página seguinte
  window.location.href = "scammado.html";
});

// Intersection Observer para animações
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.3 }
);

document
  .querySelectorAll(".animate, .animate-slide-left, .animate-slide-right")
  .forEach((el) => {
    observer.observe(el);
  });
