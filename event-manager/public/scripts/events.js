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
