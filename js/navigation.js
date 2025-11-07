// Sistema de navegación con efecto de aparición/desaparición
class NavigationSystem {
    constructor() {
        this.isNavigating = false;
        this.init();
    }

    init() {
        this.createLoadingOverlay();
        this.initStudentCards();
        this.initTeacherCards();
        this.initMemoryCards();
        this.initPanelLinks();
        this.initPageTransitions();
    }

    createLoadingOverlay() {
        if (!document.getElementById('navigation-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'navigation-overlay';
            overlay.className = 'navigation-overlay';
            overlay.innerHTML = `
                <div class="navigation-spinner"></div>
                <p>Cargando...</p>
            `;
            document.body.appendChild(overlay);
        }
    }

    initPageTransitions() {
        // Aplicar efecto de entrada inicial a la página
        this.animatePageEntrance();
    }

    animatePageEntrance() {
        const mainContent = document.querySelector('main') || document.body;
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            mainContent.style.transition = 'opacity 1.0s ease, transform 1.0s ease';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }

    initStudentCards() {
        document.querySelectorAll('.student-card').forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.isNavigating) return;
                
                const studentName = card.textContent.trim();
                if (studentName) {
                    this.showStudentInfo(studentName);
                } else {
                    this.navigateWithAppearanceEffect('construccion.html');
                }
            });
        });
    }

    initTeacherCards() {
        document.querySelectorAll('.teacher-card').forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.isNavigating) return;
                
                const teacherName = card.querySelector('h3')?.textContent?.trim();
                if (teacherName && teacherName !== 'Prof. ') {
                    this.showTeacherInfo(teacherName);
                } else {
                    this.navigateWithAppearanceEffect('construccion.html');
                }
            });
        });
    }

    initMemoryCards() {
        document.querySelectorAll('.memory-card').forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.isNavigating) return;
                
                const memoryTitle = card.querySelector('h3')?.textContent?.trim();
                if (memoryTitle) {
                    this.showMemoryDetail(memoryTitle);
                } else {
                    this.navigateWithAppearanceEffect('construccion.html');
                }
            });
        });
    }

    initPanelLinks() {
        document.querySelectorAll('.panel').forEach(panel => {
            panel.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.isNavigating) return;
                
                const href = panel.getAttribute('href');
                if (href) {
                    this.navigateWithAppearanceEffect(href);
                }
            });
        });
    }

    async navigateWithAppearanceEffect(url) {
        if (this.isNavigating) return;
        
        this.isNavigating = true;
        
        try {
            // 1. Efecto de desaparición del contenido actual
            await this.animateContentExit();
            
            // 2. Mostrar loading
            this.showLoading();
            
            // 3. Esperar 3 segundo (retardo artificial)
            await this.delay(3000);
            
            // 4. Navegar a la nueva página
            window.location.href = url;
            
        } catch (error) {
            console.error('Error en navegación:', error);
            this.hideLoading();
            this.animateContentEntrance(); // Restaurar contenido si hay error
            this.isNavigating = false;
        }
    }

    animateContentExit() {
        return new Promise((resolve) => {
            const mainContent = document.querySelector('main') || document.querySelector('.content-page') || document.body;
            
            // Guardar la posición original para restaurar si hay error
            mainContent.dataset.originalOpacity = mainContent.style.opacity;
            mainContent.dataset.originalTransform = mainContent.style.transform;
            
            // Aplicar efecto de desaparición
            mainContent.style.transition = 'opacity 1.0s ease, transform 1.0s ease';
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(-30px) scale(0.95)';
            
            setTimeout(() => {
                resolve();
            }, 500);
        });
    }

    animateContentEntrance() {
        const mainContent = document.querySelector('main') || document.querySelector('.content-page') || document.body;
        
        // Restaurar efecto de entrada
        mainContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        mainContent.style.opacity = mainContent.dataset.originalOpacity || '1';
        mainContent.style.transform = mainContent.dataset.originalTransform || 'translateY(0) scale(1)';
    }

    showLoading() {
        const overlay = document.getElementById('navigation-overlay');
        if (overlay) {
            overlay.classList.add('active');
        }
    }

    hideLoading() {
        const overlay = document.getElementById('navigation-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Métodos para mostrar información detallada
    showStudentInfo(studentName) {
        console.log(`Mostrando información de: ${studentName}`);
        this.navigateWithAppearanceEffect('construccion.html');
    }

    showTeacherInfo(teacherName) {
        console.log(`Mostrando información de: ${teacherName}`);
        this.navigateWithAppearanceEffect('construccion.html');
    }

    showMemoryDetail(memoryTitle) {
        console.log(`Mostrando detalle de: ${memoryTitle}`);
        this.navigateWithAppearanceEffect('construccion.html');
    }

    // Método para navegación programática
    navigateTo(url) {
        this.navigateWithAppearanceEffect(url);
    }
}

// Inicializar sistema de navegación
document.addEventListener('DOMContentLoaded', function() {
    // Solo inicializar en páginas de contenido principales
    const isContentPage = document.querySelector('main') || 
                         document.querySelector('.content-page') || 
                         document.querySelector('.dashboard-main');
    
    if (isContentPage && 
        !document.getElementById('header-container') && 
        !document.getElementById('menu-container') && 
        !document.getElementById('footer-container')) {
        window.navigationSystem = new NavigationSystem();
    }
});

// Función global para navegación desde cualquier lugar
function navigateToPage(url) {
    if (window.navigationSystem) {
        window.navigationSystem.navigateTo(url);
    } else {
        // Fallback: navegación normal sin efectos
        window.location.href = url;
    }
}

