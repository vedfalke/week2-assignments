const API_URL = "http://localhost:3000/api/employees";

const form = document.getElementById("employeeForm");
const employeeIdInput = document.getElementById("employeeId");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const roleInput = document.getElementById("role");
const salaryInput = document.getElementById("salary");
const joinDateInput = document.getElementById("joinDate");

const tableBody = document.getElementById("employeeTable");
const message = document.getElementById("message");
const loading = document.getElementById("loading");
const employeeCount = document.getElementById("employeeCount");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const formTitle = document.getElementById("formTitle");
const saveButton = document.getElementById("saveButton");
const cancelButton = document.getElementById("cancelButton");

let employees = [];

// Show a message below the form.
function showMessage(text) {
    message.textContent = text;
}

// Get all employees from the backend.
async function loadEmployees() {
    loading.hidden = false;
    tableBody.innerHTML = "";

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Could not load employees");
        }

        employees = data;
        employeeCount.textContent = employees.length;
        displayEmployees();
    } catch (error) {
        showMessage(error.message);
    } finally {
        loading.hidden = true;
    }
}

// Display employees in the table.
// Search and sorting are done in the browser.
function displayEmployees() {
    const searchText = searchInput.value.toLowerCase();
    const sortBy = sortSelect.value;

    let filteredEmployees = employees.filter((employee) => {
        return (
            employee.name.toLowerCase().includes(searchText) ||
            employee.department.toLowerCase().includes(searchText) ||
            employee.role.toLowerCase().includes(searchText)
        );
    });

    filteredEmployees.sort((a, b) => {
        if (sortBy === "salary") {
            return Number(a.salary) - Number(b.salary);
        }

        if (sortBy === "joinDate") {
            return new Date(a.joinDate) - new Date(b.joinDate);
        }

        return String(a[sortBy]).localeCompare(String(b[sortBy]));
    });

    tableBody.innerHTML = "";

    if (filteredEmployees.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6">No employees found</td></tr>';
        return;
    }

    filteredEmployees.forEach((employee) => {
        const row = document.createElement("tr");

        // textContent is used so employee text is not treated as HTML.
        const values = [
            employee.name,
            employee.department,
            employee.role,
            employee.salary,
            new Date(employee.joinDate).toLocaleDateString()
        ];

        values.forEach((value) => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionsCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editEmployee(employee));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => deleteEmployee(employee._id));

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });
}

// Add a new employee or update an existing employee.
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const employee = {
        name: nameInput.value.trim(),
        department: departmentInput.value.trim(),
        role: roleInput.value.trim(),
        salary: salaryInput.value,
        joinDate: joinDateInput.value
    };

    if (!employee.name || !employee.department || !employee.role ||
        employee.salary === "" || Number(employee.salary) < 0 ||
        !employee.joinDate) {
        showMessage("Please enter valid details in all fields.");
        return;
    }

    const id = employeeIdInput.value;
    const url = id ? `${API_URL}/${id}` : API_URL;
    const method = id ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Request failed");
        }

        showMessage(id ? "Employee updated successfully." : "Employee added successfully.");
        resetForm();
        await loadEmployees();
    } catch (error) {
        showMessage(error.message);
    }
});

// Put the selected employee's details into the form.
function editEmployee(employee) {
    employeeIdInput.value = employee._id;
    nameInput.value = employee.name;
    departmentInput.value = employee.department;
    roleInput.value = employee.role;
    salaryInput.value = employee.salary;
    joinDateInput.value = new Date(employee.joinDate).toISOString().slice(0, 10);

    formTitle.textContent = "Edit Employee";
    saveButton.textContent = "Update Employee";
    cancelButton.hidden = false;
    showMessage("Edit the details and click Update Employee.");
    window.scrollTo(0, 0);
}

// Delete an employee after asking for confirmation.
async function deleteEmployee(id) {
    const confirmed = confirm("Are you sure you want to delete this employee?");

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Could not delete employee");
        }

        showMessage(data.message);
        await loadEmployees();
    } catch (error) {
        showMessage(error.message);
    }
}

// Clear the form and return to Add Employee mode.
function resetForm() {
    form.reset();
    employeeIdInput.value = "";
    formTitle.textContent = "Add Employee";
    saveButton.textContent = "Add Employee";
    cancelButton.hidden = true;
}

cancelButton.addEventListener("click", resetForm);
searchInput.addEventListener("input", displayEmployees);
sortSelect.addEventListener("change", displayEmployees);

// Load employees when the page opens.
loadEmployees();