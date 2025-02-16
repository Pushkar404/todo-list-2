let inputs = document.getElementById("inp");
let dueDate = document.getElementById("dueDate");
let category = document.getElementById("category");
let customCategory = document.getElementById("customCategory");
let text = document.querySelector(".text");

// Show/hide custom category input
category.addEventListener("change", function() {
    if (category.value === "Custom") {
        customCategory.style.display = "block";
    } else {
        customCategory.style.display = "none";
    }
});

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", function() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => renderTask(task));
});

// Add task
function Add() {
    let taskText = inputs.value.trim();
    let taskDue = dueDate.value;
    let taskCategory = category.value === "Custom" ? customCategory.value.trim() : category.value;

    if (taskText === "") {
        alert("Please Enter Task");
    } else {
        let task = {
            text: taskText,
            due: taskDue,
            category: taskCategory,
            completed: false
        };

        // Save task to local storage
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Render task
        renderTask(task);

        // Clear inputs
        inputs.value = "";
        dueDate.value = "";
        customCategory.value = "";
        category.value = "Personal";
        customCategory.style.display = "none";
    }
}

// Render task
function renderTask(task) {
    let newEle = document.createElement("ul");
    newEle.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""}>
        <div class="task-details">
            <span class="task-text">${task.text}</span>
            <span class="task-category">${task.category}</span>
            <span class="task-due">${task.due ? "Due: " + task.due : ""}</span>
        </div>
        <i class="fa-solid fa-trash"></i>
    `;
    text.appendChild(newEle);

    // Toggle completed task
    let checkbox = newEle.querySelector(".task-checkbox");
    let taskText = newEle.querySelector(".task-text");
    checkbox.addEventListener("change", function() {
        taskText.classList.toggle("completed", checkbox.checked);
        updateTaskStatus(task.text, checkbox.checked);
    });

    // Delete task
    newEle.querySelector("i").addEventListener("click", function() {
        newEle.remove();
        deleteTask(task.text);
    });
}

// Update task status in local storage
function updateTaskStatus(taskText, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = completed;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task from local storage
function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete checked tasks when the page is closed
window.addEventListener("beforeunload", function() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => !task.completed); // Keep only incomplete tasks
    localStorage.setItem("tasks", JSON.stringify(tasks));
});
