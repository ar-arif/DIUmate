// Storage handling
const Storage = {
    tasks: {},

    loadTasks() {
        const storedTasks = localStorage.getItem('calendarTasks');
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
        }
        return this.tasks;
    },

    saveTasks(tasks) {
        this.tasks = tasks;
        localStorage.setItem('calendarTasks', JSON.stringify(tasks));
        TaskList.render();
    }
}; 