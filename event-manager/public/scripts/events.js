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
