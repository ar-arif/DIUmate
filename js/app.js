document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Storage.loadTasks();
    Calendar.init();
    Modal.init();
    TaskList.render();
    Reminder.requestPermission();

    // Setup completed tasks toggle
    const toggleCompletedBtn = document.getElementById('toggleCompleted');
    const completedList = document.getElementById('completedList');

    toggleCompletedBtn.addEventListener('click', () => {
        completedList.classList.toggle('collapsed');
        toggleCompletedBtn.classList.toggle('collapsed');
    });
}); 