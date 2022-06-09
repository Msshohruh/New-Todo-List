const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
const messageCreate = document.getElementById('message')

const LIST = 'list'
const todos = JSON.parse(localStorage.getItem(LIST)) ? JSON.parse(localStorage.getItem(LIST)) : []

// setTodos
function setTodos() {
    localStorage.setItem(LIST, JSON.stringify(todos))
} 

// check localStorage
if (todos.length) showTodos(LIST)


// date
const now = new Date()
const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
const date = dateFns.format(now, `HH:mm ${day}.MM.YYYY`)


// show Todos
function showTodos() {
    const todos = JSON.parse(localStorage.getItem(LIST))
    listGroupTodo.innerHTML = ''
    todos.forEach((todo, index) => {
        listGroupTodo.innerHTML += `
            <li class="list-group-item">
                <p class="text-break">${todo.text}</p>
                <div class="todo-icons">
                    <span class="opacity-50 me-2">${todo.time}</span>
                    <img onclick="editTodo(${index})" src="./img/edit.svg" alt="edit-icon" width="25" height="25">
                    <img onclick="deleteTodo(${index})" src="./img/delete.svg" alt="delete-icon" width="25" height="25">
                </div>
            </li>
        `
    })
}

// getTodo
formCreate.addEventListener('submit', (e) => {
    e.preventDefault()
    const todoText = formCreate['input-create'].value.trim()
    formCreate['input-create'].value = ''
    if (todoText.length){
        todos.push({
            'text': todoText,
            'time': date,
            'completed': false
        })
        setTodos()
        showTodos()
    } else{
        messageCreate.textContent = `Please, enter some todo...`
            setTimeout(() => {
                messageCreate.textContent = ''
            }, 2000)
    }
})

// deleteTodo
function deleteTodo(id) {
    todos.splice(id, 1)
    setTodos()
    showTodos()
}

// changeTodo
let id
function editTodo(i){
    id = Number(i)
    modalOn()
}   
formEdit.addEventListener('submit', (e) => {
    e.preventDefault()
    e.stopPropagation()
    const newText = formEdit['input-edit'].value.trim()
    formEdit['input-edit'].value = ''
    if (newText.length){
        // todos[id] = newText /*-- method without splice()*/
        todos.splice(id, 1, {
            'text': newText,
            'time': date,
            'completed': false
        })
        setTodos()
        showTodos()
        modalOff()
    } else { 
        document.getElementById('modal-message').textContent = `Please, enter some text!!!`
        setTimeout(() => {
            document.getElementById('modal-message').textContent = ''
        }, 2000)
    }
})

function modalOff(){
    document.getElementById('modal').classList.add('hidden')
    document.getElementById('overlay').classList.add('hidden')
}
function modalOn(){
    formEdit['input-edit'].value = ''
    document.getElementById('modal').classList.remove('hidden')
    document.getElementById('overlay').classList.remove('hidden')
}
document.getElementById('modal-close').addEventListener('click', () =>{
    modalOff()
})