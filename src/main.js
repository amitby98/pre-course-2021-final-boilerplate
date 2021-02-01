idCounter = 0;
isHidden = false;
let darkButton = document.getElementById("dark-mode");
let clearButton = document.getElementById("clear");
idMap = {};
appData = {
  todo: [],
  done: [],
};

// This function loads the data from the JSON.BIN and then create the DOM elements
async function loadTasks() {
  // first - get the data from the json.bin
  appData = await getPersistent(MY_BIN_ID);

  let taskDiv = document.getElementById("tasks-container");
  let taskDoneDiv = document.getElementById("tasks-done-container");
  // second - create the todo list
  appData.todo.forEach(async (taskObject) => {
    let div = await createTaskDomElements(taskObject, false);
    taskDiv.appendChild(div);
  });

  // third - create the done list
  appData.done.forEach(async (taskObject) => {
    let div = await createTaskDomElements(taskObject, true);
    taskDoneDiv.appendChild(div);
  });

  idCounter = appData.done.length + appData.todo.length + 1;
  counterUpdated();
}

// this function gets a task object and create a div with all the elements of the task inside
// the function returns the div container of the task
async function createTaskDomElements(taskObject, isChecked) {
  // create the div checkbox
  let input = document.createElement("input");
  input.type = "checkbox";
  input.id = taskObject.id;
  input.className = "checkbox";
  input.checked = isChecked;
  input.onclick = taskChecked;

  // create the div for displaying the priority
  let divPriority = document.createElement("div");
  divPriority.innerText = taskObject.priority;
  divPriority.className = "todo-priority";
  divPriority.classList.add(findPriority(taskObject.priority));

  // create the div for displaying the text of the task
  let divTaskText = document.createElement("div");
  divTaskText.innerText = taskObject.task;
  divTaskText.className = "todo-text";

  // create the div for displaying the date
  let divDate = document.createElement("div");
  divDate.innerText = taskObject.date;
  divDate.className = "todo-created-at";

  // create the task container div
  let div = document.createElement("div");
  div.className = "todo-container";

  // create the remove button
  let removeButton = document.createElement("button");
  removeButton.className = "remove-button";
  removeButton.innerText = "❌";
  removeButton.addEventListener("click", (e) => {
    let localId = input.id;
    if (input.checked) {
      document.getElementById("tasks-done-container").removeChild(div);

      let taskObject = appData.done.find((x) => x.id == localId);
      appData.done.splice(appData.done.indexOf(taskObject), 1);
    } else {
      document.getElementById("tasks-container").removeChild(div);

      let taskObject = appData.todo.find((x) => x.id == localId);
      appData.todo.splice(appData.todo.indexOf(taskObject), 1);
    }

    setPersistent(MY_BIN_ID, appData);
    counterUpdated();
  });

  //create the type div
  let divType = document.createElement("div");
  divType.id = "divType";
  divType.className = taskObject.type;
  divType.innerText = taskObject.type;

  // add todo elements to the todo-container
  div.appendChild(input);
  div.appendChild(divPriority);
  div.appendChild(divTaskText);
  div.appendChild(divDate);
  div.appendChild(divType);
  getEditTaskButton(div, divTaskText);
  div.appendChild(removeButton);

  return div;
}

//filter button
let filter = 1;
let filterButton = document.getElementById("sort-button");
filterButton.addEventListener("click", (e) => {
  if (filter === 0) {
    filterButton.innerText = "No Filter";
    filter += 1;
  } else if (filter === 1) {
    filter += 1;
    filterButton.innerText = "High importance";
    sortByImportance(true);
  } else if (filter === 2) {
    filterButton.innerText = "Low importance";
    sortByImportance(false);
    filter += 1;
  } else if (filter >= 3) {
    filterButton.innerText = "Type of task";
    sortByType(true);
    filter = 0;
  }
});

//clear all button
clearButton.addEventListener("click", (e) => {
  document.getElementById("counter-done").innerText = "0";
  // document.getElementById("empty-list-done-span").style.display = "block";
  removeDone();
});

//function to reset all the completed tasks
function removeDone() {
  let taskDoneDiv = document.getElementById("tasks-done-container");
  let array = taskDoneDiv.getElementsByClassName("todo-container");
  for (let i = 0; i < array.length; i++) {
    let task = array[i];
    i--;
    task.remove();
  }
}

//dark mode button
darkButton.addEventListener("click", (e) => {
  let theme = document.getElementById("theme");
  if (theme.href.includes("style")) {
    theme.href = "darkmode.css";
  } else {
    document.getElementById("theme").href = "style.css";
  }
});

//function to sort tasks by importance
function sortByImportance(increase) {
  let todoArray = document.getElementsByClassName("todo-container");
  let tasksContainer = document.getElementById("tasks-container");
  let priorityArray1 = [];
  let priorityArray2 = [];
  let priorityArray3 = [];
  let priorityArray4 = [];
  let priorityArray5 = [];
  for (i = 0; i < todoArray.length; i++) {
    let taskDiv = todoArray[i];
    let checkBox = taskDiv.getElementsByClassName("checkbox")[0];
    if (!checkBox.checked) {
      let priority = JSON.parse(
        taskDiv.getElementsByTagName("div")[0].innerText
      );
      switch (priority) {
        case 1:
          priorityArray1.push(taskDiv);
          taskDiv.remove;
          break;
        case 2:
          priorityArray2.push(taskDiv);
          taskDiv.remove;
          break;
        case 3:
          priorityArray3.push(taskDiv);
          taskDiv.remove;
          break;
        case 4:
          priorityArray4.push(taskDiv);
          taskDiv.remove;
          break;
        case 5:
          priorityArray5.push(taskDiv);
          taskDiv.remove;
          break;
      }
    }
  }
  let priorities = [
    priorityArray1,
    priorityArray2,
    priorityArray3,
    priorityArray4,
    priorityArray5,
  ];
  let organized = [];
  for (let i = 0; i < priorities.length; i++) {
    if (priorities[i].length > 0) {
      for (let z = 0; z < priorities[i].length; z++) {
        if (increase) {
          organized.push(priorities[i][z]);
        } else {
          organized.unshift(priorities[i][z]);
        }
      }
    }
  }
  for (let i = 0; i < organized.length; i++) {
    tasksContainer.appendChild(organized[i]);
  }
}

//function to sort all tasks by their type
function sortByType(increase) {
  let todoArray = document.getElementsByClassName("todo-container");
  let tasksContainer = document.getElementById("tasks-container");
  let typeArray1 = [];
  let typeArray2 = [];
  let typeArray3 = [];
  for (i = 0; i < todoArray.length; i++) {
    let taskDiv = todoArray[i];
    let checkBox = taskDiv.getElementsByClassName("checkbox")[0];
    if (!checkBox.checked) {
      let type = taskDiv.getElementsByTagName("div")[3].innerText;
      switch (type) {
        case "Must":
          typeArray1.push(taskDiv);
          taskDiv.remove;
          break;
        case "Quickly":
          typeArray2.push(taskDiv);
          taskDiv.remove;
          break;
        case "Normal":
          typeArray3.push(taskDiv);
          taskDiv.remove;
          break;
      }
    }
  }
  let types = [typeArray1, typeArray2, typeArray3];
  let organized = [];
  for (let i = 0; i < types.length; i++) {
    if (types[i].length > 0) {
      for (let z = 0; z < types[i].length; z++) {
        if (increase) {
          organized.push(types[i][z]);
        } else {
          organized.unshift(types[i][z]);
        }
      }
    }
  }
  for (let i = 0; i < organized.length; i++) {
    tasksContainer.appendChild(organized[i]);
  }
}

//function for edit button
function getEditTaskButton(todoDiv, textDiv) {
  let editButton = document.createElement("button");
  editButton.className = "edit-button";
  editButton.innerText = "✏️";
  todoDiv.appendChild(editButton);
  editButton.addEventListener("click", (e) => {
    let newText = window.prompt("Type your changes.");
    if (newText.length >= 1) {
      if (newText.length > 40) {
        alert("Your new task text is too long!");
      } else {
        textDiv.innerText = newText;
      }
    } else {
      alert("New task is too short!");
    }
  });
}

//function for counter
function counterUpdated() {
  if (appData.todo.length >= 1) {
    document.getElementById("empty-list-span").style.display = "none";
  } else if (appData.todo.length === 0) {
    document.getElementById("empty-list-span").style.display = "block";
  }
  if (appData.done.length >= 1) {
    document.getElementById("empty-list-done-span").style.display = "none";
  } else if (appData.done.length === 0) {
    document.getElementById("empty-list-done-span").style.display = "block";
  }

  //added counter to tasks left
  document.getElementById("counter").innerText = appData.todo.length;

  //added counter to complete tasks
  document.getElementById("counter-done").innerText = appData.done.length;
}

//function to add tasks
async function addTask() {
  let task = document.getElementsByTagName("input")[0].value;
  let taskDiv = document.getElementById("tasks-container");

  //Find importance number
  let priorityInput = document.getElementById("priority-selector").value;
  let typeInput = document.getElementById("priority-selector2").value;
  if (
    priorityInput < 1 ||
    priorityInput > 5 ||
    task.length < 1 ||
    task.length > 40
  ) {
    alert("You need to fill all the fields!");
  } else {
    let date = calculateTime(new Date());
    let taskObject = {
      task,
      priority: priorityInput,
      date,
      type: typeInput,
      id: "todo" + idCounter,
    };
    let div = await createTaskDomElements(taskObject, false);

    // add the todo-container to the div task list
    taskDiv.appendChild(div);

    // reset inputs after adding a task
    document.getElementsByTagName("input")[0].value = "";
    document.getElementsByTagName("select")[0].value = "";
    document.getElementsByTagName("select")[1].value = "Normal";

    // save the task to jsonBin
    appData.todo.push(taskObject);
    await setPersistent(MY_BIN_ID, appData);

    // update counters
    idCounter++;
    counterUpdated();
  }
}

//function to update items counter
function taskChecked(event) {
  let div = event.target.parentNode;
  let taskDiv = document.getElementById("tasks-container");
  let taskDoneDiv = document.getElementById("tasks-done-container");
  if (isHidden) {
    div.classList.add("hidden");
  }

  let localId = event.target.id;
  if (!event.target.checked) {
    taskDiv.appendChild(div);

    let taskObject = appData.done.find((x) => x.id == localId);
    appData.done.splice(appData.done.indexOf(taskObject), 1);
    appData.todo.push(taskObject);
  } else {
    taskDoneDiv.appendChild(div);

    let taskObject = appData.todo.find((x) => x.id == localId);

    appData.todo.splice(appData.todo.indexOf(taskObject), 1);
    appData.done.push(taskObject);
  }
  setPersistent(MY_BIN_ID, appData);
  counterUpdated();
}

//added style to the tasks
function findPriority(priority) {
  let priorityClassName = "";
  switch (JSON.parse(priority)) {
    case 1:
      priorityClassName = "very-low";
      break;
    case 2:
      priorityClassName = "low";
      break;
    case 3:
      priorityClassName = "normal";
      break;
    case 4:
      priorityClassName = "high";
      break;
    case 5:
      priorityClassName = "very-high";
      break;
  }
  return priorityClassName;
}

//function to return the time as a useable string
function calculateTime(time) {
  let year = time.getFullYear();
  let month = time.getMonth();
  month = month + 1;
  let day = time.getDate();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  let string = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
  return string;
}

//function to hide completed tasks
document.getElementById("hide-list").addEventListener("click", (e) => {
  let array = document
    .getElementById("tasks-done-container")
    .getElementsByTagName("div");

  if (isHidden) {
    isHidden = false;
  } else {
    isHidden = true;
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i].className.includes("todo-container")) {
      if (isHidden) {
        let todo = array[i];
        todo.classList.add("hidden");
      } else {
        if (array[i].className.includes("hidden")) {
          array[i].className = array[i].className.replace(" hidden", "");
        }
      }
    }
  }
});
