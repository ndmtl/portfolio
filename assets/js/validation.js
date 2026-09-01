
//--------//
//  Formulaire de contact
const contactForm = document.getElementById('contactForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const company = document.getElementById('company');
const phone = document.getElementById('phone');
const subject = document.getElementById('subject');
const budget = document.getElementById('budget');
const deadline = document.getElementsByName('deadline');

// Message de réussite lors de l'envoi
const message = document.getElementById('message');
const messageConfirmation = document.getElementById('Confirmation');

//
contactForm.addEventListener('submit', (event) => {
    if (!validateForm()) {
        event.preventDefault();

    } else {
        event.preventDefault();
        confirmation.textContent = "Merci, votre formulaire a bien été envoyé ! Je vous répondrai sous peu.";
        confirmation.classList.add('confirmation__attributs');
        console.log("Le mail a bien été envoyé !")
    }

});

// Validation
function validateForm() {
    let noError = true;

    const nameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const companyValue = company.value.trim();
    const subjectValue = subject.value;
    const budgetValue = budget.value;
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
        setError(email, "Le format doit être tel que: nom@domaine.com");
        noError = false;
    } else {
        setSuccess(email);
    }

    // Validation Téléphone
    if ((phoneValue === '')) {
        setSuccess(phone);
    }
    else if (!isValidPhone(phoneValue)) {
        setError(phone, "Le numéro doit contenir 10 chiffres");
        noError = false;
    } else {
        setSuccess(phone);
    }


    // Validation du sujet (projet)
    if (subjectValue === '') {
        setError(subject, "Ce champ ne peut pas être vide");
        noError = false;
    } else {
        setSuccess(subject);
    }

    //Validation du budget
    if (budgetValue === '') {
        setError(budget, "Ce champ ne peut pas être vide");
        noError = false;
    } else {
        setSuccess(budget);
    }


    //Validation de l'échéance
    let radioSelected = false;

    deadline.forEach(element => {
        if (element.checked) {
            radioSelected = true;
        }
    });
    if (!radioSelected) {

        setError(deadline[0], "Veuillez choisir une échéance");
        noError = false;
    }
    else {
        setSuccess(deadline[0]);

    }

    //Validation du message
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
    const inputControl = element.closest('.input__control');
    const errorDisplay = inputControl.querySelector('.message__error');
    errorDisplay.innerText = message;
    inputControl.classList.add('input__control--error');
    inputControl.classList.remove('input__control--success');
}

function setSuccess(element) {
    const inputControl = element.closest('.input__control');
    const errorDisplay = inputControl.querySelector('.message__error');
    errorDisplay.innerText = '';
    inputControl.classList.add('input__control--success');
    inputControl.classList.remove('input__control--error');
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
}


