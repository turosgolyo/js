<<<<<<< HEAD
let events = [];
const cardsContainer = document.getElementById('cards');

try {
    fetch('/api/events', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then((response) =>
            response
                .json()
                .then((data) => (events = data))
                .then(() => loadEvents()),
        )
        .catch((error) => {
            console.error(error);
            alert('Load failed: ' + (error.message || 'Network error'));
        });
} catch (error) {
    console.error('Error fetching events data:', error);
}

function loadEvents() {
    cardsContainer.innerHTML = events
        .map((event) => {
            cardsContainer.innerHTML = `<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">
                    ${event.description}
                </p>
                <p class="card-text">
                    ${event.date}
                </p>
                <p class="card-text">
                    ${event.location}
                </p>
                <a href="#" class="btn btn-outline-secondary">Register</a>
            </div>
        </div>
    </div>`;
        })
        .join('');
}
=======
const cards = document.getElementById('cards');

const loadEvents = () => {
    fetch('/api/events', {
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
                    const card = document.createElement('div');
                    card.classList.add('col-lg-6', 'col-md-6', 'col-sm-12', 'mb-2');
                    card.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${event.name}</h5>
                                <p class="card-text">${event.description}</p>
                                <p>${event.location} - ${event.date}</p>
                                <button class="btn btn-outline-secondary register-btn" data-id="${event.id}">
                                    Register
                                </button>
                            </div>
                        </div>
                    `;

                    cards.appendChild(card);
                });

                // Attach click handlers after cards are added
                document.querySelectorAll('.register-btn').forEach((btn) => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        const eventId = btn.getAttribute('data-id');
                        registerToEvent(eventId, localStorage.getItem('userId'));
                    });
                });
            }
        })
        .catch((error) => {
            console.error('Error loading events:', error);
        });
};

// Example function for registering
function registerToEvent(eventId, userId) {
    fetch(`/api/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            eventId: eventId,
            userId: userId,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            alert(`Registered for event ID: ${eventId}`);
        })
        .catch((err) => console.error('Error registering:', err));
}

document.addEventListener('DOMContentLoaded', loadEvents);
>>>>>>> 4b603ea6ba4d51e1905026d41763c3e6b1e53c0e
