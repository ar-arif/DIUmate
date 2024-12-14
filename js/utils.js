// Format time from 24h to 12h format
function formatTime(timeString) {
    if (!timeString) return 'No time';
    
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    
    return `${formattedHour}:${minutes} ${ampm}`;
}

// Format date to readable string
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
}

// Calculate time for reminders
function calculateReminderTime(taskDate, taskTime, reminderType) {
    const taskDateTime = new Date(taskDate);
    const [hours, minutes] = taskTime.split(':');
    taskDateTime.setHours(parseInt(hours), parseInt(minutes));
    
    const delays = {
        '1hr': 60 * 60 * 1000,
        '2hr': 2 * 60 * 60 * 1000,
        '1day': 24 * 60 * 60 * 1000
    };
    
    return new Date(taskDateTime.getTime() - delays[reminderType]);
} 