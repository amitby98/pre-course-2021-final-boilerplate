totalItemsCount = 0;
todoItemsCount = 0;
doneItemsCount = 0;
// function addTask() {
//   let task = document.getElementsByTagName("input")[0].value;
//   let taskDiv = document.getElementById("tasks-container");

//   let input = document.createElement("input");
//   input.type = "checkbox";
//   input.id = "item" + totalItemsCount;
//   input.onclick = taskChecked;

//   let label = document.createElement("label");
//   label.setAttribute("for", input.id);
//   label.innerText = task;

//   let div = document.createElement("div");

//   div.appendChild(input);
//   div.appendChild(label);

//   taskDiv.appendChild(div);

//   document.getElementsByTagName("input")[0].value = "";
//   totalItemsCount++;
//   todoItemsCount++;
//   if (todoItemsCount === 1) {
//     document.getElementById("empty-list-span").style.display = "none";
//   }
// }
function addTask() {
  let task = document.getElementsByTagName("input")[0].value;
  let taskDiv = document.getElementById("tasks-container");

  let input = document.createElement("input");
  input.type = "checkbox";
  input.id = "item" + totalItemsCount;
  input.onclick = taskChecked;

  //Find importance number
  let priorityInput = document.getElementById("priority-selector").value;
  if (priorityInput >= 1 && priorityInput <= 5) {
    let label = document.createElement("label");
    label.setAttribute("for", input.id);
    label.innerText = task;

    let div = document.createElement("div");

    div.appendChild(input);
    div.appendChild(label);

    taskDiv.appendChild(div);

    document.getElementsByTagName("input")[0].value = "";
    totalItemsCount++;
    todoItemsCount++;
    if (todoItemsCount === 1) {
      document.getElementById("empty-list-span").style.display = "none";
    }
  } else {
    //If importance number is NOT chosen.
    alert("You need to choose importance level!");
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
