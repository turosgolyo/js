const apiUrl = 'http://localhost:3000/timetable';
const timetableTable = document.getElementById('timetable-table').getElementsByTagName('tbody')[0];

async function loadTimetable() {
    const response = await fetch(apiUrl);
    const timetable = await response.json();

    timetableTable.innerHTML = '';

    const days = [...new Set(timetable.map(item => item.day))];
    const times = [...new Set(timetable.map(item => Number(item.period)))].sort((a, b) => a - b);

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
            cell.textContent = timetableMap[day][period] || '';
        });
    });
}

loadTimetable();

const addClassButton = document.getElementById('addClassButton');
const addClassFormDiv = document.getElementById('addClassForm');
const cancelAddClassButton = document.getElementById('cancelAddClass');
const classForm = document.getElementById('classForm');
const refreshButton = document.getElementById('refresh');

addClassButton.addEventListener('click', () => {
    addClassFormDiv.style.display = 'block';
});

cancelAddClassButton.addEventListener('click', () => {
    addClassFormDiv.style.display = 'none';
});

classForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const day = classForm.day.value;
    const period = parseInt(classForm.period.value);
    const subject = classForm.subject.value;

    // Check if the cell is already filled
    const timetableRows = timetableTable.rows;
    for (let i = 0; i < timetableRows.length; i++) {
        const row = timetableRows[i];
        const dayCell = row.cells[0].textContent;
        if (dayCell === day) {
            const cell = row.cells[period]; // period corresponds to the cell index for the period
            if (cell && cell.textContent.trim() !== '') {
                alert('Ez az időpont már foglalt. Kérjük, válassz másik időpontot.');
                return; // Cancel upload
            }
            break;
        }
    }

    const formData = {
        day: day,
        period: period,
        subject: subject
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            addClassFormDiv.style.display = 'none';
            classForm.reset();
            loadTimetable();
        } else {
            alert('Hiba történt az óra hozzáadása során.');
        }
    } catch (error) {
        alert('Hiba történt az óra hozzáadása során.');
        console.error(error);
    }
});

refreshButton.addEventListener('click', () => {
    loadTimetable();
});
