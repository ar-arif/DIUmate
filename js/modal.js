const Modal = {
    init() {
        this.modal = document.getElementById('taskModal');
        this.closeBtn = document.getElementsByClassName('close')[0];
        this.saveBtn = document.getElementById('saveTask');
        this.deleteBtn = document.getElementById('deleteTask');
        this.setupEventListeners();
    },

    setupEventListeners() {
        this.closeBtn.onclick = () => this.close();
        this.saveBtn.onclick = () => this.saveTask();
        this.deleteBtn.onclick = () => this.deleteTask();
        window.onclick = (event) => {
            if (event.target == this.modal) {
                this.close();
            }
        };

        const reminderRadios = document.querySelectorAll('input[name="reminderType"]');
        reminderRadios.forEach(radio => {
            radio.addEventListener('change', () => this.handleReminderChange(radio));
        });
    },

    open() {
        this.modal.style.display = 'block';
        this.clearInputs();
    },

    close() {
        this.modal.style.display = 'none';
        this.clearInputs();
    },

    clearInputs() {
        document.getElementById('modalTitle').textContent = 'Add Task';
        document.getElementById('taskId').value = '';
        document.getElementById('taskDate').value = '';
        document.getElementById('deleteTask').style.display = 'none';
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskType').value = '';
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskTime').value = '';
        document.querySelector('input[value="none"]').checked = true;
        document.querySelector('.custom-reminder').style.display = 'none';
        document.getElementById('customReminderDateTime').value = '';
        document.getElementById('taskCompletionStatus').checked = false;
    },

    openEdit(task, dateKey, index) {
        document.getElementById('modalTitle').textContent = 'Edit Task';
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskType').value = task.type;
        document.getElementById('taskDescription').value = task.description || '';
        document.getElementById('taskTime').value = task.time || '';
        document.getElementById('taskCompletionStatus').checked = task.completed || false;
        document.getElementById('taskId').value = index;
        document.getElementById('taskDate').value = dateKey;
        document.getElementById('deleteTask').style.display = 'inline-block';

        if (task.reminder) {
            const reminderType = task.reminder.type;
            document.querySelector(`input[value="${reminderType}"]`).checked = true;
            
            if (reminderType === 'custom') {
                document.querySelector('.custom-reminder').style.display = 'block';
                document.getElementById('customReminderDateTime').value = task.reminder.customDateTime || '';
            }
        }

        this.modal.style.display = 'block';
    },

    handleReminderChange(radio) {
        const customReminderDiv = document.querySelector('.custom-reminder');
        const taskTimeInput = document.getElementById('taskTime');

        if (radio.value === 'custom') {
            customReminderDiv.style.display = 'block';
        } else {
            customReminderDiv.style.display = 'none';
        }
        
        if (['1hr', '2hr', '1day'].includes(radio.value) && !taskTimeInput.value) {
            alert('Please set a task time first to use this reminder option.');
            document.querySelector('input[value="none"]').checked = true;
        }
    },

    saveTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const type = document.getElementById('taskType').value;
        const description = document.getElementById('taskDescription').value.trim();
        const time = document.getElementById('taskTime').value;
        const taskId = document.getElementById('taskId').value;
        const taskDate = document.getElementById('taskDate').value || Calendar.selectedDate;
        const completed = document.getElementById('taskCompletionStatus').checked;

        if (!title || !type) {
            alert('Title and type are required.');
            return;
        }

        const selectedReminder = document.querySelector('input[name="reminderType"]:checked').value;
        
        if (['1hr', '2hr', '1day'].includes(selectedReminder) && !time) {
            alert('Please set a time for the task to enable this reminder option.');
            return;
        }

        const taskData = {
            title,
            type,
            description,
            time,
            completed,
            reminder: {
                type: selectedReminder,
                customDateTime: selectedReminder === 'custom' ? 
                    document.getElementById('customReminderDateTime').value : null
            }
        };

        if (taskId !== '') {
            Storage.tasks[taskDate][parseInt(taskId)] = taskData;
        } else {
            if (!Storage.tasks[taskDate]) {
                Storage.tasks[taskDate] = [];
            }
            Storage.tasks[taskDate].push(taskData);
        }

        if (selectedReminder !== 'none') {
            let reminderTime;
            
            if (selectedReminder === 'custom') {
                reminderTime = new Date(taskData.reminder.customDateTime);
            } else {
                const taskDateTime = new Date(taskDate);
                const [hours, minutes] = time.split(':');
                taskDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                
                const reminderTimes = Reminder.calculateTimes(taskDate, time);
                switch (selectedReminder) {
                    case '1hr': reminderTime = reminderTimes.oneHour; break;
                    case '2hr': reminderTime = reminderTimes.twoHours; break;
                    case '1day': reminderTime = reminderTimes.oneDay; break;
                }
            }
            
            if (reminderTime) {
                Reminder.schedule(taskData, reminderTime);
            }
        }

        Storage.saveTasks(Storage.tasks);
        Calendar.render(Calendar.currentDate);
        TaskList.render();
        this.close();
    },

    deleteTask() {
        const confirmDelete = confirm('Are you sure you want to delete this task?');
        
        if (confirmDelete) {
            const taskId = document.getElementById('taskId').value;
            const taskDate = document.getElementById('taskDate').value;

            if (taskDate && Storage.tasks[taskDate]) {
                Storage.tasks[taskDate].splice(parseInt(taskId), 1);
                if (Storage.tasks[taskDate].length === 0) {
                    delete Storage.tasks[taskDate];
                }
                Storage.saveTasks(Storage.tasks);
                Calendar.render(Calendar.currentDate);
                TaskList.render();
                this.close();
            }
        }
    }
}; 