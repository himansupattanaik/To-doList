
document.addEventListener("DOMContentLoaded", function () {
    // Load tasks from local storage
    // loadTasks();

    // Add event listener to the form
    document.getElementById("new-task-form").addEventListener("submit", function (e) {
        e.preventDefault();
        addTask();
    });
});

function createButton(label, className, clickHandler) {
    var button = document.createElement("button");
    button.textContent = label;
    button.className = className;
    button.addEventListener("click", clickHandler);
    return button;
}

function editTask(textElement) {
    // Enable the input field for editing
    textElement.readOnly = false;
    textElement.classList.add("editable");

    // Change the button text to "Save"
    var editButton = textElement.parentElement.nextElementSibling.querySelector(".edit");
    editButton.textContent = "Save";

    // Update the click event for the "Save" button
    editButton.onclick = function () {
        // Save the edited text
        textElement.readOnly = true;
        textElement.classList.remove("editable");
        editButton.textContent = "Edit";
    };
}

function deleteTask(taskDiv) {
    // Confirm before deletion
    if (confirm("Are you sure you want to delete this task?")) {
        // Remove the taskDiv from the DOM
        taskDiv.remove();

        // If there are no tasks left, display the "No tasks added..." message
        var tasksContainer = document.getElementById("tasks");
        if (!tasksContainer.hasChildNodes()) {
            document.getElementById("msg").style.display = "block";
        }
    }
}

function addTask() {
    var inputValue = document.getElementById("new-task-input").value;

    // Validation: no empty value, no initial space

    // Remove the "No tasks added..." message if it exists
    var messageElement = document.getElementById("msg");
    if (messageElement) {
        messageElement.style.display = "none";
    }

    // Create task elements
    var taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    var contentDiv = document.createElement("div");
    contentDiv.classList.add("content");

    var textElement = document.createElement("input");
    textElement.type = "text";
    textElement.value = inputValue;
    textElement.readOnly = true;
    textElement.classList.add("text");

    var actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    var editButton = createButton("Edit", "edit", function () {
        editTask(textElement);
    });

    var deleteButton = createButton("Delete", "delete", function () {
        deleteTask(taskDiv);
    });

    // Append elements to the taskDiv
    contentDiv.appendChild(textElement);
    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);
    taskDiv.appendChild(contentDiv);
    taskDiv.appendChild(actionsDiv);

    // Append the taskDiv to the tasksContainer
    document.getElementById("tasks").appendChild(taskDiv);

    // Clear the input field
    document.getElementById("new-task-input").value = "";
}

// function loadTasks() {
//     // Implement loading tasks from local storage
// }

function removeAll() {
    var tasksContainer = document.getElementById("tasks");

    // Remove all child nodes
    while (tasksContainer.firstChild) {
        tasksContainer.firstChild.remove();
    }

    // Display the "No tasks added..." message
    document.getElementById("msg").style.display = "block";
}
