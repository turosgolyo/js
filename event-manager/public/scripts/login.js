function validateForm() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (email === '' || password === '') {
        alert('All fields are required!');
        return false;
    } else {
        return true;
    }
}

document.getElementById('loginButton').addEventListener('click', () => {
    if (validateForm()) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('Successful login!');
                    document.getElementById('login').style.display = 'none';
                    document.getElementById('isLoggedIn').style.display = 'block';
                    document.getElementById(
                        'isLoggedIn',
                    ).innerHTML = `<h1>You're logged in!</h1><br><button id="exit">Exit</button>`;
                    document.getElementById('exit').addEventListener('click', () => {
                        document.getElementById('isLoggedIn').style.display = 'none';
                        document.getElementById('login').style.display = 'block';
                        sessionStorage.setItem('isLoggedIn', false);
                    });
                } else {
                    alert('Wrong email or password!');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
});
