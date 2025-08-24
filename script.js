// === Плавающая кнопка телефона ===
window.showPhoneNumber = function () {
  const numbers = document.getElementById('phone-numbers');
  numbers.style.display =
    numbers.style.display === 'block' ? 'none' : 'block';
};


// === Боковое меню ===
window.toggleMenu = function () {
  const menu = document.getElementById('side-menu');
  const overlay = document.getElementById('overlay');

  menu.classList.toggle('active');
  overlay.style.display = menu.classList.contains('active') ? 'block' : 'none';
};

document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('side-menu');
  const overlay = document.getElementById('overlay');

  if (menu && overlay) {
    // Закрытие меню при клике на ссылку
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', e => {
        menu.classList.remove('active');
        overlay.style.display = 'none';

        // Плавный скролл
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // Закрытие меню при клике на оверлей
    overlay.addEventListener('click', () => {
      menu.classList.remove('active');
      overlay.style.display = 'none';
    });
  }

  // === Слайдер отзывов ===
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('dots');
  let currentSlide = 0;

  if (slides.length && dotsContainer) {
  dotsContainer.innerHTML = ""; // очищаем перед созданием
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
}

  const dots = document.querySelectorAll('.dot');

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    updateDots();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
  }

  if (slides.length) {
    showSlide(currentSlide);
    setInterval(nextSlide, 5000);
  }

  // === Кнопки слайдера без inline onclick ===
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
  }

  // === Обработка формы онлайн-заявки ===
  const form = document.getElementById('request-form');
  const success = document.getElementById('success-message');
  if (form && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      success.style.display = 'block';
    });
  }

  // Плавное появление секций
  const faders = document.querySelectorAll('.fade-in');
  function showOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    faders.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', showOnScroll);
  showOnScroll();
});

(function () {
  // Не даём инициализировать повторно
  if (window.__tariffsInit) return;
  window.__tariffsInit = true;

  const grid = document.querySelector('.tariff-grid');
  if (!grid) return;

  // Клики включаем только на тач-устройствах (на ПК работает hover)
  const clickMode = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (clickMode) {
    grid.addEventListener('click', function (e) {
      // Навигацию по кнопке пропускаем
      if (e.target.closest('.order-btn')) return;

      const card = e.target.closest('.tariff-card');
      if (!card) return;

      // Гасим другие обработчики, которые могли остаться
      e.stopPropagation();

      if (card.classList.contains('active')) {
        card.classList.remove('active');           // повторный тап — закрыть
      } else {
        document.querySelectorAll('.tariff-card.active')
          .forEach(c => c.classList.remove('active'));
        card.classList.add('active');              // открыть текущую
      }
    }, { capture: true, passive: true });
  }

  // Клик вне карточки закрывает открытые (актуально для тача)
  document.addEventListener('click', function (e) {
    if (e.target.closest('.tariff-card')) return;
    document.querySelectorAll('.tariff-card.active')
      .forEach(c => c.classList.remove('active'));
  }, { passive: true });
})();
