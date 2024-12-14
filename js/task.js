const TaskUtils = {
    formatTime(time) {
        if (!time) return 'No time';
        
        const timeParts = time.split(':');
        let hours = parseInt(timeParts[0]);
        const minutes = timeParts[1];
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    }
};

const TaskList = {
    render() {
        const taskList = document.getElementById('taskList');
        const completedList = document.getElementById('completedList');
        taskList.innerHTML = '';
        completedList.innerHTML = '';

        const pendingTasks = [];
        const completedTasks = [];

        for (const dateKey in Storage.tasks) {
            Storage.tasks[dateKey].forEach((task, index) => {
                const taskItem = {
                    date: new Date(dateKey),
                    dateKey: dateKey,
                    task: task,
                    index: index
                };
                
                if (task.completed) {
                    completedTasks.push(taskItem);
                } else {
                    pendingTasks.push(taskItem);
                }
            });
        }

        pendingTasks.sort((a, b) => a.date - b.date);
        completedTasks.sort((a, b) => b.date - a.date);

        pendingTasks.forEach(item => this.renderItem(taskList, item, false));
        completedTasks.forEach(item => this.renderItem(completedList, item, true));
    },

    renderItem(container, { dateKey, task, index, date }, isCompleted) {
        const taskEl = document.createElement('div');
        taskEl.classList.add('task-list-item');
        if (isCompleted || task.completed) {
            taskEl.classList.add('completed');
        }

        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.classList.add('task-checkbox');
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            Storage.saveTasks(Storage.tasks);
            Calendar.render(Calendar.currentDate);
            TaskList.render();
        });

        const content = document.createElement('div');
        content.classList.add('task-content');
        content.innerHTML = `
            <div class="task-list-date">${formattedDate}</div>
            <div class="task-list-type">${task.type}</div>
            ${task.time ? `<div class="task-list-time">${TaskUtils.formatTime(task.time)}</div>` : ''}
            <div class="task-list-title">${task.title}</div>
        `;

        content.addEventListener('click', () => {
            Calendar.navigateToDate(date);
            Modal.openEdit(task, dateKey, index);
        });

        taskEl.appendChild(checkbox);
        taskEl.appendChild(content);
        container.appendChild(taskEl);
    }
}; 