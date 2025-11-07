// Cargar componentes dinámicos
document.addEventListener('DOMContentLoaded', function() {
    // Cargar header
    fetch('partials/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            initializeHeader();
        })
        .catch(error => console.error('Error loading header:', error));
    
    // Cargar footer
    fetch('partials/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
    
    // Cargar menú si existe el contenedor
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        fetch('partials/menu.html')
            .then(response => response.text())
            .then(data => {
                menuContainer.innerHTML = data;
                initializeMenu();
            })
            .catch(error => console.error('Error loading menu:', error));
    }
});

function initializeMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Encontrar el índice del elemento activo
    let activeIndex = -1;
    
    // Marcar item activo según la página actual y encontrar su índice
    menuItems.forEach((item, index) => {
        const page = item.getAttribute('data-page');
        if (currentPage === page || (currentPage === '' && page === 'dashboard.html')) {
            item.classList.add('active');
            activeIndex = index;
        } else {
            item.classList.remove('active');
        }

        // Evento de clic SIN retardo para el menú
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Quitar 'active' de todos los items
            menuItems.forEach(i => {
                i.classList.remove('active');
                i.style.fontWeight = '';
            });

            // Agregar 'active' al item clicado
            this.classList.add('active');
            this.style.fontWeight = '700';

            // Aplicar animación de cambio de elemento activo
            applyActiveChangeAnimation(menuItems, index);
            
            // Navegación inmediata para el menú
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                window.location.href = targetPage;
            }
        });
        
        // Efectos adicionales al pasar el mouse (mantener existentes)
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.fontWeight = '600';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.fontWeight = '';
            }
        });
    });
    
    // Aplicar animación de entrada desde el elemento activo
    applyMenuEntranceEffects(menuItems, activeIndex);
}

// Efectos de entrada para el menú desde el elemento activo
function applyMenuEntranceEffects(menuItems, activeIndex) {
    // Primero mostrar el elemento activo
    if (activeIndex >= 0) {
        const activeItem = menuItems[activeIndex];
        activeItem.style.opacity = '1';
        activeItem.style.transform = 'translateY(0) scale(1)';
        
        // Luego animar los elementos a la izquierda del activo
        for (let i = activeIndex - 1; i >= 0; i--) {
            setTimeout(() => {
                menuItems[i].classList.add('entering-left');
            }, 100 * (activeIndex - i));
        }
        
        // Finalmente animar los elementos a la derecha del activo
        for (let i = activeIndex + 1; i < menuItems.length; i++) {
            setTimeout(() => {
                menuItems[i].classList.add('entering-right');
            }, 100 * (i - activeIndex));
        }
    }
}

// Animación para cuando cambia el elemento activo
function applyActiveChangeAnimation(menuItems, newActiveIndex) {
    // Pequeña animación de "respuesta" para el nuevo elemento activo
    const newActiveItem = menuItems[newActiveIndex];
    
    // Animación de pulso para el nuevo elemento activo
    newActiveItem.style.animation = 'none';
    setTimeout(() => {
        newActiveItem.style.animation = 'activePulse 0.5s ease-out';
    }, 10);
    
    // Efecto sutil en los elementos adyacentes
    menuItems.forEach((item, index) => {
        if (index !== newActiveIndex) {
            // Pequeño efecto de "alejamiento" para elementos no activos
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 300);
        }
    });
}

