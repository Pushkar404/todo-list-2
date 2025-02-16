let inputs = document.getElementById("inp");
let text = document.querySelector(".text");

// Enter key support
inputs.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        Add();
    }
});

function Add() {
    if (inputs.value.trim() === "") {
        alert("Please Enter Task");
    } else {
        let newEle = document.createElement("ul");
        newEle.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <span class="task-text">${inputs.value}</span>
            <i class="fa-solid fa-trash"></i>
        `;
        text.appendChild(newEle);
        inputs.value = "";

        // Delete task
        newEle.querySelector("i").addEventListener("click", function() {
            newEle.remove();
        });

        // Toggle completed task
        let checkbox = newEle.querySelector(".task-checkbox");
        let taskText = newEle.querySelector(".task-text");
        checkbox.addEventListener("change", function() {
            taskText.classList.toggle("completed", checkbox.checked);
        });
    }
}
