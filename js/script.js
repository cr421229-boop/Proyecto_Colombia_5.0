
let currentLang = 'es';


const glossaryData = [
  
  { en: "Digital Monetization", es: "Monetización Digital", def_es: "Proceso de generar ingresos a través de plataformas digitales y contenido en línea.", def_en: "Process of generating revenue through digital platforms and online content." },
  { en: "Attention Economy", es: "Economía de la Atención", def_es: "Modelo económico en el que la atención humana es el recurso escaso y valioso que las plataformas compiten por captar.", def_en: "Economic model in which human attention is the scarce and valuable resource that platforms compete to capture." },
  { en: "Algorithm & Viralization", es: "Algoritmo y Viralización", def_es: "Conjunto de reglas usadas por plataformas digitales para determinar qué contenido se muestra y amplifica masivamente.", def_en: "Set of rules used by digital platforms to determine which content is shown and massively amplified." },
  { en: "GDP Impact", es: "Impacto en el PIB", def_es: "Contribución de la economía de creadores de contenido al Producto Interno Bruto de un país.", def_en: "Contribution of the content creator economy to a country's Gross Domestic Product." },
  { en: "Blockchain (USDT)", es: "Cadena de Bloques (USDT)", def_es: "Tecnología de registro distribuido usada para pagos en criptomonedas como USDT en transmisiones en vivo.", def_en: "Distributed ledger technology used for cryptocurrency payments such as USDT in live streaming." },
  { en: "Influencer Marketing", es: "Marketing de Influenciadores", def_es: "Estrategia publicitaria que utiliza creadores de contenido con audiencias amplias para promover productos o servicios.", def_en: "Advertising strategy that uses content creators with large audiences to promote products or services." },
  { en: "Social Responsibility", es: "Responsabilidad Social", def_es: "Obligación ética de los creadores y plataformas de considerar el impacto de su contenido en la sociedad.", def_en: "Ethical obligation of creators and platforms to consider the impact of their content on society." },
  { en: "Multichannel Formats", es: "Formatos Multicanal", def_es: "Estrategia de distribución de contenido en múltiples plataformas digitales de manera simultánea.", def_en: "Content distribution strategy across multiple digital platforms simultaneously." },
  { en: "Content Regulation", es: "Regulación de Contenido", def_es: "Políticas y leyes que controlan el tipo de contenido permitido en plataformas digitales.", def_en: "Policies and laws that control the type of content allowed on digital platforms." },

  // Conferencia 2: El Síndrome de Peter Parker
  { en: "Artificial Intelligence", es: "Inteligencia Artificial", def_es: "Simulación de procesos de inteligencia humana por sistemas computacionales capaces de aprender y tomar decisiones.", def_en: "Simulation of human intelligence processes by computer systems capable of learning and making decisions." },
  { en: "Digital Transformation", es: "Transformación Digital", def_es: "Integración de tecnología digital en todas las áreas de una organización, cambiando su funcionamiento y propuesta de valor.", def_en: "Integration of digital technology into all areas of an organization, changing how it operates and delivers value." },
  { en: "Cognitive Dependency", es: "Dependencia Cognitiva", def_es: "Fenómeno por el cual las personas delegan funciones mentales como memoria y razonamiento a dispositivos digitales.", def_en: "Phenomenon whereby people delegate mental functions such as memory and reasoning to digital devices." },
  { en: "Deepfakes", es: "Falsificaciones Profundas", def_es: "Contenido audiovisual generado con IA que suplanta la identidad de personas reales de forma hiperrealista.", def_en: "AI-generated audiovisual content that hyperrealistically impersonates real people." },
  { en: "Cybersecurity", es: "Ciberseguridad", def_es: "Protección de sistemas informáticos, redes y datos frente a ataques, daños o accesos no autorizados.", def_en: "Protection of computer systems, networks, and data against attacks, damage, or unauthorized access." },
  { en: "Jailbreak (DAN Mode)", es: "Jailbreak (Modo DAN)", def_es: "Técnica de manipulación de sistemas de IA para eludir sus restricciones éticas y de seguridad.", def_en: "Technique to manipulate AI systems into bypassing their ethical and safety restrictions." },
  { en: "Technological Sovereignty", es: "Soberanía Tecnológica", def_es: "Capacidad de individuos y naciones para controlar y gestionar su propia infraestructura y datos digitales.", def_en: "Capacity of individuals and nations to control and manage their own digital infrastructure and data." },
  { en: "Ethical AI", es: "IA Ética", def_es: "Diseño y uso de sistemas de inteligencia artificial que respetan principios éticos, derechos humanos y valores sociales.", def_en: "Design and use of artificial intelligence systems that respect ethical principles, human rights, and social values." },
  { en: "Digital Literacy", es: "Alfabetización Digital", def_es: "Capacidad de utilizar tecnologías digitales de forma crítica, eficiente y responsable.", def_en: "Ability to use digital technologies critically, efficiently, and responsibly." },
];


function applyLanguage(lang) {
  currentLang = lang;

  document.querySelectorAll('[data-es]').forEach(el => {
    const text = lang === 'es' ? el.dataset.es : el.dataset.en;
    if (text) el.textContent = text;
  });

  const searchInput = document.getElementById('glossSearch');
  if (searchInput) {
    searchInput.placeholder = lang === 'es'
      ? searchInput.dataset.placeholderEs
      : searchInput.dataset.placeholderEn;
  }

  const btnEs = document.querySelector('.lang-global .lang-es');
  const btnEn = document.querySelector('.lang-global .lang-en');
  if (btnEs && btnEn) {
    btnEs.classList.toggle('active', lang === 'es');
    btnEn.classList.toggle('active', lang === 'en');
  }

  document.documentElement.lang = lang;

  const q = document.getElementById('glossSearch')?.value?.toLowerCase().trim() || '';
  renderGlossary(filterGlossary(q), lang);
}

document.getElementById('langToggle').addEventListener('click', () => {
  applyLanguage(currentLang === 'es' ? 'en' : 'es');
});


const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});


const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.conf-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});


const glossBody   = document.getElementById('glossBody');
const glossSearch = document.getElementById('glossSearch');

function filterGlossary(q) {
  if (!q) return glossaryData;
  return glossaryData.filter(item =>
    item.en.toLowerCase().includes(q) ||
    item.es.toLowerCase().includes(q) ||
    item.def_es.toLowerCase().includes(q) ||
    item.def_en.toLowerCase().includes(q)
  );
}

function renderGlossary(data, lang) {
  lang = lang || currentLang;
  glossBody.innerHTML = '';
  if (data.length === 0) {
    glossBody.innerHTML = `<tr><td colspan="3" style="text-align:center;padding:32px;color:var(--text-light);">${lang === 'es' ? 'No se encontraron términos.' : 'No terms found.'}</td></tr>`;
    return;
  }
  data.forEach(item => {
    const def = lang === 'es' ? item.def_es : item.def_en;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${item.en}</td><td>${item.es}</td><td>${def}</td>`;
    glossBody.appendChild(tr);
  });
}

renderGlossary(glossaryData, 'es');

glossSearch.addEventListener('input', () => {
  const q = glossSearch.value.toLowerCase().trim();
  renderGlossary(filterGlossary(q), currentLang);
});


const revealEls = document.querySelectorAll('.about-center, .conf-info, .conf-media, .ref-card, .gloss-table-wrap');
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

document.querySelector('.lang-global .lang-es').classList.add('active');