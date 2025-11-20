const validateForm = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (email === '' || password === '') {
        alert('All fields are required!');
        return false;
    } else {
        return true;
    }
};
document.getElementById('loginButton').addEventListener('click', () => {
    if (validateForm()) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json().then((data) => ({ status: response.status, data })))
            .then(({ status }) => {
                if (status === 200) {
                    alert('Successful login!');
                    window.location.href = '/pages/main.html';
                } else {
                    alert('Wrong email or password!');
                }
            })
            .catch((error) => {
                console.error(error);
                alert('Login failed: ' + (error.message || 'Network error'));
            });
    }
});
