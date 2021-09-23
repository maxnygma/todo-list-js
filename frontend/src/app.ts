const inputBox = document.querySelector(".task-input input") as HTMLInputElement
const addButton = document.querySelector(".task-input button") as HTMLButtonElement
const todoList = document.querySelector(".todo-list") as HTMLUListElement
const deleteAllButton = document.querySelector(".clear-tasks") as HTMLButtonElement
const bottomTitle = document.querySelector(".bottom-title") as HTMLSpanElement

inputBox.onkeyup = () => {
    let userData = inputBox.value

    if (userData.trim().length != 0) {
        addButton.classList.add("active")
    }
    else {
        addButton.classList.remove("active")
    }
}

addButton.onclick = () => {
    let userData = inputBox.value
    let getLocalStorage = localStorage.getItem("New Todo")
    let listArr: string[]

    if (getLocalStorage == null) {
        listArr = []
    }
    else {
        listArr = JSON.parse(getLocalStorage)
    }

    listArr.push(userData)
    localStorage.setItem("New Todo", JSON.stringify(listArr))

    addButton.classList.remove("active")

    showTasks()
}

let showTasks = () => {
    let getLocalStorage = localStorage.getItem("New Todo")
    let listArr: string[]

    if (getLocalStorage == null) {
        listArr = []
    }
    else {
        listArr = JSON.parse(getLocalStorage)
    }

    let newTag = ''
    listArr.forEach((element: string, index: number) => {
        newTag += `<li> <div>${element}</div> <span onclick="deleteTask(${index})" class="material-icons delete-icon">delete</span></li>`
    })

    bottomTitle.textContent = `You have ${listArr.length} pending events`

    todoList.innerHTML = newTag
    inputBox.value = ""
}

let deleteTask = (index: number) => {
    let getLocalStorage = localStorage.getItem("New Todo")
    let listArr = JSON.parse(getLocalStorage)
    listArr.splice(index, 1)

    localStorage.setItem("New Todo", JSON.stringify(listArr))

    showTasks()
}

deleteAllButton.onclick = () => {
    let getLocalStorage = localStorage.getItem("New Todo")
    let listArr = JSON.parse(getLocalStorage)

    listArr = []

    localStorage.setItem("New Todo", JSON.stringify(listArr))

    showTasks()
}

showTasks()


