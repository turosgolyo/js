 const apiUrl = 'http://localhost:3000/timetable'
 const timetableTable = document.getElementById('timetable-table').getElementsByTagName('tbody')[0];

async function loadTimetable() {
    const response = await fetch(apiUrl);
    const timetable = await response.json();
    const arr = Array.from(timetable);

    timetableTable.innerHTML = '';

    arr.forEach(item => {
        const row = timetableTable.insertRow();
        row.innerHTML = `
            <td>${item.day}</td>
            <td>${item.time}</td>
            <td>${item.subject}</td>
            <td><button onclick="deleteClass(${item.id})">Törlés</button></td>
        `;
    });
}

loadTimetable();