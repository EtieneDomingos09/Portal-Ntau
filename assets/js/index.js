// Mobile Menu Toggle
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav");
  mobileNav.classList.toggle("active");
}

function closeMobileMenu() {
  const mobileNav = document.getElementById("mobileNav");
  mobileNav.classList.remove("active");
}

// Slideshow automático
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");
const indicators = document.querySelectorAll(".indicator");
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  indicators.forEach((indicator) => indicator.classList.remove("active"));

  slides[index].classList.add("active");
  indicators[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

// Auto slideshow
setInterval(nextSlide, 5000);

// Click indicators
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Header scroll effect
function handleScroll() {
  const header = document.getElementById("header");
  const heroSection = document.querySelector(".hero");
  const heroHeight = heroSection.offsetHeight;
  const scrollY = window.scrollY;

  if (scrollY > heroHeight * 0.8) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleScroll);

// Smooth scrolling para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-item h3");
  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace(/\D/g, ""));
    const suffix = counter.textContent.replace(/[0-9]/g, "");
    let current = 0;
    const increment = target / 50;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    };

    updateCounter();
  });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".stats");
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statsObserver.observe(statsSection);
}

// FAQ Toggle
function toggleFaq(button) {
  const faqItem = button.parentElement;
  const isActive = faqItem.classList.contains("active");

  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active");
  });

  if (!isActive) {
    faqItem.classList.add("active");
  }
}

// Form submission
function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get("name");
  const phone = formData.get("phone");
  const service = formData.get("service");

  const message = `Olá! Meu nome é ${name}.

Gostaria de solicitar informações sobre: ${service}

Telefone para contato: ${phone}

Mensagem: ${formData.get("message")}`;

  const whatsappUrl = `https://wa.me/244999999999?text=${encodeURIComponent(
    message
  )}`;

  alert("Redirecionando para WhatsApp...");
  window.open(whatsappUrl, "_blank");

  event.target.reset();
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const mobileNav = document.getElementById("mobileNav");
  const mobileBtn = document.querySelector(".mobile-menu-btn");

  if (!mobileNav.contains(e.target) && !mobileBtn.contains(e.target)) {
    mobileNav.classList.remove("active");
  }
});


//Cards dos planos
const plansData = {
  // Planos diários - baseados no flyer
  diario: [
    {
      name: "Plano MEGA",
      download: "1 Mbps",
      upload: "1 Mbps",
      price: "500 KZ",
      description: "Ideal para uso básico diário, navegação web e redes sociais.",
      popular: false
    },
    {
      name: "Plano ULTRA",
      download: "3 Mbps",
      upload: "1 Mbps", 
      price: "1.000 KZ",
      description: "Perfeito para streaming e downloads mais rápidos no dia a dia.",
      popular: true // Marcamos como popular
    }
  ],
  
  // Planos semanais - baseados no flyer
  semanal: [
    {
      name: "Plano START",
      download: "2 Mbps",
      upload: "1 Mbps",
      price: "4.000 KZ",
      description: "Ideal para trabalho remoto e estudos durante a semana.",
      popular: false
    },
    {
      name: "Plano FIBER",
      download: "3 Mbps",
      upload: "1 Mbps",
      price: "5.000 KZ",
      description: "Excelente para famílias pequenas e home office.",
      popular: true
    },
    {
      name: "Plano TURBO",
      download: "5 Mbps", 
      upload: "1 Mbps",
      price: "7.000 KZ",
      description: "Para múltiplas atividades simultâneas e gaming.",
      popular: false
    },
    {
      name: "Plano MEGA",
      download: "8 Mbps",
      upload: "2 Mbps", 
      price: "10.000 KZ",
      description: "Velocidade superior para streaming HD e trabalho profissional.",
      popular: false
    },
    {
      name: "Plano ULTRA",
      download: "12 Mbps",
      upload: "2 Mbps",
      price: "13.000 KZ", 
      description: "Máxima velocidade para uso intensivo e empresarial.",
      popular: false
    }
  ],
  
  // Planos mensais - baseados no flyer
  mensal: [
    {
      name: "Plano START",
      download: "2 Mbps",
      upload: "1 Mbps",
      price: "12.000 KZ",
      description: "Perfeito para tarefas básicas como navegação, e-mails e redes sociais.",
      popular: false
    },
    {
      name: "Plano FIBER", 
      download: "3 Mbps",
      upload: "1 Mbps",
      price: "19.000 KZ",
      description: "Oferece velocidade adequada para streaming de vídeos em qualidade padrão.",
      popular: true
    },
    {
      name: "Plano TURBO",
      download: "5 Mbps",
      upload: "1 Mbps", 
      price: "26.000 KZ",
      description: "Recomendado para famílias e pequenos escritórios com múltiplas atividades.",
      popular: false
    },
    {
      name: "Plano MEGA",
      download: "8 Mbps",
      upload: "2 Mbps",
      price: "35.000 KZ", 
      description: "Adequado para streaming HD, jogos online e transferência de arquivos grandes.",
      popular: false
    },
    {
      name: "Plano ULTRA",
      download: "12 Mbps",
      upload: "2 Mbps",
      price: "45.000 KZ",
      description: "A melhor opção para uso intensivo, teletrabalho e videoconferências.",
      popular: false
    }
  ]
};

// Variável para controlar o tipo atual de plano
let currentPlanType = 'mensal'; 


// Função para criar um card de plano individual
// Passo 4: Adicionar estas funções ao seu assets/js/index.js

// Função para criar um card de plano individual - estilo mais organizado
function createPlanCard(plan, index) {
  return `
    <div class="plan-card ${plan.popular ? 'popular' : ''} showing">
      <div class="plan-name">${plan.name}</div>
      <div class="plan-speed">${plan.download.replace(' Mbps', '')} Mbps</div>
      <div class="plan-price">${plan.price}</div>
      
      <ul class="plan-features">
        <li>Velocidade de download: <strong>${plan.download}</strong></li>
        <li>Velocidade de upload: <strong>${plan.upload}</strong></li>
        <li>${plan.description}</li>
      </ul>
      
      <a href="#contact" class="btn btn-primary">Contratar Agora →</a>
    </div>
  `;
}

// Função para renderizar todos os planos de um tipo específico
function renderPlans(planType) {
  const plansGrid = document.getElementById('dynamicPlansGrid');
  const plans = plansData[planType];
  
  // Verifica se existem planos para o tipo solicitado
  if (!plans || plans.length === 0) {
    plansGrid.innerHTML = '<div class="loading-plans">Nenhum plano disponível para este período.</div>';
    return;
  }
  
  // Gera o HTML de todos os cards
  const cardsHTML = plans.map((plan, index) => createPlanCard(plan, index)).join('');
  
  // Insere os cards no DOM
  plansGrid.innerHTML = cardsHTML;
  
  console.log(`✅ Renderizados ${plans.length} planos do tipo: ${planType}`);
}

// Função utilitária para debug (opcional)
function debugPlansData() {
  console.log('Dados dos planos:', plansData);
  console.log('Tipo atual:', currentPlanType);
}

// Inicialização: renderizar planos mensais por padrão
function initializePlans() {
  console.log('Inicializando sistema de planos dinâmicos...');
  renderPlans(currentPlanType);
}

// função principal de troca de filtros

function switchPlanType(newType) {
  // Evita executar se já é o tipo atual
  if (newType === currentPlanType) {
    console.log(`Tipo ${newType} já está ativo`);
    return;
  }
  
  console.log(`Trocando de ${currentPlanType} para ${newType}`);
  
  // ETAPA 1: Atualizar botões ativos
  updateFilterButtons(newType);
  
  // ETAPA 2: Animar saída dos cards atuais
  animateCardsOut(() => {
    // ETAPA 3: Atualizar tipo atual
    currentPlanType = newType;
    
    // ETAPA 4: Renderizar novos planos
    renderPlans(currentPlanType);
  });
}

// Função auxiliar para atualizar os botões
function updateFilterButtons(activeType) {
  // Remove classe active de todos os botões
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Adiciona classe active ao botão correto
  const activeButton = document.querySelector(`[data-type="${activeType}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

// Função para animar a saída dos cards
function animateCardsOut(callback) {
  const currentCards = document.querySelectorAll('.plan-card');
  
  if (currentCards.length === 0) {
    // Se não há cards, executa callback imediatamente
    callback();
    return;
  }
  
  // Aplica animação de saída escalonada
  currentCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('hiding');
    }, index * 50); // 50ms de delay entre cada card
  });
  
  // Executa callback após todas as animações terminarem
  const totalAnimationTime = (currentCards.length * 50) + 400; // +400ms para a animação CSS
  setTimeout(callback, totalAnimationTime);
}

// Função melhorada de renderização com loading
function renderPlansWithLoading(planType) {
  const plansGrid = document.getElementById('dynamicPlansGrid');
  
  // Mostra loading
  plansGrid.innerHTML = '<div class="loading-plans">Carregando planos...</div>';
  
  // Simula um pequeno delay para UX mais suave
  setTimeout(() => {
    renderPlans(planType);
  }, 300);
}

// função principal
function switchPlanTypeImproved(newType) {
  if (newType === currentPlanType) return;
  
  console.log(`Mudando para planos ${newType}`);
  
  // Desabilita botões temporariamente para evitar cliques múltiplos
  disableFilterButtons();
  
  updateFilterButtons(newType);
  
  animateCardsOut(() => {
    currentPlanType = newType;
    renderPlansWithLoading(currentPlanType);
    
    // Reabilita botões após renderização
    setTimeout(enableFilterButtons, 500);
  });
}

// Funções utilitárias para controle de botões
function disableFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.7';
  });
}

function enableFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.style.pointerEvents = 'auto';
    btn.style.opacity = '1';
  });
}


// Função de inicialização principal
function initializeDynamicPlans() {
  console.log('🚀 Inicializando sistema de planos dinâmicos...');
  
  // Verifica se os elementos necessários existem
  const plansGrid = document.getElementById('dynamicPlansGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  if (!plansGrid) {
    console.error('❌ Elemento #dynamicPlansGrid não encontrado!');
    return;
  }
  
  if (filterButtons.length === 0) {
    console.error('❌ Botões de filtro não encontrados!');
    return;
  }
  
  console.log('✅ Elementos encontrados, iniciando renderização...');
  
  // Renderiza os planos iniciais (mensal por padrão)
  renderPlans(currentPlanType);
  
  // Configura event listeners para os botões
  setupEventListeners();
  
  console.log('🎉 Sistema de planos dinâmicos inicializado com sucesso!');
}

// Configuração de event listeners
function setupEventListeners() {
  // Event listeners para botões de filtro
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const planType = this.getAttribute('data-type');
      switchPlanTypeImproved(planType);
    });
  });
  
  // Event listener para links de contratação (delegação de eventos)
  document.addEventListener('click', function(e) {
    if (e.target.closest('a[href="#contact"]')) {
      e.preventDefault();
      console.log('Redirecionando para seção de contato...');
      
      // Aqui você pode adicionar lógica de scroll suave se necessário
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' 
        });
      }
    }
  });
  
  // Event listener para keyboard navigation (acessibilidade)
  document.addEventListener('keydown', function(e) {
    if (e.target.classList.contains('filter-btn')) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.target.click();
      }
    }
  });
}

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
  // Pequeno delay para garantir que todos os estilos foram aplicados
  setTimeout(initializeDynamicPlans, 100);
});

// Fallback: inicializa quando a página carregar completamente
window.addEventListener('load', function() {
  // Verifica se já foi inicializado
  if (!document.getElementById('dynamicPlansGrid').innerHTML.includes('plan-card')) {
    console.log('🔄 Fallback: inicializando sistema de planos...');
    initializeDynamicPlans();
  }
});
