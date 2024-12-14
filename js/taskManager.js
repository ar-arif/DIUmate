// Manage all task-related operations
class TaskManager {
    constructor() {
        this.tasks = {};
        this.loadTasks();
    }

    // Load tasks from localStorage
    loadTasks() {
        const saved = localStorage.getItem('calendarTasks');
        this.tasks = saved ? JSON.parse(saved) : {};
    }

    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem('calendarTasks', JSON.stringify(this.tasks));
        this.renderTaskLists();
    }

    // Add a new task
    addTask(date, task) {
        if (!this.tasks[date]) {
            this.tasks[date] = [];
        }
        this.tasks[date].push(task);
        this.saveTasks();
    }

    // Update existing task
    updateTask(date, index, task) {
        this.tasks[date][index] = task;
        this.saveTasks();
    }

    // Delete a task
    deleteTask(date, index) {
        this.tasks[date].splice(index, 1);
        if (this.tasks[date].length === 0) {
            delete this.tasks[date];
        }
        this.saveTasks();
    }

    // Get tasks separated by completion status
    getTasksByStatus() {
        const pending = [];
        const completed = [];

        Object.keys(this.tasks).forEach(date => {
            this.tasks[date].forEach((task, index) => {
                const taskInfo = { date, task, index };
                if (task.completed) {
                    completed.push(taskInfo);
                } else {
                    pending.push(taskInfo);
                }
            });
        });

        return { pending, completed };
    }
} 