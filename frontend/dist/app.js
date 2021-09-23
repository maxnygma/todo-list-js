var inputBox = document.querySelector(".task-input input");
var addButton = document.querySelector(".task-input button");
var todoList = document.querySelector(".todo-list");
var deleteAllButton = document.querySelector(".clear-tasks");
var bottomTitle = document.querySelector(".bottom-title");
inputBox.onkeyup = function () {
    var getLocalStorage = localStorage.getItem("New Todo");
    var listArr = JSON.parse(getLocalStorage);
    var userData = inputBox.value;
    if (userData.trim().length != 0 && listArr.length < 8) {
        addButton.classList.add("active");
    }
    else {
        addButton.classList.remove("active");
    }
};
addButton.onclick = function () {
    var userData = inputBox.value;
    var getLocalStorage = localStorage.getItem("New Todo");
    var listArr;
    if (getLocalStorage == null) {
        listArr = [];
    }
    else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    addButton.classList.remove("active");
    showTasks();
};
var showTasks = function () {
    var getLocalStorage = localStorage.getItem("New Todo");
    var listArr;
    if (getLocalStorage == null) {
        listArr = [];
    }
    else {
        listArr = JSON.parse(getLocalStorage);
    }
    var newTag = '';
    listArr.forEach(function (element, index) {
        newTag += "<li> <div>" + element + "</div> <span onclick=\"deleteTask(" + index + ")\" class=\"material-icons delete-icon\">delete</span></li>";
    });
    bottomTitle.textContent = "You have " + listArr.length + " pending events";
    todoList.innerHTML = newTag;
    inputBox.value = "";
};
var deleteTask = function (index) {
    var getLocalStorage = localStorage.getItem("New Todo");
    var listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
};
deleteAllButton.onclick = function () {
    var getLocalStorage = localStorage.getItem("New Todo");
    var listArr = JSON.parse(getLocalStorage);
    listArr = [];
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
};
showTasks();
