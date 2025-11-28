const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const desc = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    fetch('/api/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            description: desc,
            location: location,
            date: date,
        }),
    }).then((response) => {
        if (response.status === 201) {
            alert('Save successful!');
        } else {
            alert('Save failed!');
        }
    });
});
