const todoInput = document.getElementById('todoInput');
const addTodoButton = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');

// Todo 추가하기
addTodoButton.addEventListener('click', async () => {
    const todoText = todoInput.value;
    if (todoText) {
        const response = await fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: todoText }),
        });
        const newTodo = await response.json();
        addTodoToList(newTodo);
        todoInput.value = '';
    }
});

// Todo 목록 가져오기
async function fetchTodos() {
    const response = await fetch('/todos');
    const todos = await response.json();
    todos.forEach(addTodoToList);
}

// Todo 목록에 추가하기
function addTodoToList(todo) {
    const li = document.createElement('li');
    li.textContent = todo.title;
    todoList.appendChild(li);
}

// 페이지 로드 시 Todo 목록 가져오기
fetchTodos(); 