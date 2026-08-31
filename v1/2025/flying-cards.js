// Function to get random position from edges of viewport
const getRandomPosition = () => {
    const positions = [
        // Left edge
        { x: -100 - Math.random() * 300, y: -50 + Math.random() * window.innerHeight },
        // Right edge
        { x: window.innerWidth + Math.random() * 300, y: -50 + Math.random() * window.innerHeight },
        // Top edge
        { x: -50 + Math.random() * window.innerWidth, y: -100 - Math.random() * 300 },
        // Bottom edge
        { x: -50 + Math.random() * window.innerWidth, y: window.innerHeight + Math.random() * 300 },
        // Corners
        { x: -300, y: -300 },
        { x: window.innerWidth + 300, y: -300 },
        { x: -300, y: window.innerHeight + 300 },
        { x: window.innerWidth + 300, y: window.innerHeight + 300 }
    ];
    
    return positions[Math.floor(Math.random() * positions.length)];
};

// Set initial states for all cards
gsap.utils.toArray('.project-card').forEach(card => {
    const pos = getRandomPosition();
    const rotation = -30 + Math.random() * 60; // Random rotation between -30 and 30 degrees
    
    gsap.set(card, {
        x: pos.x,
        y: pos.y,
        rotation: rotation,
        opacity: 0,
        scale: 0.8
    });
});

// Create scroll-triggered animations for cards
gsap.utils.toArray('.project-card').forEach((card, index) => {
    const delay = index * 0.1; // Stagger the animations
    
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            end: 'top center+=100',
            scrub: 1.2,
            onEnter: () => {
                gsap.to(card, {
                    duration: 1.5,
                    x: 0,
                    y: 0,
                    rotation: 0,
                    opacity: 1,
                    scale: 1,
                    ease: 'power3.out',
                    delay: delay
                });
            },
            onLeave: () => {
                const exitPos = getRandomPosition();
                gsap.to(card, {
                    duration: 1.5,
                    x: exitPos.x,
                    y: exitPos.y,
                    rotation: -30 + Math.random() * 60,
                    opacity: 0,
                    scale: 0.8,
                    ease: 'power3.in'
                });
            },
            onEnterBack: () => {
                gsap.to(card, {
                    duration: 1.5,
                    x: 0,
                    y: 0,
                    rotation: 0,
                    opacity: 1,
                    scale: 1,
                    ease: 'power3.out'
                });
            },
            onLeaveBack: () => {
                const exitPos = getRandomPosition();
                gsap.to(card, {
                    duration: 1.5,
                    x: exitPos.x,
                    y: exitPos.y,
                    rotation: -30 + Math.random() * 60,
                    opacity: 0,
                    scale: 0.8,
                    ease: 'power3.in'
                });
            }
        }
    });
});