const instagramUrl = "https://www.instagram.com/panda.refrigeracao/";

const services = [
  {
    name: "Instalação de ar-condicionado",
    category: "instalacao",
    label: "Residencial",
    icon: "AR",
    tags: ["Split", "Acabamento", "Teste final"],
    desc: "Instalação com acabamento limpo e funcionamento correto."
  },
  {
    name: "Manutenção preventiva",
    category: "manutencao",
    label: "Rotina técnica",
    icon: "MT",
    tags: ["Revisão", "Desempenho", "Durabilidade"],
    desc: "Reduz falhas e ajuda a manter o equipamento em bom estado."
  },
  {
    name: "Limpeza técnica",
    category: "limpeza",
    label: "Higienização",
    icon: "LX",
    tags: ["Evaporadora", "Qualidade do ar", "Cuidado"],
    desc: "Melhora a higiene, a circulação e o desempenho do sistema."
  },
  {
    name: "Vácuo em sistema",
    category: "instalacao",
    label: "Procedimento técnico",
    icon: "VC",
    tags: ["Pressão", "Segurança", "Padrão técnico"],
    desc: "Procedimento importante para proteger e preservar o sistema."
  },
  {
    name: "Carga de gás e ajuste",
    category: "manutencao",
    label: "Corretiva",
    icon: "GS",
    tags: ["Diagnóstico", "Correção", "Rendimento"],
    desc: "Corrige perda de rendimento e melhora a refrigeração."
  },
  {
    name: "Refrigeração automotiva",
    category: "automotivo",
    label: "Veicular",
    icon: "AU",
    tags: ["Climatização", "Automotivo", "Atendimento especializado"],
    desc: "Atendimento para sistemas automotivos com foco em desempenho."
  }
];

const serviceGrid = document.getElementById("serviceGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const modal = document.getElementById("serviceModal");
const closeModal = document.getElementById("closeModal");
const modalLabel = document.getElementById("modalLabel");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTags = document.getElementById("modalTags");
const modalInstagram = document.getElementById("modalInstagram");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const revealItems = document.querySelectorAll(".reveal");

function renderServices(list) {
  serviceGrid.innerHTML = "";

  if (!list.length) {
    serviceGrid.innerHTML = `
      <p class="empty">Nenhum serviço foi encontrado nessa busca. Tente outro termo ou outra categoria.</p>
    `;
    return;
  }

  list.forEach((service) => {
    const card = document.createElement("article");
    card.className = "service-card";

    card.innerHTML = `
      <div class="service-top">
        <span class="service-icon">${service.icon}</span>
        <span class="service-badge">${service.label}</span>
      </div>
      <h3>${service.name}</h3>
      <p>${service.desc}</p>
      <div class="service-meta">
        ${service.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
      <div class="card-actions">
        <button class="btn details-btn" type="button">Ver detalhes</button>
        <a class="btn service-link" href="${instagramUrl}" target="_blank" rel="noreferrer">
          Solicitar
        </a>
      </div>
    `;

    card.querySelector(".details-btn").addEventListener("click", () => openModal(service));
    serviceGrid.appendChild(card);
  });
}

function filterServices() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = services.filter((service) => {
    const matchesSearch = [
      service.name,
      service.label,
      service.category,
      service.desc,
      ...service.tags
    ].some((field) => field.toLowerCase().includes(searchText));

    const matchesCategory =
      selectedCategory === "todos" || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderServices(filtered);
}

function openModal(service) {
  modalLabel.textContent = service.label;
  modalTitle.textContent = service.name;
  modalDesc.textContent = service.desc;
  modalTags.innerHTML = service.tags.map((tag) => `<span>${tag}</span>`).join("");
  modalInstagram.href = instagramUrl;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeServiceModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initReveal() {
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

closeModal.addEventListener("click", closeServiceModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeServiceModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("active")) {
    closeServiceModal();
  }
});

searchInput.addEventListener("input", filterServices);
categoryFilter.addEventListener("change", filterServices);

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

renderServices(services);
initReveal();
