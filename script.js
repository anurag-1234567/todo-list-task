// Get HTML elements

const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const remainingCount = document.getElementById("remainingCount");

const allButton = document.getElementById("allButton");
const completedButton = document.getElementById("completedButton");
const pendingButton = document.getElementById("pendingButton");


// Store all tasks in this array
let tasks = [];
// Current filter
let currentFilter = "all";
// Get tasks from localStorage when page loads

const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}


// Add Task

addButton.addEventListener("click", addTask);


// Also allow Enter key

taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Function to add a task

function addTask() {

    const taskName = taskInput.value.trim();

    // Do not accept empty task

    if (taskName === "") {
        alert("Please enter a task.");
        return;
    }


    // Create task object

    const task = {
        id: Date.now(),
        title: taskName,
        completed: false
    };

    // Add task to array
    tasks.push(task);


    // Save tasks

    saveTasks();


    // Clear input

    taskInput.value = "";


    // Display tasks

    displayTasks();

}
// Save tasks in localStorage

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// Display tasks

function displayTasks() {

    taskList.innerHTML = "";


    // Filter tasks

    let filteredTasks = tasks;


    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(function (task) {
            return task.completed === true;
        });

    }


    if (currentFilter === "pending") {

        filteredTasks = tasks.filter(function (task) {
            return task.completed === false;
        });

    }


    // If no tasks

    if (filteredTasks.length === 0) {

        taskList.innerHTML = `
            <p class="empty">No tasks found.</p>
        `;

        updateCounter();

        return;
    }


    // Display every task

    filteredTasks.map(function (task) {

        const taskDiv = document.createElement("div");

        taskDiv.className = "task";


        // Add completed class

        if (task.completed) {
            taskDiv.classList.add("completed");
        }


        taskDiv.innerHTML = `

            <div class="task-info">

                <div class="task-title">
                    ${task.title}
                </div>

                <div class="task-status">
                    Status:
                    ${task.completed ? "Completed" : "Pending"}
                </div>

            </div>


            <div class="task-buttons">

                <button class="complete-btn">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>

        `;


        // Complete button

        const completeButton =
            taskDiv.querySelector(".complete-btn");


        completeButton.addEventListener("click", function () {

            completeTask(task.id);

        });


        // Edit button

        const editButton =
            taskDiv.querySelector(".edit-btn");


        editButton.addEventListener("click", function () {

            editTask(task.id);

        });


        // Delete button

        const deleteButton =
            taskDiv.querySelector(".delete-btn");


        deleteButton.addEventListener("click", function () {

            deleteTask(task.id);

        });


        // Add task to page

        taskList.appendChild(taskDiv);

    });


    // Update counters

    updateCounter();

}


// Complete or undo task

function completeTask(id) {

    const task = tasks.find(function (task) {
        return task.id === id;
    });


    if (task) {

        task.completed = !task.completed;

    }


    saveTasks();

    displayTasks();

}


// Edit task

function editTask(id) {

    const task = tasks.find(function (task) {
        return task.id === id;
    });


    if (task) {

        const newTitle = prompt(
            "Edit your task:",
            task.title
        );


        if (newTitle !== null) {

            const updatedTitle = newTitle.trim();


            if (updatedTitle === "") {

                alert("Task cannot be empty.");
                return;

            }


            task.title = updatedTitle;

            saveTasks();

            displayTasks();

        }

    }

}


// Delete task

function deleteTask(id) {

    tasks = tasks.filter(function (task) {

        return task.id !== id;

    });


    saveTasks();

    displayTasks();

}


// Update counters

function updateCounter() {

    const total = tasks.length;


    const completed = tasks.filter(function (task) {

        return task.completed === true;

    }).length;


    const remaining = tasks.filter(function (task) {

        return task.completed === false;

    }).length;


    totalCount.textContent = total;

    completedCount.textContent = completed;

    remainingCount.textContent = remaining;

}


// All filter

allButton.addEventListener("click", function () {

    currentFilter = "all";

    setActiveButton(allButton);

    displayTasks();

});


// Completed filter

completedButton.addEventListener("click", function () {

    currentFilter = "completed";

    setActiveButton(completedButton);

    displayTasks();

});


// Pending filter

pendingButton.addEventListener("click", function () {

    currentFilter = "pending";

    setActiveButton(pendingButton);

    displayTasks();

});


// Change active filter button

function setActiveButton(button) {

    allButton.classList.remove("active");

    completedButton.classList.remove("active");

    pendingButton.classList.remove("active");


    button.classList.add("active");

}


// Display tasks when page opens

displayTasks();