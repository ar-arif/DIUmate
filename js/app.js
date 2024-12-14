// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    NotificationManager.init();
    
    const taskManager = new TaskManager();
    const calendar = new Calendar();
    const modal = new Modal();
    
    // Make components globally accessible
    window.app = {
        taskManager,
        calendar,
        modal
    };
    
    // Set up completed tasks toggle
    document.getElementById('toggleCompleted').onclick = () => {
        document.getElementById('completedList').classList.toggle('collapsed');
    };
    
    // Initial render
    calendar.render();
    taskManager.renderTaskLists();
}); 