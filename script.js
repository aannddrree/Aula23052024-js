document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('activity-form');
    const tableBody = document.querySelector('#activity-table tbody');

    // Carregar atividades da Session Storage ao carregar a página
    loadActivities();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const id = document.getElementById('activity-id').value;
        const desc = document.getElementById('activity-desc').value;
        const date = document.getElementById('activity-date').value;

        if (id && desc && date) {
            const activity = { id, desc, date };
            addActivityToTable(activity);
            saveActivity(activity);
            form.reset();
        }
    });

    function loadActivities() {
        const activities = JSON.parse(sessionStorage.getItem('activities')) || [];
        activities.forEach(activity => addActivityToTable(activity));
    }

    function addActivityToTable(activity) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${activity.id}</td>
            <td>${activity.desc}</td>
            <td>${activity.date}</td>
            <td><button class="delete-btn" data-id="${activity.id}">Excluir</button></td>
        `;
        tableBody.appendChild(row);
    }

    function saveActivity(activity) {
        const activities = JSON.parse(sessionStorage.getItem('activities')) || [];
        activities.push(activity);
        sessionStorage.setItem('activities', JSON.stringify(activities));
    }

    tableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const id = event.target.getAttribute('data-id');
            removeActivity(id);
            event.target.parentElement.parentElement.remove();
        }
    });

    function removeActivity(id) {
        const activities = JSON.parse(sessionStorage.getItem('activities')) || [];
        const filteredActivities = activities.filter(activity => activity.id !== id);
        sessionStorage.setItem('activities', JSON.stringify(filteredActivities));
    }
});
