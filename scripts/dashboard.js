const dashboardViewBtn = document.getElementById("dashboard-view-btn");

dashboardViewBtn.addEventListener("click", () => {
  renderDashboard();
});

function renderDashboard() {
  mainContent.innerHTML = `
    <h2>Academic Progress</h2>
    <div>
      <p>Attendance: 90%</p>
      <p>Quizzes: 85%</p>
      <p>Assignments: 75%</p>
      <canvas id="progressChart"></canvas>
    </div>
  `;

  generateChart();
}

function generateChart() {
  const ctx = document.getElementById("progressChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Attendance", "Quizzes", "Assignments"],
      datasets: [
        {
          label: "Progress (%)",
          data: [90, 85, 75],
          backgroundColor: ["#4caf50", "#ff9800", "#f44336"]
        }
      ]
    }
  });
}
