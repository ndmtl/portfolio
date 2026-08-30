
gsap.registerPlugin(ScrollTrigger);

// Hero : animation au chargement (pas de scroll, il est déjà à l'écran)
const heroTl = gsap.timeline({ delay: 0.2 });

heroTl.fromTo("#hero h1", { opacity: 0.10 }, { opacity: 1, duration: 1 })
    .from(".hero-left, .hero-left2", { x: -150, opacity: 0, duration: 1 }, "<")
    .from(".hero-right", { x: 150, opacity: 0, duration: 1 }, "<");


gsap.utils.toArray(".marquee").forEach((el) => {
    gsap.to(el, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
        },
    });
});

// Apparition
gsap.fromTo(".photo-fade",
    {
        opacity: 0,
        y: 40
    },
    {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".photo-fade",
            start: "top 50%", // Se déclenche quand le haut de l'image atteint 50vh du viewport
            toggleActions: "play none none reverse"
        }
    }
);
// Entrée des cartes de services : slide-in + fade, une fois, au moment où chaque carte arrive à l'écran
document.querySelectorAll("[data-fade-group]").forEach((group) => {
    gsap.from(group.querySelectorAll(".fade"), {
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
            trigger: group,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

// Logos clients en grille : slide-in + fade, groupés par ligne (stagger sur toute la section)
gsap.from("#logos-clients .logo-item", {
    x: -60,
    opacity: 0,
    duration: 0.7,
    ease: "power2.out",
    stagger: 0.08,
    scrollTrigger: {
        trigger: "#logos-clients",
        start: "top 75%",
        toggleActions: "play none none reverse"
    }
});