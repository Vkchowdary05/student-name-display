/**
 * Lab Project 14: Student Names Display
 * Program to store and display the names of five students.
 */

// Initial array storing five student records
const defaultStudents = [
  { id: 1, name: "Alexander Wright", rollNo: "DEV-2024-001", course: "DevOps & Cloud", status: "Enrolled" },
  { id: 2, name: "Beatrice Chen", rollNo: "DEV-2024-002", course: "Site Reliability", status: "Enrolled" },
  { id: 3, name: "Clara Oswald", rollNo: "DEV-2024-003", course: "CI/CD Engineering", status: "Enrolled" },
  { id: 4, name: "David Kumar", rollNo: "DEV-2024-004", course: "Container Security", status: "Enrolled" },
  { id: 5, name: "Elena Rostova", rollNo: "DEV-2024-005", course: "Kubernetes Admin", status: "Enrolled" }
];

// Active state
let students = [...defaultStudents];

/**
 * Render student records to HTML table
 */
function renderStudents(list = students) {
  const tbody = document.getElementById("student-table-body");
  const countBadge = document.getElementById("student-count");

  if (!tbody) return;

  tbody.innerHTML = "";

  if (list.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `
      <td colspan="5" style="text-align: center; color: #71717a; padding: 24px;">
        No students found matching your query.
      </td>
    `;
    tbody.appendChild(emptyRow);
  } else {
    list.forEach((s, idx) => {
      const row = document.createElement("tr");
      row.setAttribute("data-testid", `student-row-${s.id}`);
      row.innerHTML = `
        <td style="color: #71717a; font-family: var(--font-mono);">${idx + 1}</td>
        <td class="student-name" data-testid="student-name-${s.id}">${s.name}</td>
        <td class="student-roll">${s.rollNo}</td>
        <td style="color: var(--text-secondary);">${s.course}</td>
        <td><span class="status-badge">${s.status}</span></td>
      `;
      tbody.appendChild(row);
    });
  }

  if (countBadge) {
    countBadge.textContent = list.length;
  }
}

/**
 * Filter students based on search input
 */
function handleSearch() {
  const query = document.getElementById("student-search-input").value.toLowerCase().trim();
  if (!query) {
    renderStudents(students);
    return;
  }

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(query) ||
    s.rollNo.toLowerCase().includes(query) ||
    s.course.toLowerCase().includes(query)
  );

  renderStudents(filtered);
}

/**
 * Toggle Add Student drawer
 */
function toggleAddModal() {
  const panel = document.getElementById("add-student-panel");
  if (panel) {
    panel.style.display = panel.style.display === "none" ? "flex" : "none";
  }
}

/**
 * Add a new student record
 */
function addNewStudent() {
  const nameInput = document.getElementById("new-student-name");
  const rollInput = document.getElementById("new-student-roll");
  const courseInput = document.getElementById("new-student-course");

  const name = nameInput.value.trim();
  const roll = rollInput.value.trim() || `DEV-2024-${String(students.length + 1).padStart(3, '0')}`;
  const course = courseInput.value.trim() || "DevOps Engineering";

  if (!name) {
    alert("Please enter a valid student name.");
    return;
  }

  const newStudent = {
    id: Date.now(),
    name,
    rollNo: roll,
    course,
    status: "Enrolled"
  };

  students.push(newStudent);
  nameInput.value = "";
  rollInput.value = "";
  courseInput.value = "";
  toggleAddModal();
  renderStudents(students);

  console.log(`[DevOps Lab 14] Added new student: ${name}`);
}

/**
 * Reset list to original 5 students
 */
function resetToFiveStudents() {
  students = [...defaultStudents];
  const searchInput = document.getElementById("student-search-input");
  if (searchInput) searchInput.value = "";
  renderStudents(students);
  console.log("[DevOps Lab 14] Reset to default 5 students.");
}

/**
 * CLI / Node support & console output
 */
function printStudentsToConsole() {
  console.log("=========================================");
  console.log("  DEVOPS LAB 14: 5 STORED STUDENT NAMES  ");
  console.log("=========================================");
  defaultStudents.forEach((student, index) => {
    console.log(`${index + 1}. ${student.name} | Roll: ${student.rollNo} | Course: ${student.course}`);
  });
  console.log("=========================================");
}

// Initial execution
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    renderStudents(students);
    printStudentsToConsole();
  });
}

// If run in Node.js environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = { defaultStudents, students };
  printStudentsToConsole();
}
