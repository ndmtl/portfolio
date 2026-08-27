document.getElementById("year").textContent = new Date().getFullYear();


//Navigation

// fetch('_navbar.html')
//     .then(r => r.text())
//     .then(html => {
//         document.getElementById('navbar').innerHTML = html;

//         const toggle = document.querySelector('.toggle');
//         const overlay = document.querySelector('.overlay');

//         toggle.addEventListener('click', () => {
//             toggle.classList.toggle('open');
//             overlay.classList.toggle('open');
//         });
//     });


//  Code pour la version 3 
// const form = document.getElementById('contact');
// const openForm = document.querySelector('.contact-circle');
// const btnClose = document.getElementById('btnClose');

// openForm.addEventListener('click', () => {
//     form.classList.toggle('open');

// });
// btnClose.addEventListener('click', (e) => {
//     form.classList.toggle('open');
// });


//  Formulaire de contact
const contactForm = document.getElementById('contactForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const subject = document.getElementById('subject');
const budget = document.getElementById('budget');
const deadline = document.getElementsByName('deadline');

// Message de réussite
const message = document.getElementById('message');
const messageConfirmation = document.getElementById('messageConfirmation');

//
contactForm.addEventListener('submit', (event) => {
    if (!validateForm()) {
        event.preventDefault();

    } else {
        event.preventDefault();
        messageConfirmation.textContent = "Merci, votre formulaire a bien été envoyé ! Je vous répondrais sous peu.";
        console.log("Le mail a bien été envoyé !")
    }

});

// Validation
function validateForm() {
    let noError = true;

    const nameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const subjectValue = subject.value;
    const messageValue = message.value;

    // Validation Nom et Prénom
    if (nameValue === '') {
        setError(fullName, "Le nom est requis");
        noError = false;
    } else if (nameValue.split(' ').filter(word => word.length > 0).length < 2) {
        setError(fullName, "Veuillez entrer votre nom ET votre prénom");
        noError = false;
    } else {
        setSuccess(fullName);
    }

    // Validation Courriel
    if (emailValue === '') {
        setError(email, "Le courriel est requis");
        noError = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, "Format invalide (ex: nom@domaine.com)");
        noError = false;
    } else {
        setSuccess(email);
    }

    // Validation Téléphone
    if (!isValidPhone(phoneValue)) {
        setError(phone, "Le numéro doit contenir 10 chiffres");
        noError = false;
    } else {
        setSuccess(phone);
    }
    // Validation du sujet
    if (subjectValue === '') {
        setError(subject, "Le champ est requis");
        noError = false;
    } else {
        setSuccess(subject);
    }

    //Validation message
    if (messageValue === '') {
        setError(message, "Ce champ ne peut pas être vide");
        noError = false;
    } else {
        setSuccess(message);
    }
    return noError;
}

//
function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
}


