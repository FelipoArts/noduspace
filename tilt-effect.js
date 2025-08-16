document.addEventListener('DOMContentLoaded', () => {
    const tiltableElements = document.querySelectorAll('.tilt-card, .tilt-card-inner');

    tiltableElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            element.style.transition = 'none'; // Remove transition for immediate response
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10 degrees
            const rotateY = ((x - centerX) / centerX) * 10; // Max rotation 10 degrees

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transition = 'transform 0.5s ease-in-out'; // Add transition for smooth return
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});