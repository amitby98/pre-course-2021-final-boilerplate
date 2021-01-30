idCounter = 0;
todoItemsCount = 0;
doneItemsCount = 0;

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
    let taskDiv = todoArray[i]; //Task div
    let priority = JSON.parse(taskDiv.getElementsByTagName("div")[0].innerText);
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
    let taskDiv = todoArray[i]; //Task div
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
  input.onclick = taskChecked;

  //Find importance number
  let priorityInput = document.getElementById("priority-selector").value;
  let typeInput = document.getElementById("priority-selector2").value;
  if (priorityInput < 1 || priorityInput > 5 || task.length < 1) {
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
    divDate.innerText = calculateTime(new Date());
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

    //add type div
    let divType = document.createElement("div");
    divType.className = typeInput;
    divType.innerText = typeInput;
    console.log(divType.className);

    // add todo elements to the todo-container
    div.appendChild(input);
    div.appendChild(divPriority);
    div.appendChild(divTaskText);
    div.appendChild(divDate);
    div.appendChild(divType);
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
  }

  //function to update items counter
  function taskChecked(event) {
    let div = event.target.parentNode;
    let taskDiv = document.getElementById("tasks-container");
    let taskDoneDiv = document.getElementById("tasks-done-container");

    if (!event.target.checked) {
      taskDiv.appendChild(div);
      todoItemsCount++;
      doneItemsCount--;
    } else {
      taskDoneDiv.appendChild(div);
      todoItemsCount--;
      doneItemsCount++;
    }
    counterUpdated();
  }
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
  let string =
    day + "/" + month + "/" + year + " " + hours + ":" + minutes + "   ";
  return string;
}
