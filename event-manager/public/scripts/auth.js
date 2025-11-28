let isLoggedIn = false;

const eventsLink = document.getElementById('events-link');
const registrationsLink = document.getElementById('registrations-link');
const profileLink = document.getElementById('profile-link');
const loginLink = document.getElementById('login-link');
const logoutLink = document.getElementById('logout-link');
const registerLink = document.getElementById('register-link');

logoutLink.addEventListener('click', () => {
    fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json().then((data) => ({ status: response.status, data })))
        .then(({ status }) => {
            if (status === 200) {
                isLoggedIn = false;
                alert('Successfully logged out!');
                updateNavLinks();
                updateElements();
                window.location.href = '/pages/main.html';
            } else {
                alert('Logout failed!');
            }
        });
});

try {
    fetch('/api/user', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json().then((data) => ({ status: response.status, data })))
        .then(({ status, data }) => {
            if (status === 200) {
                isLoggedIn = true;
                localStorage.setItem('userId', data.id);
                localStorage.setItem('userEmail', data.email);
            } else {
                isLoggedIn = false;
            }
            updateNavLinks();
            updateElements();
        });
} catch (error) {
    console.error('Error fetching user data:', error);
    isLoggedIn = false;
    updateNavLinks();
}

function updateNavLinks() {
    if (isLoggedIn) {
        loginLink.classList.add('disabled');

        registerLink.classList.add('disabled');

        eventsLink.classList.remove('disabled');

        registrationsLink.classList.remove('disabled');

        profileLink.style.display = 'block';
        logoutLink.style.display = 'block';
    } else {
        isLoggedIn = false;

        loginLink.classList.remove('disabled');
        registerLink.classList.remove('disabled');

        eventsLink.classList.add('disabled');

        registrationsLink.classList.add('disabled');

        profileLink.style.display = 'none';
        logoutLink.style.display = 'none';
    }
}

function updateElements() {
    const disableAfterLoginElements = document.getElementsByClassName('disableAfterLogin');
    const mainContent = document.getElementById('main-content');

    if (isLoggedIn) {
        Array.from(disableAfterLoginElements).forEach((element) => {
            element.style.display = 'none';
        });
        mainContent.innerHTML = `
        <div class="main-title col-lg-4 col-md-6 col-sm-10 p-5">
            <h1>You're logged in!</h1>
            <h3>Use the navigation bar to explore!</h3>
        </div>
    `;
    } else {
        Array.from(disableAfterLoginElements).forEach((element) => {
            element.style.display = 'block';
        });
    }
}
