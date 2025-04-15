const apiUrl = 'http://localhost:3000/timetable';
const timetableTable = document.getElementById('timetable-table').getElementsByTagName('tbody')[0];

async function loadTimetable() {
    const response = await fetch(apiUrl);
    const timetable = await response.json();

    timetableTable.innerHTML = '';

    const days = [...new Set(timetable.map(item => item.day))];
    const maxPeriod = 8;
    const times = [];
    for (let i = 1; i <= maxPeriod; i++) {
        times.push(i);
    }

    const timetableMap = {};
    timetable.forEach(item => {
        if (!timetableMap[item.day]) {
            timetableMap[item.day] = {};
        }
        timetableMap[item.day][Number(item.period)] = item.subject;
    });

    days.forEach(day => {
        const row = timetableTable.insertRow();
        const dayCell = row.insertCell();
        dayCell.textContent = day;

        times.forEach(period => {
            const cell = row.insertCell();
            const subject = timetableMap[day][period] || '';
                cell.textContent = subject;

                if (subject) {
                    const buttonGroup = document.createElement('div');
                    buttonGroup.className = 'button-group';

                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.dataset.day = day;
                    editButton.dataset.period = period;
                    editButton.addEventListener('click', async (event) => {
                        event.stopPropagation();
                        const newSubject = prompt(`Edit class subject for ${day} period ${period}:`, subject);
                        if (newSubject !== null && newSubject.trim() !== '') {
                            try {
                                const response = await fetch(apiUrl, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ day: day, period: period, subject: newSubject.trim() })
                                });
                                if (response.ok) {
                                    loadTimetable();
                                } else {
                                    alert('Failed to update class.');
                                }
                            } catch (error) {
                                alert('Error updating class.');
                                console.error(error);
                            }
                        }
                    });

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.dataset.day = day;
                    deleteButton.dataset.period = period;
                    deleteButton.addEventListener('click', async (event) => {
                        event.stopPropagation();
                        if (confirm(`Delete class ${subject} on ${day} period ${period}?`)) {
                            try {
                                const deleteResponse = await fetch(apiUrl, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ day: day, period: period })
                                });
                                if (deleteResponse.ok) {
                                    loadTimetable();
                                } else {
                                    alert('Failed to delete class.');
                                }
                            } catch (error) {
                                alert('Error deleting class.');
                                console.error(error);
                            }
                        }
                    });

                    buttonGroup.appendChild(editButton);
                    buttonGroup.appendChild(deleteButton);
                    cell.appendChild(buttonGroup);
                } else {
                    const createButton = document.createElement('button');
                    createButton.textContent = 'Create';
                    createButton.dataset.day = day;
                    createButton.dataset.period = period;
                    createButton.addEventListener('click', async (event) => {
                        event.stopPropagation();
                        const newSubject = prompt(`Enter class subject for ${day} period ${period}:`);
                        if (newSubject !== null && newSubject.trim() !== '') {
                            try {
                                const response = await fetch(apiUrl, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ day: day, period: period, subject: newSubject.trim() })
                                });
                                if (response.ok) {
                                    loadTimetable();
                                } else {
                                    alert('Failed to add class.');
                                }
                            } catch (error) {
                                alert('Error adding class.');
                                console.error(error);
                            }
                        }
                    });
                    cell.appendChild(createButton);
                }
        });
    });
}

loadTimetable();
