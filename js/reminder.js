const Reminder = {
    requestPermission() {
        if ('Notification' in window) {
            Notification.requestPermission();
        }
    },

    schedule(taskData, reminderTime) {
        if (!('Notification' in window) || Notification.permission !== 'granted') {
            console.log('Notifications not supported or permission not granted');
            return;
        }

        const now = new Date().getTime();
        const reminderTimeMs = new Date(reminderTime).getTime();
        const delay = reminderTimeMs - now;

        if (delay > 0) {
            setTimeout(() => {
                const taskDate = new Date(reminderTime);
                const formattedDate = taskDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                });
                
                const formattedTime = TaskUtils.formatTime(taskData.time);

                new Notification('Task Reminder', {
                    body: `${formattedDate} at ${formattedTime}\n${taskData.type}: ${taskData.title}`,
                    icon: '/favicon.ico'
                });
            }, delay);
        }
    },

    calculateTimes(taskDate, taskTime) {
        if (!taskTime) return null;
        
        const dateTime = new Date(taskDate);
        const [hours, minutes] = taskTime.split(':');
        dateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        return {
            oneHour: new Date(dateTime.getTime() - (60 * 60 * 1000)),
            twoHours: new Date(dateTime.getTime() - (2 * 60 * 60 * 1000)),
            oneDay: new Date(dateTime.getTime() - (24 * 60 * 60 * 1000))
        };
    }
}; 