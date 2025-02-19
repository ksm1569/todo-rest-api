document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addTodoButton = document.getElementById('addTodo');
    const todoList = document.getElementById('todoList');

    // 할 일 추가 (버튼 클릭)
    addTodoButton.addEventListener('click', () => addTodo());

    // 할 일 추가 (엔터키)
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // 할 일 추가 함수
    async function addTodo() {
        const title = todoInput.value.trim();
        if (!title) return;

        try {
            const response = await fetch('/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });

            if (!response.ok) throw new Error('할 일 추가에 실패했습니다.');

            const newTodo = await response.json();
            addTodoToList(newTodo);
            todoInput.value = '';
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    }

    // 할 일 목록에 추가하기
    function addTodoToList(todo) {
        const li = document.createElement('li');
        li.dataset.id = todo._id;
        
        const todoText = document.createElement('span');
        todoText.textContent = todo.title;
        li.appendChild(todoText);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        // 수정 버튼
        const editButton = createButton('수정', async () => {
            const newTitle = prompt('새 제목을 입력하세요:', todo.title);
            if (!newTitle || newTitle === todo.title) return;

            try {
                const updatedTodo = await updateTodo(todo._id, newTitle);
                todoText.textContent = updatedTodo.title;
            } catch (error) {
                console.error('Error:', error);
                alert('수정에 실패했습니다.');
            }
        });

        // 삭제 버튼
        const deleteButton = createButton('삭제', async () => {
            if (!confirm('정말 삭제하시겠습니까?')) return;

            try {
                await deleteTodo(todo._id);
                li.remove();
            } catch (error) {
                console.error('Error:', error);
                alert('삭제에 실패했습니다.');
            }
        });

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        li.appendChild(buttonContainer);
        todoList.appendChild(li);
    }

    // 버튼 생성 함수
    function createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = text === '수정' ? 'edit-btn' : 'delete-btn';
        button.onclick = onClick;
        return button;
    }

    // Todo 수정 함수
    async function updateTodo(id, title) {
        const response = await fetch(`/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });

        if (!response.ok) throw new Error('수정에 실패했습니다.');
        return await response.json();
    }

    // Todo 삭제 함수
    async function deleteTodo(id) {
        const response = await fetch(`/todos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('삭제에 실패했습니다.');
    }

    // 초기 로드 시 할 일 목록 가져오기
    async function loadTodos() {
        try {
            const response = await fetch('/todos');
            if (!response.ok) throw new Error('할 일 목록을 불러오는데 실패했습니다.');
            
            const todos = await response.json();
            todos.forEach(addTodoToList);
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    }

    loadTodos();
}); 