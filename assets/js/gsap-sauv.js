gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".stat").forEach((el) => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || "";
    const obj = { val: 0 };

    gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => (el.textContent = Math.round(obj.val) + suffix),
    });
});


gsap.registerPlugin(ScrollTrigger);

gsap.to(".marquee", {
    xPercent: -50,
    ease: "none",
    scrollTrigger: {
        trigger: ".marquee",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
    },
});

gsap.to(".blob", {
    clipPath: "polygon(2% 12%, 100% 4%, 94% 88%, 12% 100%)",
    scale: 1.35,
    ease: "none",
    scrollTrigger: {
        trigger: ".blob",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
    },
});
gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

// Rotation de la photo liée au scroll (section about)
gsap.to(".photo-rotate", {
    rotation: 360,
    ease: "none",
    scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
    }
});

// Entrée des cartes de services : slide-in + fade, une fois, au moment où chaque carte arrive à l'écran
gsap.utils.toArray("#services .service-card").forEach((card, i) => {
    gsap.from(card, {
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: i * 0.1,
        scrollTrigger: {
            trigger: card,
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