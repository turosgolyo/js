document.addEventListener('DOMContentLoaded', () => {
  const albumForm = document.getElementById('album-form');
  const albumsTableBody = document.querySelector('#albums-table tbody');
  const formTitle = document.getElementById('form-title');
  const submitBtn = document.getElementById('submit-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const albumIdInput = document.getElementById('album-id');

  function loadAlbums() {
    fetch('/api/albums')
      .then(response => response.json())
      .then(albums => {
        albumsTableBody.innerHTML = '';
        albums.forEach(album => {
          const tr = document.createElement('tr');
          tr.dataset.id = album.id;
          tr.innerHTML = `
            <td>${album.band}</td>
            <td>${album.albumTitle}</td>
            <td>
              <button class="edit-btn" data-id="${album.id}">Edit</button>
              <button class="delete-btn" data-id="${album.id}">Delete</button>
            </td>
          `;
          albumsTableBody.appendChild(tr);
        });

        albumsTableBody.querySelectorAll('tr').forEach(row => {
          row.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            const id = row.dataset.id;
            const existingDetailsRow = document.getElementById('details-' + id);
            if (existingDetailsRow) {
              existingDetailsRow.remove();
              return;
            }
            fetch('/api/albums/' + id)
              .then(res => {
                if (!res.ok) throw new Error('Album not found');
                return res.json();
              })
              .then(album => {
                const detailsRow = document.createElement('tr');
                detailsRow.id = 'details-' + id;
                const detailsCell = document.createElement('td');
                detailsCell.colSpan = 3;
                detailsCell.style.backgroundColor = '#222';
                detailsCell.style.padding = '10px 15px';
                detailsCell.style.borderBottom = '1px solid #333';
                detailsCell.innerHTML = `
                  <div class="details-content">
                    <strong>Year:</strong> ${album.year || 'N/A'}<br/>
                    <strong>Genre:</strong> ${album.genre || 'N/A'}
                  </div>
                `;
                detailsRow.appendChild(detailsCell);
                row.parentNode.insertBefore(detailsRow, row.nextSibling);
              })
              .catch(err => alert(err));
          });
        });
      })
      .catch(err => alert('Error loading albums: ' + err));
  }

  function clearForm() {
    albumIdInput.value = '';
    albumForm.band.value = '';
    albumForm.albumTitle.value = '';
    albumForm.year.value = '';
    albumForm.genre.value = '';
    formTitle.textContent = 'Add New Album';
    submitBtn.textContent = 'Add Album';
    cancelBtn.style.display = 'none';
  }

  function fillForm(album) {
    albumIdInput.value = album.id;
    albumForm.band.value = album.band;
    albumForm.albumTitle.value = album.albumTitle;
    albumForm.year.value = album.year || '';
    albumForm.genre.value = album.genre || '';
    formTitle.textContent = 'Edit Album';
    submitBtn.textContent = 'Update Album';
    cancelBtn.style.display = 'inline';
  }

  albumForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = albumIdInput.value;
    const albumData = {
      band: albumForm.band.value.trim(),
      albumTitle: albumForm.albumTitle.value.trim(),
      year: albumForm.year.value ? parseInt(albumForm.year.value) : null,
      genre: albumForm.genre.value.trim()
    };

    if (!albumData.band || !albumData.albumTitle) {
      alert('Band and Album Title are required.');
      return;
    }

    if (id) {
      fetch('/api/albums/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(albumData)
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to update album');
          return res.json();
        })
        .then(() => {
          clearForm();
          loadAlbums();
        })
        .catch(err => {
          alert(err);
        });
    } else {
      fetch('/api/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(albumData)
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to add album');
          return res.json();
        })
        .then(() => {
          clearForm();
          loadAlbums();
        })
        .catch(err => {
          alert(err);
        });
    }
  });

  cancelBtn.addEventListener('click', () => {
    clearForm();
  });

  albumsTableBody.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains('edit-btn')) {
      fetch('/api/albums/' + id)
        .then(res => {
          if (!res.ok) throw new Error('Album not found');
          return res.json();
        })
        .then(album => {
          fillForm(album);
        })
        .catch(err => alert(err));
    } else if (e.target.classList.contains('delete-btn')) {
      if (confirm('Are you sure you want to delete this album?')) {
        fetch('/api/albums/' + id, { method: 'DELETE' })
          .then(res => {
            if (!res.ok) throw new Error('Failed to delete album');
            return res.json();
          })
          .then(() => {
            loadAlbums();
          })
          .catch(err => alert(err));
      }
    }
  });

  loadAlbums();
});
