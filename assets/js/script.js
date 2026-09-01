
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', function () {
    // Alterne les classes d'ouverture/fermeture
    // navMenu.classList.toggle('min-h-[0vh]');
    navMenu.classList.toggle('opacity-0');

    // navMenu.classList.toggle('min-h-[100vh]');
    navMenu.classList.toggle('opacity-100');
});


//Afffiche le copyright avec la date actuelle :)
document.getElementById("year").textContent = new Date().getFullYear();

