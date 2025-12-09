const todoList = JSON.parse(localStorage.getItem('lists')) || [{
    name:'Buy Lunch',
    dueDate:'2025-05-10'}, {
    name:'Code',
    dueDate:'2025-17-10'

}]

renderTodoList();
function renderTodoList(){
let todoListHTML = '';


todoList.forEach((todoOObject, index) => {
    const { name, dueDate } = todoOObject;
    const html = `
    <div> ${name} </div>
    <div> ${dueDate} </div>
    <button
    class="delete-todo js-delete-todo">Delete</button>
    `;
    localStorage.setItem('lists', JSON.stringify(todoList))
    todoListHTML += html;
});

    document.querySelector('.js-result').innerHTML = todoListHTML;

    document.querySelectorAll('.js-delete-todo').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            todoList.splice(index, 1);
            renderTodoList();
            saveStorage();
        })
    })
}

document.querySelector('.js-add-todo').addEventListener('click', () => {
    addTodo();
});

function addTodo() {
    const inputElement = document.querySelector('.js-input');
    const name = inputElement.value
    
    const dateInputElement = document.querySelector('.js-due-date');
    const dueDate = dateInputElement.value

    todoList.push({
        name,
        dueDate
    });
    inputElement.value = '';

    renderTodoList();

    saveStorage();
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}

function saveStorage () {
    localStorage.setItem('lists', JSON.stringify(todoList))
}