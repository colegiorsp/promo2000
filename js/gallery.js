// Funcionalidades para la galería de recuerdos
document.addEventListener('DOMContentLoaded', function() {
    // Aquí podrías agregar funcionalidades como:
    // - Modal para ampliar imágenes
    // - Filtros por categorías
    // - Búsqueda de recuerdos
    console.log('Galería de recuerdos cargada');
    
    // Ejemplo: Agregar efecto de hover mejorado
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

