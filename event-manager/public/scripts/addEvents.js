document.getElementById('save-event-button').addEventListener('click', () => {
    const name = document.getElementById('floatingEventName').value;
    const date = document.getElementById('floatingDate').value;
    const location = document.getElementById('floatingLocation').value;
    const description = document.getElementById('floatingDescription').value;

    fetch('/api/events', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, date, location, description }),
    })
        .then((response) => response.json().then((data) => ({ status: response.status, data })))
        .then(({ status }) => {
            if (status === 201) {
                alert('Event saved!');
            } else {
                alert('Something went wrong!');
            }
        })
        .catch((error) => {
            console.error(error);
            alert('Save failed: ' + (error.message || 'Network error'));
        });
});
