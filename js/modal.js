// Handle task modal operations
class Modal {
    constructor() {
        this.modal = document.getElementById('taskModal');
        this.setupListeners();
    }

    // Set up event listeners
    setupListeners() {
        // Close button
        this.modal.querySelector('.close').onclick = () => this.close();
        
        // Save button
        document.getElementById('saveTask').onclick = () => this.saveTask();
        
        // Delete button
        document.getElementById('deleteTask').onclick = () => this.deleteTask();
    }

    // Open modal for new task
    openNew(date) {
        this.clearForm();
        document.getElementById('taskDate').value = date;
        document.getElementById('modalTitle').textContent = 'Add Task';
        this.modal.style.display = 'block';
    }

    // Open modal for editing
    openEdit(task, date, index) {
        this.fillForm(task);
        document.getElementById('taskDate').value = date;
        document.getElementById('taskId').value = index;
        document.getElementById('modalTitle').textContent = 'Edit Task';
        this.modal.style.display = 'block';
    }

    // Clear form fields
    clearForm() {
        // Form clearing logic
    }

    // Fill form with task data
    fillForm(task) {
        // Form filling logic
    }
} 