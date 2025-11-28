// Paleta de colores navideña
const christmasColors = {
  red: '#8B0000',
  green: '#006400', 
  gold: '#FFD700',
  darkGreen: '#004d00',
  lightGold: '#f8f8e0'
};

// Función para crear efecto de nieve mejorado
function createSnowflakes() {
  const snowContainer = document.createElement('div');
  snowContainer.id = 'snow-container';
  snowContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9998;
  `;
  document.body.appendChild(snowContainer);
  
  // Crear copos de nieve
  for (let i = 0; i < 80; i++) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';
    
    // Propiedades aleatorias
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 15;
    const delay = Math.random() * 10;
    const size = 0.8 + Math.random() * 1.2;
    const opacity = 0.4 + Math.random() * 0.6;
    const spin = Math.random() * 360;
    
    snowflake.style.cssText = `
      position: absolute;
      left: ${left}vw;
      top: -20px;
      font-size: ${size}em;
      opacity: ${opacity};
      color: white;
      animation: snowFall ${duration}s linear ${delay}s infinite;
      transform: rotate(${spin}deg);
      pointer-events: none;
      user-select: none;
      text-shadow: 0 0 5px rgba(255,255,255,0.5);
    `;
    
    snowContainer.appendChild(snowflake);
  }
  
  // Agregar estilos de animación
  const style = document.createElement('style');
  style.textContent = `
    @keyframes snowFall {
      0% {
        transform: translateY(-20px) rotate(0deg);
        opacity: 0.8;
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0.2;
      }
    }
  `;
  document.head.appendChild(style);
}

// Función para crear banners navideños
function createChristmasBanners() {
  createMainBanner();
  createSecondaryBanner();
}

// Banner principal superior
function createMainBanner() {
  const existingBanner = document.querySelector('.christmas-banner');
  if (existingBanner) existingBanner.remove();
  
  const banner = document.createElement('div');
  banner.classList.add('christmas-banner');
  banner.style.cssText = `
    position: sticky;
    top: 80px; /* Debajo del header */
    left: 0;
    width: 100%;
    background: linear-gradient(90deg, ${christmasColors.red}, ${christmasColors.gold}, ${christmasColors.green});
    color: ${christmasColors.red};
    padding: 10px 0;
    text-align: center;
    font-weight: bold;
    font-size: 1.1rem;
    z-index: 999;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    overflow: hidden;
    border-bottom: 2px solid ${christmasColors.gold};
  `;
  
  const slider = document.createElement('div');
  slider.classList.add('banner-slider');
  slider.style.cssText = `
    display: flex;
    animation: bannerScroll 25s linear infinite;
    white-space: nowrap;
    font-weight: bold;
  `;
  
  const decorations = ['🎄', '🎅', '🤶', '⭐', '🎁', '❄'];
  const message = " ¡Feliz Navidad Promoción 2000! ";
  
  // Crear contenido del banner
  for (let i = 0; i < 3; i++) {
    decorations.forEach(decoration => {
      const item = document.createElement('span');
      item.innerHTML = `${decoration} ${message} `;
      item.style.marginRight = '30px';
      item.style.fontWeight = 'bold';
      slider.appendChild(item);
    });
  }
  
  banner.appendChild(slider);
  
  // Insertar después del header
  const header = document.querySelector('header');
  if (header) {
    header.parentNode.insertBefore(banner, header.nextSibling);
  } else {
    document.body.prepend(banner);
  }
  
  // Agregar animación
  const style = document.createElement('style');
  style.textContent = `
    @keyframes bannerScroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;
  document.head.appendChild(style);
}

// Banner secundario inferior
function createSecondaryBanner() {
  const existingBanner = document.querySelector('.christmas-banner-secondary');
  if (existingBanner) existingBanner.remove();
  
  const banner = document.createElement('div');
  banner.classList.add('christmas-banner-secondary');
  banner.style.cssText = `
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(90deg, ${christmasColors.green}, ${christmasColors.gold}, ${christmasColors.red});
    color: ${christmasColors.red};
    padding: 10px 0;
    text-align: center;
    font-weight: bold;
    z-index: 999;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.3);
    overflow: hidden;
    border-top: 2px solid ${christmasColors.gold};
    margin-top: 2rem;
  `;
  
  const slider = document.createElement('div');
  slider.classList.add('banner-slider-reverse');
  slider.style.cssText = `
    display: flex;
    animation: bannerScrollReverse 30s linear infinite;
    white-space: nowrap;
    font-weight: bold;
  `;
  
  const messages = [
    '🎄 ¡Que la magia de la Navidad llene sus corazones! 🎄',
    '🎅 Recordando los mejores momentos juntos 🎅',
    '⭐ Brindemos por la amistad que perdura ⭐',
    '🎁 Los recuerdos son el mejor regalo 🎁'
  ];
  
  // Crear contenido del banner
  for (let i = 0; i < 2; i++) {
    messages.forEach(message => {
      const item = document.createElement('span');
      item.innerHTML = `${message} `;
      item.style.marginRight = '50px';
      item.style.fontWeight = 'bold';
      slider.appendChild(item);
    });
  }
  
  banner.appendChild(slider);
  
  // Insertar antes del footer
  const footer = document.querySelector('footer');
  if (footer) {
    footer.parentNode.insertBefore(banner, footer);
  } else {
    document.body.appendChild(banner);
  }
  
  // Agregar animación inversa
  const style = document.createElement('style');
  if (!document.querySelector('#bannerReverseStyle')) {
    const reverseStyle = document.createElement('style');
    reverseStyle.id = 'bannerReverseStyle';
    reverseStyle.textContent = `
      @keyframes bannerScrollReverse {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
    `;
    document.head.appendChild(reverseStyle);
  }
}

// Función para aplicar estilos navideños a elementos específicos
function applyChristmasStyles() {
  // Agregar decoraciones navideñas a elementos de valor
  const valueItems = document.querySelectorAll('.values-list li');
  valueItems.forEach(item => {
    if (!item.querySelector('.christmas-icon')) {
      const icon = document.createElement('span');
      icon.classList.add('christmas-icon');
      icon.innerHTML = ' 🎄';
      icon.style.marginLeft = '5px';
      item.appendChild(icon);
    }
  });
  
  // Decorar tarjetas con bordes navideños
  const cards = document.querySelectorAll('.student-card, .teacher-card, .memory-card, .panel');
  cards.forEach(card => {
    card.style.border = `2px solid ${christmasColors.gold}`;
  });
  
  // Agregar efectos especiales a los paneles
  const panels = document.querySelectorAll('.panel');
  panels.forEach(panel => {
    panel.style.background = `linear-gradient(135deg, ${christmasColors.lightGold}, #ffffff)`;
  });
}

// Función para eliminar efectos navideños
function removeChristmasEffects() {
  // Eliminar nieve
  const snowContainer = document.getElementById('snow-container');
  if (snowContainer) snowContainer.remove();
  
  // Eliminar banners
  const banners = document.querySelectorAll('.christmas-banner, .christmas-banner-secondary');
  banners.forEach(banner => banner.remove());
  
  // Eliminar decoraciones
  const christmasIcons = document.querySelectorAll('.christmas-icon');
  christmasIcons.forEach(icon => icon.remove());
  
  // Remover estilos de tarjetas
  const cards = document.querySelectorAll('.student-card, .teacher-card, .memory-card, .panel');
  cards.forEach(card => {
    card.style.border = '';
  });
  
  // Remover fondos de paneles
  const panels = document.querySelectorAll('.panel');
  panels.forEach(panel => {
    panel.style.background = '';
  });
}

// Función para alternar tema navideño
function toggleChristmasTheme() {
  const body = document.body;
  const isChristmas = body.classList.toggle('christmas-theme');
  
  // Guardar preferencia
  localStorage.setItem('christmasTheme', isChristmas);
  
  // Actualizar botón
  const button = document.querySelector('.theme-toggle');
  if (button) {
    button.textContent = isChristmas ? 'Tema Normal' : 'Tema Navideño';
    button.style.backgroundColor = isChristmas ? 
      christmasColors.red : '#3599eb';
  }
  
  // Aplicar o quitar efectos
  if (isChristmas) {
    createSnowflakes();
    createChristmasBanners();
    applyChristmasStyles();
  } else {
    removeChristmasEffects();
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Verificar preferencia guardada
  const savedTheme = localStorage.getItem('christmasTheme');
  if (savedTheme === 'true') {
    document.body.classList.add('christmas-theme');
    createSnowflakes();
    createChristmasBanners();
    applyChristmasStyles();
  }
  
  // Crear botón de cambio de tema
  createThemeToggleButton();
});

// Función para crear el botón de cambio de tema
function createThemeToggleButton() {
  // Verificar si el botón ya existe
  if (document.querySelector('.theme-toggle')) return;
  
  const themeButton = document.createElement('button');
  themeButton.classList.add('theme-toggle');
  themeButton.textContent = document.body.classList.contains('christmas-theme') ? 
    'Tema Normal' : 'Tema Navideño';
  
  // Estilos del botón
  themeButton.style.cssText = `
    background-color: ${document.body.classList.contains('christmas-theme') ? 
      christmasColors.red : '#3599eb'};
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    margin-left: 10px;
    transition: all 0.3s ease;
    border: 2px solid ${document.body.classList.contains('christmas-theme') ? 
      christmasColors.gold : 'transparent'};
  `;
  
  themeButton.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
    this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
  });
  
  themeButton.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = 'none';
  });
  
  themeButton.addEventListener('click', toggleChristmasTheme);
  
  // Insertar botón en el header
  const headerActions = document.querySelector('.user-actions');
  if (headerActions) {
    headerActions.appendChild(themeButton);
  } else {
    // Si no hay user-actions, crear uno
    const headerContent = document.querySelector('.header-content');
    if (headerContent) {
      const newActions = document.createElement('div');
      newActions.classList.add('user-actions');
      newActions.appendChild(themeButton);
      headerContent.appendChild(newActions);
    }
  }
}

