// const emails = JSON.parse(localStorage.getItem('emails'));
// const passwords = JSON.parse(localStorage.getItem('passwords'));

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

document.getElementById('registerButton').addEventListener('click', () => {
    if (validateForm()) {
        // emails.push(document.getElementById('email').value);
        // passwords.push(document.getElementById('password').value);

        // localStorage.setItem('emails', JSON.stringify(emails));
        // localStorage.setItem('passwords', JSON.stringify(passwords));

        // alert('Registration successful!');

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('password2').value;

        if (password !== password2) {
            alert('Passwords do not match!');
            return;
        }

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('Registration successful!');
                    window.location.href = 'login.html';
                } else {
                    alert('Registration failed');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
});
