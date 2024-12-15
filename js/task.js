// Define utility object for task-related helper functions
const TaskUtils = {
    // Method to format time from 24h to 12h format
    formatTime(time) {
        // If no time provided, return default message
        if (!time) return 'No time';
        
        // Split the time string into hours and minutes (e.g. "14:30" -> ["14", "30"])
        const timeParts = time.split(':');
        // Convert hours string to number
        let hours = parseInt(timeParts[0]);
        // Get minutes part
        const minutes = timeParts[1];
        // Determine if it's AM or PM based on hours
        const ampm = hours >= 12 ? 'PM' : 'AM';
        // Convert to 12-hour format (e.g. 14 -> 2)
        hours = hours % 12 || 12;
        // Return formatted time string (e.g. "2:30 PM")
        return `${hours}:${minutes} ${ampm}`;
    }
};

// Define object for managing task list display
const TaskList = {
    // Method to render all tasks in the list
    render() {
        // Get container elements for pending and completed tasks
        const taskList = document.getElementById('taskList');
        const completedList = document.getElementById('completedList');
        // Clear existing content from both containers
        taskList.innerHTML = '';
        completedList.innerHTML = '';

        // Arrays to store tasks by completion status
        const pendingTasks = [];
        const completedTasks = [];

        // Loop through each date in storage
        for (const dateKey in Storage.tasks) {
            // Loop through each task for this date
            Storage.tasks[dateKey].forEach((task, index) => {
                // Create task item object with metadata
                const taskItem = {
                    date: new Date(dateKey),  // Convert date string to Date object
                    dateKey: dateKey,         // Keep original date string
                    task: task,               // The task data
                    index: index              // Position in array
                };
                
                // Sort task into appropriate array based on completion status
                if (task.completed) {
                    completedTasks.push(taskItem);
                } else {
                    pendingTasks.push(taskItem);
                }
            });
        }

        // Sort pending tasks by date (ascending)
        pendingTasks.sort((a, b) => a.date - b.date);
        // Sort completed tasks by date (descending)
        completedTasks.sort((a, b) => b.date - a.date);

        // Render each pending task
        pendingTasks.forEach(item => this.renderItem(taskList, item, false));
        // Render each completed task
        completedTasks.forEach(item => this.renderItem(completedList, item, true));
    },

    // Method to render a single task item
    renderItem(container, { dateKey, task, index, date }, isCompleted) {
        // Create main task element
        const taskEl = document.createElement('div');
        // Add base task class
        taskEl.classList.add('task-list-item');
        // Add completed class if task is completed
        if (isCompleted || task.completed) {
            taskEl.classList.add('completed');
        }

        // Format the date for display
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'short',  // e.g., "Mon"
            month: 'short',    // e.g., "Jan"
            day: 'numeric'     // e.g., "1"
        });

        // Create checkbox for task completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.classList.add('task-checkbox');
        // Add change listener to handle task completion
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;  // Update completion status
            Storage.saveTasks(Storage.tasks);   // Save changes
            Calendar.render(Calendar.currentDate); // Refresh calendar
            TaskList.render();                    // Refresh task list
        });

        // Create container for task content
        const content = document.createElement('div');
        content.classList.add('task-content');
        // Add task details to content
        content.innerHTML = `
            <div class="task-list-date">${formattedDate}</div>
            <div class="task-list-type">${task.type}</div>
            ${task.time ? `<div class="task-list-time">${TaskUtils.formatTime(task.time)}</div>` : ''}
            <div class="task-list-title">${task.title}</div>
        `;

        // Add click handler to open edit modal
        content.addEventListener('click', () => {
            Calendar.navigateToDate(date);     // Navigate to task date
            Modal.openEdit(task, dateKey, index); // Open edit modal
        });

        // Assemble task element
        taskEl.appendChild(checkbox);    // Add checkbox
        taskEl.appendChild(content);     // Add content
        container.appendChild(taskEl);   // Add to container
    }
}; 