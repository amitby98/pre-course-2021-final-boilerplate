totalItemsCount = 0;
todoItemsCount = 0;
doneItemsCount = 0;
function addTask() {
  let task = document.getElementsByTagName("input")[0].value;
  let taskDiv = document.getElementById("tasks-container");

  let input = document.createElement("input");
  input.type = "checkbox";
  input.id = "item" + totalItemsCount;
  input.onclick = taskChecked;

  //Find importance number
  let priorityInput = document.getElementById("priority-selector").value;
  let taskType = document.getElementById("task-type").value;
  if (
    priorityInput < 1 ||
    priorityInput > 5 ||
    task.length < 1 ||
    taskType.length < 1
  ) {
    alert("You need to fill all the fields!");
  } else {
    let label = document.createElement("label");
    label.setAttribute("for", input.id);
    label.innerText = getTaskText(task, new Date(), priorityInput);
    label.className = findPriority(priorityInput);

    let div = document.createElement("div");

    div.appendChild(input);
    div.appendChild(label);

    taskDiv.appendChild(div);

    document.getElementsByTagName("input")[0].value = "";
    document.getElementsByTagName("select")[0].value = "";
    document.getElementsByTagName("select")[1].value = "";
    totalItemsCount++;
    todoItemsCount++;
    if (todoItemsCount === 1) {
      document.getElementById("empty-list-span").style.display = "none";
    }
  }

  function taskChecked(event) {
    let div = event.target.parentNode;
    let taskDiv = document.getElementById("tasks-container");
    let taskDoneDiv = document.getElementById("tasks-done-container");

    if (!event.target.checked) {
      taskDiv.appendChild(div);
      taskDoneDiv.removeChild(div);
      todoItemsCount++;
      doneItemsCount--;
    } else {
      taskDiv.removeChild(div);
      taskDoneDiv.appendChild(div);
      todoItemsCount--;
      doneItemsCount++;
    }
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
  }
}
function getTaskText(text, date, priority) {
  return " " + priority + " " + text + " " + calculateTime(date) + " ";
}

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
function calculateTime(time) {
  let year = time.getFullYear();
  let month = time.getMonth();
  month = month + 1;
  let day = time.getDate();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let string = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
  return string;
}

//my-function
// function getTaskAsObject(text, priority, date) {
//   return {
//     text: text,
//     priority: priority,
//     date: date.now,
//   };
// }
