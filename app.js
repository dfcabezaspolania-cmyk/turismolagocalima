const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const page = document.body.dataset.page;
const galleryItems = page === 'restaurantes' ? [
  {
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=85',
    title: 'Mesa junto al lago',
    location: 'Restaurante Mirador'
  },
  {
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85',
    title: 'Sabor de la tierra',
    location: 'Cocina local'
  },
  {
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85',
    title: 'Noches con sazón',
    location: 'Bistro Calima'
  },
  {
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1800&q=85',
    title: 'Cena bajo la brisa',
    location: 'Terraza del Lago'
  }
] : [
  {
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85',
    title: 'Viento sobre el agua',
    location: 'Lago Calima'
  },
  {
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=85',
    title: 'Montanas que abrazan',
    location: 'Senderos del Darien'
  },
  {
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=85',
    title: 'Mananas sin prisa',
    location: 'Veredas de Calima'
  },
  {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85',
    title: 'El azul de la tarde',
    location: 'Embalse Calima'
  }
];

const track = document.querySelector('#gallery-track');
const dots = document.querySelector('#gallery-dots');
const counter = document.querySelector('#gallery-counter');
const currentTitle = document.querySelector('#gallery-title-current');
const currentLocation = document.querySelector('#gallery-location');
let currentSlide = 0;

if (track && dots) {
  galleryItems.forEach((item, index) => {
    const slide = document.createElement('div');
    slide.className = 'gallery-slide';
    slide.style.backgroundImage = `url("${item.image}")`;
    slide.setAttribute('aria-label', item.title);
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ver imagen ${index + 1}`);
    dot.addEventListener('click', () => showSlide(index));
    dots.appendChild(dot);
  });

  function showSlide(index) {
    currentSlide = (index + galleryItems.length) % galleryItems.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.querySelectorAll('button').forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === currentSlide);
    });
    const item = galleryItems[currentSlide];
    counter.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`;
    currentTitle.textContent = item.title;
    currentLocation.textContent = item.location;
  }

  document.querySelector('#gallery-prev').addEventListener('click', () => showSlide(currentSlide - 1));
  document.querySelector('#gallery-next').addEventListener('click', () => showSlide(currentSlide + 1));
  showSlide(0);

  let autoplay = setInterval(() => showSlide(currentSlide + 1), 5500);
  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.parentElement.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => showSlide(currentSlide + 1), 5500);
  });
}
