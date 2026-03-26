gsap.registerPlugin(ScrollTrigger);

/* CURSOR */
const cursor = document.getElementById('cursor');
let mx = 0, my = 0, cx = 0, cy = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
document.querySelectorAll('.card,a').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('big'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});

(function loop() { cx += (mx - cx) * .13; cy += (my - cy) * .13; cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; requestAnimationFrame(loop); })();

/* HERO */
gsap.set(['#l1', '#l2', '#l3'], { y: '105%' });
gsap.set(['#heroDesc', '#scrollHint'], { opacity: 0 });
gsap.timeline({ delay: .1 })
    .to(['#l1', '#l2', '#l3'], { y: '0%', duration: 1.1, ease: 'power4.out', stagger: .1 })

    .to('#heroDesc', { opacity: 1, duration: .6 }, .5)
    .to('#scrollHint', { opacity: 1, duration: .6 }, .65);


/* CARDS */
gsap.utils.toArray('.card').forEach((card, i) => {
    gsap.from(card, {
        opacity: 0, y: 70, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 95%', once: true },
        delay: i * .1
    });
});

/* STATEMENT */
gsap.from(['#sw1', '#sw2', '#sw3', '#sw4', '#sw5'], {
    y: '110%', duration: 1, ease: 'power4.out', stagger: .08,
    scrollTrigger: { trigger: '#statement', start: 'top 75%', once: true }
});

/* ABOUT */
gsap.from('.about-copy', { opacity: 0, y: 30, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.about-copy', start: 'top 85%', once: true } });
gsap.from('.about-skills', { opacity: 0, y: 30, duration: .9, ease: 'power3.out', delay: .1, scrollTrigger: { trigger: '.about-skills', start: 'top 85%', once: true } });

/* FOOTER */
gsap.from(['#fl1', '#fl2', '#fl3'], {
    x: -50, opacity: 0, duration: 1, ease: 'power4.out', stagger: .12,
    scrollTrigger: { trigger: '#footer', start: 'top 80%', once: true }
});
// 3. JS — rotation GSAP
gsap.to("#rotatingText", {
    rotation: 360,
    duration: 8,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%"
});

// Accélérer au hover
const btn = document.querySelector(".contact-circle");
btn.addEventListener("mouseenter", () =>
    gsap.to("#rotatingText", { timeScale: 3, duration: 0.4 })
);
btn.addEventListener("mouseleave", () =>
    gsap.to("#rotatingText", { timeScale: 1, duration: 0.4 })
);
