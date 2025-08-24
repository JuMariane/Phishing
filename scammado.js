function formatDateTime(date) {
  return date.toLocaleString();
}

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const emailAtual = localStorage.getItem("email");
const senhaAtual = localStorage.getItem("senha");
const now = new Date();

if (emailAtual && senhaAtual) {
  usuarios.push({
    email: emailAtual,
    senha: senhaAtual,
    horario: now.toISOString(),
  });
}

localStorage.setItem("usuarios", JSON.stringify(usuarios));

// Preenche dados individuais
document.getElementById("email").textContent = emailAtual || "Não informado";
document.getElementById("senha").textContent = "****";

const eyeMeu = document.getElementById("eye-meu");
let abertoMeu = false;
eyeMeu.addEventListener("click", () => {
  const spanSenha = document.getElementById("senha");
  spanSenha.textContent = abertoMeu ? "****" : senhaAtual;
  eyeMeu.textContent = abertoMeu ? "👁️" : "🙈";
  abertoMeu = !abertoMeu;
});

// PAGINAÇÃO
const rowsPerPage = 10;
let currentPage = 1;

function renderTable(page = 1) {
  const tbody = document.querySelector("#usuarios tbody");
  tbody.innerHTML = "";
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageItems = usuarios.slice(start, end);

  pageItems.forEach((u, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${start + index + 1}</td>
        <td>${u.email}</td>
        <td><span class="senha">****</span> <span class="eye-btn">👁️</span></td>
        <td>${formatDateTime(new Date(u.horario))}</td>
      `;
    tbody.appendChild(tr);
  });

  renderPagination();
  addEyeToggle();
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(usuarios.length / rowsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("page-btn");
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      renderTable(currentPage);
    });
    pagination.appendChild(btn);
  }
}

function addEyeToggle() {
  const tbody = document.querySelector("#usuarios tbody");
  tbody.querySelectorAll(".eye-btn").forEach((btn, i) => {
    let aberto = false;
    btn.addEventListener("click", () => {
      const span = tbody.querySelectorAll(".senha")[i];
      span.textContent = aberto
        ? "****"
        : usuarios[(currentPage - 1) * rowsPerPage + i].senha;
      btn.textContent = aberto ? "👁️" : "🙈";
      aberto = !aberto;
    });
  });
}

renderTable();

localStorage.removeItem("email");
localStorage.removeItem("senha");

// Simulação de usuários scammados
let numScammados = 57816000;
const display = document.getElementById("num-scammados");

function incrementarScammados() {
  numScammados += 1;
  display.textContent = numScammados.toLocaleString();
}

setInterval(incrementarScammados, 500);
