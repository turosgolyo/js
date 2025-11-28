const cards = document.getElementById('cards');

const loadRegistrations = () => {
    fetch(`/api/registrations/user/${localStorage.getItem('userId')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json().then((data) => ({ status: response.status, data })))
        .then(({ status, data }) => {
            if (status === 200) {
                cards.innerHTML = '';
                data.forEach((event) => {
                    loadEventById(event.event_id);
                });
            }
        });
};

const loadEventById = (id) => {
    fetch(`/api/events/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json().then((data) => ({ status: response.status, data })))
        .then(({ status, data }) => {
            if (status === 200) {
                const card = document.createElement('div');
                card.classList.add('col-lg-6', 'col-md-6', 'col-sm-12', 'mb-2');
                card.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${data.name}</h5>
                                <p class="card-text">${data.description}</p>
                                <p>${data.location} - ${data.date}</p>
                            </div>
                        </div>
                    `;

                cards.appendChild(card);
            }
        })
        .catch((error) => {
            console.error('Error loading registrations:', error);
        });
};
document.addEventListener('DOMContentLoaded', loadRegistrations);
