// Handle browser notifications
const NotificationManager = {
    // Request permission to show notifications
    init() {
        if ('Notification' in window) {
            Notification.requestPermission();
        }
    },

    // Show a notification for a task
    notify(title, message) {
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: '/favicon.ico'
            });
        }
    },

    // Schedule a reminder notification
    scheduleReminder(task, reminderTime) {
        const now = new Date().getTime();
        const delay = reminderTime.getTime() - now;

        if (delay > 0) {
            setTimeout(() => {
                this.notify(
                    'Task Reminder',
                    `${formatDate(reminderTime)} at ${formatTime(task.time)}\n${task.type}: ${task.title}`
                );
            }, delay);
        }
    }
}; 