const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const textdate = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const task = document.getElementById("tasks");
const add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

const formValidation = () => {
  if (textInput.value === "") {
    msg.innerText = "This section is required to fill";
    //console.log("data not found");
  } else {
    msg.innerText = "";
    //console.log("data found");
    getData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

const getData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    task: textarea.value,
  });
  //console.log(data);

  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);

  createTodo();
};

const createTodo = () => {
  task.innerHTML = "";
  data.map((ele, index) => {
    return (task.innerHTML += `<div id=${index}>
        <span class="fw-bolder">${ele.text}</span>
        <span>${ele.date}</span>
        <p>${ele.task}</p>
        <span class="options">
          <i onclick="editData(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-regular fa-pen-to-square"></i>
          <i onclick="deleteData(this);createTodo() "class="fa-solid fa-trash-can"></i>
        </span>
      </div>`);
  });
  resetTodo();
};


const resetTodo = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTodo();
  })();

const deleteData = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.index,1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

const editData = (e) => {
  let task = e.parentElement.parentElement;
  textInput.value = task.children[0].innerHTML;
  dateInput.value = task.children[1].innerHTML;
  textarea.value = task.children[2].innerHTML;

  //task.remove()
  deleteData(e);
};
