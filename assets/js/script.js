const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const menuText = menuToggle.querySelector('.menu__text');
const menuTextClose = menuToggle.querySelector('.menu__text--close');

menuToggle.addEventListener('click', function () {
    const isOpen = !navMenu.classList.contains('hidden');

    if (isOpen) {

        navMenu.classList.add('opacity-0');
        setTimeout(() => {
            navMenu.classList.add('hidden');
        }, 300);
    } else {
        navMenu.classList.remove('hidden');
        setTimeout(() => {
            navMenu.classList.remove('opacity-0');
        }, 10);
    }

    menuText.classList.toggle('hidden');
    menuTextClose.classList.toggle('hidden');
});



//Afffiche le copyright avec la date actuelle :)
document.getElementById("year").textContent = new Date().getFullYear();

//Fitre les projets dans la page projets
filterCategory("all");

function filterCategory(category) {
    const items = document.getElementsByClassName("project__card");

    for (let i = 0; i < items.length; i++) {

        if (category === "all" || items[i].classList.contains(category)) {
            items[i].classList.add("project__card--show");
        } else {
            items[i].classList.remove("project__card--show");
        }
    }

}