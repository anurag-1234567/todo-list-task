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


// Store all tasks

let tasks = [];

// Current filter

let currentFilter = "all";


// Add Task

addButton.addEventListener("click", addTask);


// Add task using Enter key

taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});