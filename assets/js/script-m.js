const toggle = document.querySelector('.toggle');
const overlay = document.querySelector('.overlay');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    overlay.classList.toggle('open');
});
