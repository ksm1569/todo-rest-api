# Todo List RESTful API 튜토리얼

이 프로젝트는 Node.js, Express.js, MongoDB를 사용하여 만든 간단한 Todo List RESTful API 애플리케이션입니다.

## 기능

- Todo 항목 생성
- Todo 목록 조회
- Todo 항목 수정
- Todo 항목 삭제

## 기술 스택

- Backend: Node.js, Express.js
- Database: MongoDB
- Frontend: HTML, CSS, JavaScript (Vanilla)

## 프로젝트 구조

``` plaintext
/todo-rest-api
│
├── public
│   ├── index.html   # 프론트엔드 HTML
│   ├── styles.css   # CSS 스타일
│   └── scripts.js   # 프론트엔드 JavaScript
│
├── server.js        # 서버 설정 및 API 엔드포인트
├── .gitignore       # Git 무시 파일
└── README.md        # 이 문서
```

## 시작하기

### 사전 요구사항

- Node.js (v12.0.0 이상)
- MongoDB

### MongoDB 설치

#### macOS

Homebrew를 사용한 MongoDB 설치
brew tap mongodb/brew
brew install mongodb-community
MongoDB 서비스 시작
brew services start mongodb/brew/mongodb-community


#### Windows

1. [MongoDB 다운로드 센터](https://www.mongodb.com/try/download/community)에서 MongoDB Community Server 다운로드
2. 다운로드한 설치 파일 실행
3. "Complete" 설치 옵션 선택
4. "MongoDB Compass" 설치 옵션 체크 (선택사항)
5. 설치 완료 후 MongoDB 서비스가 자동으로 시작됨

### 프로젝트 설정

1. 프로젝트 디렉토리 생성 및 초기화
``` bash
mkdir todo-rest-api
cd todo-rest-api
npm init -y
```

2. 필요한 패키지 설치
``` bash
npm install express mongoose body-parser
```

3. 프로젝트 파일 생성
- `server.js` - 서버 설정 및 API 엔드포인트
- `public/index.html` - 프론트엔드 HTML
- `public/styles.css` - CSS 스타일
- `public/scripts.js` - 프론트엔드 JavaScript

4. 서버 실행
``` bash
node server.js
```

서버가 실행되면 `http://localhost:3000`에서 애플리케이션에 접속할 수 있습니다.

## API 엔드포인트

| 메소드 | 엔드포인트 | 설명 |
|--------|------------|------|
| GET    | /todos     | 모든 Todo 항목 조회 |
| POST   | /todos     | 새로운 Todo 항목 생성 |
| PUT    | /todos/:id | 특정 Todo 항목 수정 |
| DELETE | /todos/:id | 특정 Todo 항목 삭제 |

### 요청/응답 예시

#### Todo 생성
``` json
// POST /todos
// Request
{
"title": "새로운 할 일"
}
// Response
{
"id": "60f1234567890",
"title": "새로운 할 일",
"completed": false
}
```

#### Todo 목록 조회
``` json
// POST /todos
// Request
{
"title": "새로운 할 일"
}
// Response
{
"id": "60f1234567890",
"title": "새로운 할 일",
"completed": false
}
```

#### Todo 수정
``` json
// PUT /todos/:id
// Request
{
"id": "60f1234567890",
"title": "수정된 할 일"
}
// Response
{
"id": "60f1234567890",
"title": "수정된 할 일",
"completed": false
}
```

#### Todo 삭제
``` json
// DELETE /todos/:id
// Request
{
"id": "60f1234567890"
}
// Response
{
"message": "Todo 항목이 성공적으로 삭제되었습니다."
}
```

## 문제 해결

### MongoDB 연결 오류
- MongoDB 서비스가 실행 중인지 확인
- MongoDB 기본 포트(27017)가 사용 가능한지 확인

### 서버 실행 오류
- 포트 3000이 이미 사용 중인 경우, `server.js`에서 다른 포트 번호로 변경
- 필요한 모든 패키지가 설치되어 있는지 확인
