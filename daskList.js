const inputText = document.getElementById("input_text");
const set = document.getElementById("set");
const task = document.getElementById("task_list");
const buttonDelete = document.getElementById("delete");

//press enter add input em list
inputText.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    if (inputText.value == "") {
    } else {
      createList();
    }
  }
});

// click em input add em list
set.addEventListener("click", () => {
  if (inputText.value == "") {
  } else {
    createList();
  }
});

const createList = () => {
  insertUl();
  cleanInput();
  saveArchives();
};

const createLi = () => {
  const li = document.createElement("li");
  return li;
};

const insertLi = (daskLi) => {
  const li = createLi();
  li.innerHTML = `<span>${inputText.value}</span>`;
  return li;
};

const insertUl = (daskLi) => {
  const li = insertLi(daskLi);
  const button = createIntButton(li);
  task.appendChild(li);
};

const cleanInput = () => {
  inputText.value = "";
  inputText.focus();
};

const createIntButton = (li) => {
  const button = document.createElement("button");
  button.setAttribute("class", "delete");
  button.innerHTML = "X";
  li.appendChild(button);
};

//delete li
document.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("delete")) {
    el.parentElement.remove();
  }
  saveArchives();
});

//save archives
const saveArchives = () => {
  const li = document.querySelectorAll("li");
  const array = [];

  for (let dask of li) {
    let textLi = dask.querySelector("span").innerText;
    array.push(textLi);
  }
  console.log("save archives");
  const dasksJSON = JSON.stringify(array);
  localStorage.setItem("dasks", dasksJSON);
};

//loading dask
const loadingDask = () => {
  const dask = localStorage.getItem("dasks");
  const daskList = JSON.parse(dask);
  console.log("loading archives");
  let id = 0;
  for (let daskLi of daskList) {
    task.innerHTML += `<li id="id-${id}"><span>${daskLi}</span></li>`;
    const li = task.querySelector(`li#id-${id}`);
    id++;
    createIntButton(li);
  }
};
loadingDask();
