const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// 정적 파일 제공
app.use(express.static('public'));

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Todo 모델 정의
const Todo = mongoose.model('Todo', new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
}));

// CRUD API 엔드포인트

// 1. 모든 Todo 가져오기
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// 2. Todo 추가하기
app.post('/todos', async (req, res) => {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
});

// 3. Todo 수정하기
app.put('/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(todo);
});

// 4. Todo 삭제하기
app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});

// 기본 경로에 대한 라우트 추가
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
}); 