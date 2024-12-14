const Calendar = {
    currentDate: new Date(),
    selectedDate: null,

    init() {
        this.calendarDates = document.getElementById('calendarDates');
        this.monthYear = document.getElementById('monthYear');
        this.prevMonthBtn = document.getElementById('prevMonth');
        this.nextMonthBtn = document.getElementById('nextMonth');
        
        this.setupEventListeners();
        this.render(this.currentDate);
    },

    setupEventListeners() {
        this.prevMonthBtn.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.render(this.currentDate);
        });

        this.nextMonthBtn.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.render(this.currentDate);
        });
    },

    render(date) {
        this.calendarDates.innerHTML = '';
        const year = date.getFullYear();
        const month = date.getMonth();

        const options = { month: 'long', year: 'numeric' };
        this.monthYear.textContent = date.toLocaleDateString(undefined, options);

        const firstDay = (new Date(year, month, 1).getDay() + 1) % 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

        for (let i = 0; i < 42; i++) {
            const cell = document.createElement('div');
            if (i >= firstDay && i < firstDay + daysInMonth) {
                const day = i - firstDay + 1;
                const cellDate = new Date(year, month, day);
                const dateKey = cellDate.toDateString();
                
                cell.innerHTML = `<span class="date-number">${day}</span>`;

                if (Storage.tasks[dateKey]) {
                    this.renderCellTasks(cell, dateKey);
                }

                if (isCurrentMonth && day === today.getDate()) {
                    cell.classList.add('today');
                }

                cell.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('task') && 
                        !e.target.classList.contains('task-time') && 
                        !e.target.classList.contains('tooltip')) {
                        this.selectedDate = dateKey;
                        Modal.open();
                    }
                });
            } else {
                cell.style.backgroundColor = '#f1f3f4';
            }
            this.calendarDates.appendChild(cell);
        }
    },

    renderCellTasks(cell, dateKey) {
        Storage.tasks[dateKey].forEach((task, index) => {
            const taskEl = document.createElement('div');
            taskEl.classList.add('task');
            if (task.completed) {
                taskEl.classList.add('completed');
            }

            taskEl.innerHTML = `
                <span class="task-type">${task.type}</span>
                ${task.time ? `<span class="task-time">${TaskUtils.formatTime(task.time)}</span>` : ''}
                <p class="task-title">${task.title}</p>
            `;

            taskEl.addEventListener('click', (e) => {
                e.stopPropagation();
                Modal.openEdit(task, dateKey, index);
            });

            if (task.description) {
                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.textContent = `Title: ${task.title}\nType: ${task.type}\nTime: ${task.time || 'N/A'}\nDescription: ${task.description}`;
                taskEl.appendChild(tooltip);
            }

            cell.appendChild(taskEl);
        });
    },

    navigateToDate(date) {
        this.currentDate = new Date(date);
        this.render(this.currentDate);
    }
}; 