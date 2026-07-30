const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const errorMessage = document.getElementById("errorMessage");
const clearBtn = document.getElementById("clearBtn");

// Get tasks from browser storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks when page loads
displayTasks();


// ===============================
// Task 1: Add Task
// ===============================
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {

    // Task 4: Validate empty input
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        errorMessage.textContent = "Please enter a task!";
        taskInput.focus();
        return;
    }

    errorMessage.textContent = "";

    // Task 9: Add date
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        date: new Date().toLocaleDateString()
    };

    tasks.push(task);

    // Task 10: Store in browser
    saveTasks();

    // Task 3: Clear input after add
    taskInput.value = "";

    // Task 5: Display tasks
    displayTasks();

    taskInput.focus();
}


// ===============================
// Task 5: Display Tasks
// ===============================
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div class="task-content">
                <span class="task-text">${escapeHTML(task.text)}</span>
                <span class="task-date">
                    Added: ${task.date}
                </span>
            </div>

            <div class="task-actions">
                <button
                    class="complete-btn"
                    onclick="toggleComplete(${task.id})"
                >
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})"
                >
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });

    // Task 8: Count total tasks
    taskCount.textContent = tasks.length;
}


// ===============================
// Task 2: Delete Task
// ===============================
function deleteTask(id) {

    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    saveTasks();
    displayTasks();
}


// ===============================
// Task 6: Completed Status
// ===============================
function toggleComplete(id) {

    tasks = tasks.map(function (task) {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    displayTasks();
}


// ===============================
// Clear All Tasks
// ===============================
clearBtn.addEventListener("click", function () {

    if (tasks.length === 0) {
        return;
    }

    const confirmClear = confirm("Are you sure you want to delete all tasks?");

    if (confirmClear) {
        tasks = [];
        saveTasks();
        displayTasks();
    }
});


// ===============================
// Task 10: Local Storage
// ===============================
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ===============================
// Security helper
// Prevent HTML injection
// ===============================
function escapeHTML(text) {

    const div = document.createElement("div");
    div.textContent = text;

    return div.innerHTML;
}