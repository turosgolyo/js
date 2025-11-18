const validateForm = () => {
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
};

document.getElementById('registerButton').addEventListener('click', () => {
    if (validateForm()) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json().then((data) => ({ status: response.status, data })))
            .then(({ status }) => {
                if (status === 201) {
                    alert('Registration successful!');
                    window.location.href = '/pages/login.html';
                } else {
                    alert('Registration failed!');
                }
            })
            .catch((error) => {
                console.error(error);
                alert('Registration failed: ' + (error.message || 'Network error'));
            });
    }
});
