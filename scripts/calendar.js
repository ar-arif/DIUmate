const calendarViewBtn = document.getElementById("calendar-view-btn");
const mainContent = document.getElementById("main-content");

calendarViewBtn.addEventListener("click", () => {
  renderCalendar();
});

function renderCalendar() {
  const currentDate = new Date();
  let calendarHTML = `
    <h2>${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getFullYear()}</h2>
    <table>
      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody>
        ${generateCalendarDays(currentDate)}
      </tbody>
    </table>
  `;
  mainContent.innerHTML = calendarHTML;
}

function generateCalendarDays(date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  let daysHTML = "<tr>";

  for (let i = 0; i < firstDay; i++) {
    daysHTML += "<td></td>";
  }

  for (let day = 1; day <= totalDays; day++) {
    daysHTML += `<td>${day}</td>`;
    if ((day + firstDay) % 7 === 0) daysHTML += "</tr><tr>";
  }

  daysHTML += "</tr>";
  return daysHTML;
}
