document.getElementById("hamburger-menu").checked = false;

function pushDown(e) {
    let header = document.getElementById("header");

    if (e.checked) {
        header.setAttribute("class", "pushdown");
    }
    else {
        header.setAttribute("class", " ");
    }
}

function validateForm() {
    event.preventDefault();

    var name = document.forms.contact.name.value;
    var email = document.forms.contact.email.value
    var subject = document.forms.contact.subject.value;
    var address = document.forms.contact.address.value;

    var nameErrorElement = document.getElementById('nameError');
    var emailErrorElement = document.getElementById('emailError');
    var subjectErrorElement = document.getElementById('subjectError');
    var addressErrorElement = document.getElementById('addressError');

    var validName = true;
    var validEmail = true;
    var validSubject = true;
    var validAddress = true;

    if (name == "") {
        var noName = "Please fill out name!";
        nameErrorElement.innerHTML = noName;
        validName = false;
    } else {
        nameErrorElement.innerHTML = "";
        validName = true;
    }

    var emailpattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailpattern.test(email)) {
        var noEmail = "Please fill out a valid email-address";
        emailErrorElement.innerHTML = noEmail;
        validEmail = false;
    } else {
        emailErrorElement.innerHTML = "";
        validEmail = true;
    }

    if (subject.length <= 10) {
        var noSubject = "Subject must have a length of minimum 10 characters";
        subjectErrorElement.innerHTML = noSubject;
        validSubject = false;
    }

    else {
        subjectErrorElement.innerHTML = "";
        validSubject = true;
    }

    if (address.length <= 25) {
        var noAddress = "Address must have a length of minimum 25 characters";
        addressErrorElement.innerHTML = noAddress;
        validAddress = false;
    }

    else {
        addressErrorElement.innerHTML = "";
        validAddress = true;
    }
    if (nameErrorElement.innerHTML === "" && emailErrorElement.innerHTML === "" && subjectErrorElement.innerHTML === "" && addressErrorElement.innerHTML === "") {
        var form = document.getElementById('contact')
        var successMessage = document.getElementById('success');
        successMessage.classList.add('show');
        setTimeout(() => form.submit(), 5000);

    }

    return validName && validEmail && validSubject && validAddress;
}
