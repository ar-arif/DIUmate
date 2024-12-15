// Storage handling object for managing tasks
const Storage = {
    tasks: {},  // Object to store all tasks in memory

    // Load tasks from localStorage
    loadTasks() {
        const storedTasks = localStorage.getItem('calendarTasks');  // Get tasks from localStorage
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);  // Parse stored JSON string to object
        }
        return this.tasks;
    },

    // Save tasks to localStorage
    saveTasks(tasks) {
        this.tasks = tasks;  // Update tasks in memory
        localStorage.setItem('calendarTasks', JSON.stringify(tasks));  // Save to localStorage
        TaskList.render();  // Re-render task list to reflect changes
    }
}; 