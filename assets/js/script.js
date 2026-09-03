
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