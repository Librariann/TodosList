const input = document.querySelector(".button-input");
const todo = document.querySelector(".todo-input");
const contents = document.querySelector(".contents");
const contentsUl = document.querySelector(".contents-ul");
const todosButton = document.querySelector(".todos");
const completeTodosButton = document.querySelector(".complete");

const SAVE = "TODOS";
const SAVE_COMPLETE = "COMPLETE";
const SAVE_COMPLETE_LOG = "LOG";

let getTodosArray = [];
let getCompleteTodosArray = [];
let completeTodosLogArray = [];

//uuid 생성
const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

//할 일 저장
const saveTodo = () => {
  localStorage.setItem(SAVE, JSON.stringify(getTodosArray));
};

//할 일 완료 목록
const saveCompleteTodos = () => {
  localStorage.setItem(SAVE_COMPLETE, JSON.stringify(getCompleteTodosArray));
};

//완료 목록 Log 저장
const saveCompleteLogTodos = () => {
  localStorage.setItem(
    SAVE_COMPLETE_LOG,
    JSON.stringify(completeTodosLogArray)
  );
};

//LocalStorage에 있는 todos, complete 목록 불러옴
const getLocalStorage = () => {
  const getTodos = localStorage.getItem(SAVE);
  const getCompleteTodos = localStorage.getItem(SAVE_COMPLETE);

  //불러올 오늘 할 일이 있다면
  if (getTodos) {
    getTodosArray = JSON.parse(getTodos);
  }

  //불러올 완료 목록이 있다면
  if (getCompleteTodos) {
    getCompleteTodosArray = JSON.parse(getCompleteTodos);
  }
};

//완료목록 삭제
const deleteCompleteTodo = (event) => {
  const target = event.target.parentElement;
  target.remove();
  const completeLog = getCompleteTodosArray.filter(
    (item) => item.id === target.id
  );

  const complete = getCompleteTodosArray.filter(
    (item) => item.id !== target.id
  );
  getCompleteTodosArray = complete;

  completeTodosLogArray.push(completeLog[0]);

  saveCompleteTodos();
  saveCompleteLogTodos();
  getCompleteTodosList();
};

//완료목록 TodoList 로 돌리기
const undoCompleteTodo = (event) => {
  const target = event.target.parentElement;
  target.remove();
  const undoComplete = getCompleteTodosArray.filter(
    (item) => item.id === target.id
  );
  getTodosArray.push(undoComplete[0]);

  const complete = getCompleteTodosArray.filter(
    (item) => item.id !== target.id
  );
  getCompleteTodosArray = complete;

  saveTodo();
  saveCompleteTodos();
  getCompleteTodosList();
};

//오늘 할 일 완료
const completeTodo = (event) => {
  const target = event.target.parentElement;
  target.remove();
  const todos = getTodosArray.filter((item) => item.id !== target.id);
  const todosComplete = getTodosArray.filter((item) => item.id === target.id);
  getTodosArray = todos;

  //완료일자 작성
  todosComplete[0].date = new Date();
  getCompleteTodosArray.push(todosComplete[0]);

  saveTodo();
  saveCompleteTodos();
  getTodosList();
};

/**
 *
 * @param {Object} value todo value
 * @param {Int} index todo 순번
 * @param {Boolean} complete todo 완료 여부 true, false
 */
const createElementLi = (value, index, complete) => {
  const newDate = new Date(value.date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const hour = newDate.getHours();
  const minutes = newDate.getMinutes();
  const time = year + "-" + month + "-" + date + " " + hour + ":" + minutes;

  //li 생성
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML =
    index +
    ". " +
    value.value +
    "<br />" +
    "<span style='margin-left:22px'>" +
    time +
    "</span>";
  li.id = value.id;
  const deleteButton = document.createElement("button");
  const undoButton = document.createElement("button");

  //todos 완료 했을때
  if (complete) {
    undoButton.innerHTML = "&#9194;";
    undoButton.addEventListener("click", undoCompleteTodo);

    deleteButton.innerHTML = "&#10060;";
    deleteButton.addEventListener("click", deleteCompleteTodo);
  }

  //todos 완료하지 못했을때
  if (!complete) {
    deleteButton.innerHTML = "&#9989;";
    deleteButton.addEventListener("click", completeTodo);
  }

  li.appendChild(span);
  complete ? li.appendChild(undoButton) : "";
  li.appendChild(deleteButton);

  contentsUl.appendChild(li);
};

//입력 버튼 클릭 시
const clickToSaveTodo = () => {
  if (todo.value === "" || todo.value === null) {
    alert("오늘 할 일을 입력해주세요");
    return;
  }

  getTodosList();

  const inputItem = {
    id: uuidv4(),
    value: todo.value,
    date: new Date(),
  };

  //Object 생성 및 Array에 입력 후 저장
  getTodosArray.push(inputItem);
  saveTodo();
  createElementLi(inputItem, getTodosArray.length, false);
  todo.value = "";
};

//li 완전 삭제 - 번호 문제때문에 사용
const removeAllChild = () => {
  while (contentsUl.hasChildNodes()) {
    contentsUl.removeChild(contentsUl.firstChild);
  }
};

//오늘 할 일 목록 불러오기
const getTodosList = () => {
  removeAllchild();
  todosButton.classList.add("select");
  completeTodosButton.classList.remove("select");
  getTodosArray.map((value, index) => {
    createElementLi(value, index + 1, false);
  });
};

//완료 목록 불러오기
const getCompleteTodosList = () => {
  removeAllchild();
  todosButton.classList.remove("select");
  completeTodosButton.classList.add("select");
  getCompleteTodosArray.map((value, index) => {
    createElementLi(value, index + 1, true);
  });
};

input.addEventListener("click", clickToSaveTodo);
todosButton.addEventListener("click", getTodosList);
completeTodosButton.addEventListener("click", getCompleteTodosList);

function init() {
  getLocalStorage();
  getTodosList();
}

init();
