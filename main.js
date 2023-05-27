const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
    name: 'Make Dinner',
    dueDate: '2023-05-26'
}, {
    name: 'Wash Dishes',
    dueDate: '2023-05-26'
}];

renderTodoList();

function renderTodoList() {

    let todoListHtml = '';

    todoList.forEach((todoObject, index) => {
        const { name, dueDate } = todoObject;
        const html = `
            <div>${name}</div>
            <div>${dueDate}</div>
            <button class="delete-todo-button">Delete</button>
        `; //generating the html
        todoListHtml += html;
    });

    document.querySelector('.js-todo-list').innerHTML = todoListHtml;
    localStorage.setItem('list', todoList);
    document.querySelectorAll('.delete-todo-button').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            todoList.splice(index, 1);
            renderTodoList();
            saveToStorage();
        });
    });
}

document.querySelector('.add-todo-button').addEventListener('click', () => {
    addTodo();
});

function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.js-duedate-input');
    const dueDate = dateInputElement.value;

    todoList.push({
        //name: name,
        //dueDate: dueDate
        name,
        dueDate
    });
    inputElement.value = '';
    renderTodoList();
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function handleCostKeydown(event) {
    console.log(event.key);
    if (event.key === 'Enter') {
        addTodo();
    }
}