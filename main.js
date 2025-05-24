// Datos para el slider
const slides = [
    {
        title: 'AI Code Assistant',
        description: 'Herramienta de pair programming potenciada por IA para aumentar la productividad del desarrollador.'
    },
    {
        title: 'Smart Data Pipeline',
        description: 'Sistema de ETL con detección automática de anomalías y optimización de consultas.'
    },
    {
        title: 'AI Testing Suite',
        description: 'Framework de pruebas automatizadas que utiliza IA para generar casos de prueba y detectar regresiones.'
    }
];

let currentSlide = 0;

// Función para actualizar el slider
function updateSlider() {
    const sliderContent = document.getElementById('slider-content');
    if (!sliderContent) return;
    
    const slide = slides[currentSlide];
    
    sliderContent.innerHTML = `
        <div class="p-6 bg-white rounded-lg shadow-lg transition-all duration-300">
            <h3 class="text-xl font-bold mb-3 text-slate-800">${slide.title}</h3>
            <p class="text-slate-600">${slide.description}</p>
        </div>
    `;
}

// Función para mostrar/ocultar flechas de navegación
function toggleNavigationArrows() {
    const nextButton = document.getElementById('next-slide');
    const prevButton = document.getElementById('prev-slide');
    
    if (slides.length <= 1) {
        nextButton?.classList.add('hidden');
        prevButton?.classList.add('hidden');
    } else {
        nextButton?.classList.remove('hidden');
        prevButton?.classList.remove('hidden');
    }
}

// Event listeners para los botones del slider
document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.getElementById('next-slide');
    const prevButton = document.getElementById('prev-slide');
    
    if (nextButton && slides.length > 1) {
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        });
    }
    
    if (prevButton && slides.length > 1) {
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        });
    }
    
    // Inicializar el slider y configurar la visibilidad de las flechas
    updateSlider();
    toggleNavigationArrows();
    
    // Animación suave para el scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 