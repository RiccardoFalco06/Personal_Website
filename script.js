document.addEventListener('DOMContentLoaded', () => {
    // 1. Time Update
    const timeElement = document.getElementById('local-time');

    function updateTime() {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    setInterval(updateTime, 1000);
    updateTime();

    // 2. Spotlight / Mouse Move Effect on Cards
    const cards = document.querySelectorAll('.bento-card');
    const container = document.querySelector('.bento-container');

    container.addEventListener('mousemove', (e) => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update custom properties for spotlight effect if we were to add a detailed radial-gradient overlay via JS
            // For now, let's do a subtle tilt effect

            // Calculate tilt
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -2; // Max 2 deg rotation
            const rotateY = ((x - centerX) / centerX) * 2;

            // Apply style only if hover state is better managed or less jagged. 
            // For smooth performance, we'll keep it simple or use requestAnimationFrame.
            // Let's stick to a simple spotlight follow in CSS or minimal JS.

            // Simpler version: Add a subtle 'glow' following mouse position on the border?
            // Let's rely on CSS hover mainly for robustness, but we can do a 'flashlight' hover effect.
        });
    });

    // Let's implement a 'Flashlight' border effect
    // We update the CSS variable --mouse-x and --mouse-y on the card
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Add a dynamic border glow using mask or background
            // We already added a partial effect in CSS, let's enhance it dynamically if needed.
        });
    });

    // 3. Staggered Entrance Animation
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index); // Stagger by 100ms
    });
});
