// Funcionalidades específicas del header
document.addEventListener('DOMContentLoaded', function() {
    // Solo mantener la funcionalidad básica si es necesaria
    console.log('Header cargado correctamente');
    
    // Opcional: Agregar algún efecto al botón si se desea
    const btnInicio = document.querySelector('.btn-logout');
    if (btnInicio) {
        btnInicio.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        btnInicio.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});
