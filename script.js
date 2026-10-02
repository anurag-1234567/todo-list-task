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


// Store all tasks in an array

let tasks = [];


// Store the currently selected filter

let currentFilter = "all";


// Get saved tasks from localStorage

const savedTasks = localStorage.getItem("tasks");


// Convert saved JSON data back into an array

if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}


// Add a task when the Add Task button is clicked

addButton.addEventListener("click", addTask);


// Add a task when the Enter key is pressed

taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Function to add a new task

function addTask() {

    // Get the task name from the input

    const taskName = taskInput.value.trim();


    // Check if the input is empty

    if (taskName === "") {

        alert("Please enter a task.");

    } else {

        // Create a new task object

        const task = {
            id: Date.now(),
            title: taskName,
            completed: false
        };


        // Add the new task to the tasks array

        tasks.push(task);


        // Save the updated tasks to localStorage

        saveTasks();


        // Clear the input field

        taskInput.value = "";


        // Display the updated task list

        displayTasks();

    }

}


// Function to save tasks in localStorage

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// Function to display tasks on the page

function displayTasks() {

    // Clear the existing task list

    taskList.innerHTML = "";


    // Start with all tasks

    let filteredTasks = tasks;


    // Show only completed tasks

    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(task => task.completed === true);

    }


    // Show only pending tasks

    if (currentFilter === "pending") {

        filteredTasks = tasks.filter(task => task.completed === false);

    }


    // Check if there are no tasks to display

    if (filteredTasks.length === 0) {

        taskList.innerHTML = `
            <p class="empty">No tasks found.</p>
        `;

        updateCounter();

    } else {

        // Go through each task and display it

        filteredTasks.map(function (task) {

            // Create a new div for the task

            const taskDiv = document.createElement("div");

            taskDiv.className = "task";


            // Add completed class if the task is completed

            if (task.completed) {
                taskDiv.classList.add("completed");
            }


            // Add task information and buttons

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


            // Get the Complete button

            const completeButton =
                taskDiv.querySelector(".complete-btn");


            // Add click event to the Complete button

            completeButton.addEventListener("click", function () {

                completeTask(task.id);

            });


            // Get the Edit button

            const editButton =
                taskDiv.querySelector(".edit-btn");


            // Add click event to the Edit button

            editButton.addEventListener("click", function () {

                editTask(task.id);

            });


            // Get the Delete button

            const deleteButton =
                taskDiv.querySelector(".delete-btn");


            // Add click event to the Delete button

            deleteButton.addEventListener("click", function () {

                deleteTask(task.id);

            });


            // Add the task div to the task list

            taskList.appendChild(taskDiv);

        });


        // Update the task counters

        updateCounter();

    }

}


// Function to complete or undo a task

function completeTask(id) {

    // Find the task using its ID

    const task = tasks.find(task => task.id === id);


    // Change the completed status

    if (task) {

        task.completed = !task.completed;

    }


    // Save the updated task

    saveTasks();


    // Display the updated task list

    displayTasks();

}


// Function to edit a task

function editTask(id) {

    // Find the task using its ID

    const task = tasks.find(task => task.id === id);


    if (task) {

        // Ask the user for the new task name

        const newTitle = prompt(
            "Edit your task:",
            task.title
        );


        // Check if the user entered a new value

        if (newTitle !== null) {

            const updatedTitle = newTitle.trim();


            // Check if the new task name is empty

            if (updatedTitle === "") {

                alert("Task cannot be empty.");

            } else {

                // Update the task title

                task.title = updatedTitle;


                // Save the updated task

                saveTasks();


                // Display the updated task list

                displayTasks();

            }

        }

    }

}


// Function to delete a task

function deleteTask(id) {

    // Remove the task with the matching ID

    tasks = tasks.filter(task => task.id !== id);


    // Save the updated tasks

    saveTasks();


    // Display the updated task list

    displayTasks();

}


// Function to update task counters

function updateCounter() {

    // Get the total number of tasks

    const total = tasks.length;


    // Count completed tasks

    const completed = tasks.filter(
        task => task.completed === true
    ).length;


    // Count pending tasks

    const remaining = tasks.filter(
        task => task.completed === false
    ).length;


    // Display the total count

    totalCount.textContent = total;


    // Display the completed count

    completedCount.textContent = completed;


    // Display the remaining count

    remainingCount.textContent = remaining;

}


// Show all tasks when All button is clicked

allButton.addEventListener("click", function () {

    currentFilter = "all";

    setActiveButton(allButton);

    displayTasks();

});


// Show completed tasks when Completed button is clicked

completedButton.addEventListener("click", function () {

    currentFilter = "completed";

    setActiveButton(completedButton);

    displayTasks();

});


// Show pending tasks when Pending button is clicked

pendingButton.addEventListener("click", function () {

    currentFilter = "pending";

    setActiveButton(pendingButton);

    displayTasks();

});


// Function to change the active filter button

function setActiveButton(button) {

    // Remove active class from all filter buttons

    allButton.classList.remove("active");

    completedButton.classList.remove("active");

    pendingButton.classList.remove("active");


    // Add active class to the selected button

    button.classList.add("active");

}

// Display tasks when the page loads

displayTasks();