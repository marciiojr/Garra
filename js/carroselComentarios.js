  document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('carrosselTrack');
    const slides = document.querySelectorAll('.carrossel-slide');
    const prevBtn = document.querySelector('.carrossel-prev');
    const nextBtn = document.querySelector('.carrossel-next');
    const dotsContainer = document.getElementById('carrosselDots');
    
    let currentIndex = 0;
    let autoPlayInterval;
    const slidesToShow = window.innerWidth >= 768 ? 3 : 1;
    const totalSlides = slides.length;
    
    // Criar dots de navegação
    function createDots() {
      dotsContainer.innerHTML = '';
      const dotsCount = window.innerWidth >= 768 ? Math.ceil(totalSlides / slidesToShow) : totalSlides;
      
      for (let i = 0; i < dotsCount; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }
    
    // Atualizar dots ativos
    function updateDots() {
      const dots = document.querySelectorAll('.dot');
      const activeDotIndex = Math.floor(currentIndex / slidesToShow);
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeDotIndex);
      });
    }
    
    // Ir para slide específico
    function goToSlide(index) {
      currentIndex = index * slidesToShow;
      updateCarrossel();
    }
    
    // Atualizar carrossel
    function updateCarrossel() {
      const slideWidth = slides[0].offsetWidth + 32; // 32px = gap (8px * 4)
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      updateDots();
    }
    
    // Próximo slide
    function nextSlide() {
      if (window.innerWidth >= 768) {
        currentIndex = (currentIndex + slidesToShow) % totalSlides;
      } else {
        currentIndex = (currentIndex + 1) % totalSlides;
      }
      updateCarrossel();
    }
    
    // Slide anterior
    function prevSlide() {
      if (window.innerWidth >= 768) {
        currentIndex = (currentIndex - slidesToShow + totalSlides) % totalSlides;
      } else {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      }
      updateCarrossel();
    }
    
    // Auto-play
    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });
    
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
    
    // Pausar auto-play ao interagir
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);
    
    // Responsividade
    window.addEventListener('resize', function() {
      const newSlidesToShow = window.innerWidth >= 768 ? 3 : 1;
      if (newSlidesToShow !== slidesToShow) {
        currentIndex = 0;
        createDots();
        updateCarrossel();
      }
    });
    
    // Inicializar
    createDots();
    updateCarrossel();
    startAutoPlay();
  });