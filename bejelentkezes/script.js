const emails = [];
const passwords = [];


console.log(
    !(localStorage.getItem('emails') === null) && !(localStorage.getItem('passwords') === null),
);
if (!(localStorage.getItem('emails') === null) && !(localStorage.getItem('passwords') === null)) {
    const emails = JSON.parse(localStorage.getItem('emails'));
    const passwords = JSON.parse(localStorage.getItem('passwords'));
    console.log(passwords);
    console.log(emails);
}

function validateForm() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let password2 = document.getElementById('password2').value;

    if (email === '' || password === '' || password2 === '') {
        alert('All fields are required!');
        return false;
    } else if (password !== password2) {
        alert('Passwords do not match!');
        return false;
    } else {
        return true;
    }
}




