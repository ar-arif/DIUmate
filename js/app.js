// Wait for the DOM content to be fully loaded before executing
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all core modules
    Storage.loadTasks();        // Load saved tasks from localStorage
    Calendar.init();            // Initialize the calendar component
    Modal.init();               // Initialize the modal component
    TaskList.render();          // Render the task list
    Reminder.requestPermission(); // Request notification permissions
    
    // Get DOM elements for completed tasks toggle functionality
    const toggleCompletedBtn = document.getElementById('toggleCompleted');
    const completedList = document.getElementById('completedList');
    
    // Add click event listener to toggle completed tasks visibility
    toggleCompletedBtn.addEventListener('click', () => {
        completedList.classList.toggle('collapsed');        // Toggle collapsed class on completed list
        toggleCompletedBtn.classList.toggle('collapsed');   // Toggle collapsed class on button
    });
}); 