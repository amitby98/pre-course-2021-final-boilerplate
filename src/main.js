idCounter = 0;
todoItemsCount = 0;
doneItemsCount = 0;
isHidden = false;
JSONBIN_KEY = "$2b$10$ACsxVNXnozYAgSXjbvpoK.htaNg4CTPxW4wawEI7zBnGpC6KA/AHS";
idMap = {};

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
  editButton.innerText = "Edit";
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
  if (todoItemsCount === 1) {
    document.getElementById("empty-list-span").style.display = "none";
  } else if (todoItemsCount === 0) {
    document.getElementById("empty-list-span").style.display = "block";
  }
  if (doneItemsCount === 1) {
    document.getElementById("empty-list-done-span").style.display = "none";
  } else if (doneItemsCount === 0) {
    document.getElementById("empty-list-done-span").style.display = "block";
  }

  //added counter to tasks left
  document.getElementById("counter").innerText = todoItemsCount;

  //added counter to complete tasks
  document.getElementById("counter-done").innerText = doneItemsCount;
}

//function to add tasks
function addTask() {
  let task = document.getElementsByTagName("input")[0].value;
  let taskDiv = document.getElementById("tasks-container");

  let input = document.createElement("input");
  input.type = "checkbox";
  input.id = "item" + idCounter;
  input.className = "checkbox";
  input.onclick = taskChecked;

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
    // create the div for displaying the priority
    let divPriority = document.createElement("div");
    divPriority.innerText = priorityInput;
    divPriority.className = "todo-priority";
    divPriority.classList.add(findPriority(priorityInput));

    // create the div for displaying the text of the task
    let divTaskText = document.createElement("div");
    divTaskText.innerText = task;
    divTaskText.className = "todo-text";

    // create the div for displaying the date
    let divDate = document.createElement("div");
    let date = calculateTime(new Date());
    divDate.innerText = date;
    divDate.className = "todo-created-at";

    // create the task container div
    let div = document.createElement("div");
    div.className = "todo-container";

    // create the remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.innerText = "remove";
    removeButton.addEventListener("click", (e) => {
      if (input.checked) {
        document.getElementById("tasks-done-container").removeChild(div);
        doneItemsCount--;
      } else {
        taskDiv.removeChild(div);
        todoItemsCount--;
      }

      counterUpdated();
    });

    //create the type div
    let divType = document.createElement("div");
    divType.id = "divType";
    divType.className = typeInput;
    divType.innerText = typeInput;
    console.log(divType.className);

    // add todo elements to the todo-container
    div.appendChild(input);
    div.appendChild(divPriority);
    div.appendChild(divTaskText);
    div.appendChild(divDate);
    div.appendChild(divType);
    getEditTaskButton(div, divTaskText);
    div.appendChild(removeButton);

    // add the todo-container to the div task list
    taskDiv.appendChild(div);

    // reset inputs after adding a task
    document.getElementsByTagName("input")[0].value = "";
    document.getElementsByTagName("select")[0].value = "";
    document.getElementsByTagName("select")[1].value = "Normal";

    // update counters
    idCounter++;
    todoItemsCount++;

    counterUpdated();

    // save the task to jsonBin
    let taskObject = {
      task,
      checked: false,
      priority: priorityInput,
      date,
      type: typeInput,
    };
    saveTaskToJsonBin(taskObject, getCollectionId(false), (binId) => {
      idMap[input.id] = binId;
    });
  }

  //function to update items counter
  function taskChecked(event) {
    let div = event.target.parentNode;
    let taskDiv = document.getElementById("tasks-container");
    let taskDoneDiv = document.getElementById("tasks-done-container");
    if (isHidden) {
      div.classList.add("hidden");
    }
    if (!event.target.checked) {
      taskDiv.appendChild(div);
      todoItemsCount++;
      doneItemsCount--;
    } else {
      taskDoneDiv.appendChild(div);
      todoItemsCount--;
      doneItemsCount++;

      let localId = event.target.id;
      let binId = idMap[localId];
      deleteTaskFromJsonBin(binId, () => {
        let taskObject = getTaskFromDivElement(div);

        saveTaskToJsonBin(taskObject, getCollectionId(true), (binId) => {
          idMap[localId] = binId;
        });
      });
    }
    counterUpdated();
  }
}

function getTaskFromDivElement(divElement) {
  let checked = divElement.getElementsByTagName("input")[0].innerText;
  let taskText = divElement.getElementsByClassName("todo-text")[0].innerText;
  let priority = divElement.getElementsByClassName("todo-priority")[0]
    .innerText;
  let date = divElement.getElementsByClassName("todo-created-at")[0].innerText;
  let type = document.getElementById("divType").innerText;

  let taskObject = {
    task: taskText,
    checked,
    priority,
    date,
    type,
  };
  console.log(taskObject);
  return taskObject;
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

function loadTasks() {
  let req2 = new XMLHttpRequest();

  req2.onreadystatechange = () => {
    if (req2.readyState == XMLHttpRequest.DONE) {
      console.log(req2.responseText);
    }
  };

  let id = "601672210ba5ca5799d17cd2";
  req2.open("GET", "https://api.jsonbin.io/v3/b/" + id + "/latest", true);
  req2.setRequestHeader("X-Master-Key", JSONBIN_KEY);
  req2.send();

  let req = new XMLHttpRequest();

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      console.log(req.responseText);
    }
  };

  // first - load the todo-tasks list
  let collectionIdOfTodoTasks = getCollectionId(false);
  req.open(
    "GET",
    "https://api.jsonbin.io/v3/c/" + collectionIdOfTodoTasks + "/bins/1",
    true
  );
  req.setRequestHeader("X-Master-Key", JSONBIN_KEY);
  req.send();
}

function getCollectionId(isDone) {
  return isDone ? "6016697b0ba5ca5799d17a26" : "601669690ba5ca5799d17a1f";
}

function deleteTaskFromJsonBin(id, doAfter) {
  let req = new XMLHttpRequest();

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      console.log(req.responseText);
      if (doAfter) doAfter();
    }
  };

  req.open("DELETE", "https://api.jsonbin.io/v3/b/" + id, true);
  req.setRequestHeader("X-Master-Key", JSONBIN_KEY);
  req.send();
}

function saveTaskToJsonBin(task, collectionId, callback) {
  let jsonString = JSON.stringify(task);

  let req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      console.log(req.responseText);
      let jsonObject = JSON.parse(req.responseText);
      if (callback) {
        callback(jsonObject.metadata.id);
      }
    }
  };
  req.open("POST", "https://api.jsonbin.io/v3/b", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-COLLECTION-ID", collectionId);
  req.setRequestHeader("X-Master-Key", JSONBIN_KEY);
  req.send(jsonString);
}
