let outerBox = document.getElementById("outerBox");
let startbtn = document.getElementById("start");
let size = 0;
let score = 0;

startbtn.addEventListener("click", () => {
  size = document.getElementById("size").value;
  e = document.getElementById("error");

  if (isNaN(size)) {
    e.innerText = "Enter a valid number";
  } else if (size < 4) {
    e.innerText = "Number must be greater than or equal to 4";
  } else {
    size = parseFloat(size);
    e.innerText = "";
    start();
  }
});
function removeValueClasses(box) {
  box.classList.forEach((cls) => {
    if (cls.startsWith("v")) {
      box.classList.remove(cls);
    }
  });
}

function displayScore(a) {
  score = score + a * 2;
  console.log(score);
  document.getElementById("scoreValue").innerText = score;
}
function convertToEmptyBox(i, innerBoxs) {
  innerBoxs[i].innerText = "";
  innerBoxs[i].classList.add("empty");
  innerBoxs[i].classList.remove("active");
  removeValueClasses(innerBoxs[i]);
}
function convertToValueBox(i, j, innerBoxs) {
  innerBoxs[i].innerText = parseInt(innerBoxs[j].innerText);
  innerBoxs[i].classList.remove("empty");
  innerBoxs[i].classList.add("active");
  applyColor(innerBoxs[i], parseInt(innerBoxs[j].innerText));
  removeValueClasses(innerBoxs[j]);
}

function applyColor(box, value) {
  box.classList.add(`v${value}`);
}

function start() {
  document.getElementById("startGameBox").style.display = "none";
  document.getElementById("scoreBoard").style.display = "flex";
  document.getElementById("hint").style.display = "block";

  outerBox.style.gridTemplateColumns = `repeat(${size}, 70px)`;
  outerBox.style.gridTemplateRows = `repeat(${size}, 70px)`;

  for (let i = 0; i < size ** 2; i++) {
    let innerBox = document.createElement("div");
    innerBox.id = i + 1;
    innerBox.classList.add("innerBox", "empty");
    outerBox.appendChild(innerBox);
  }
  let innerBoxs = outerBox.childNodes;

  function spawn(innerBoxs) {
    let emptyInnerBoxes = [];
    for (let i of innerBoxs) {
      if (i.classList.contains("empty")) {
        emptyInnerBoxes.push(i);
      }
    }
    let pos = Math.floor(Math.random() * emptyInnerBoxes.length);
    emptyInnerBoxes[pos].innerText = 2;
    emptyInnerBoxes[pos].classList.toggle("empty");
    emptyInnerBoxes[pos].classList.add("active");
    emptyInnerBoxes = [];
  }
  function keyD(innerBoxs) {
    for (let i = 0; i < innerBoxs.length; i++) {
      for (let j = 0; j < innerBoxs.length; j++) {
        if (
          j + size < innerBoxs.length &&
          innerBoxs[j].innerText !== "" &&
          innerBoxs[j + size].classList.contains("empty")
        ) {
          convertToValueBox(j + size, j, innerBoxs);
          convertToEmptyBox(j, innerBoxs);
        }
        if (
          j + size < innerBoxs.length &&
          innerBoxs[j].innerText != "" &&
          !innerBoxs[j + size].classList.contains("empty")
        ) {
          let a = parseInt(innerBoxs[j].innerText);
          let b = parseInt(innerBoxs[j + size].innerText);
          if (a == b) {
            innerBoxs[j + size].innerText = a + b;
            applyColor(innerBoxs[j + size], a + b);
            removeValueClasses(innerBoxs[j]);

            displayScore(a);
            convertToEmptyBox(j, innerBoxs);
          }
        }
      }
    }
  }
  function keyU(innerBoxs) {
    for (let i = 0; i < innerBoxs.length; i++) {
      for (let j = 0; j < innerBoxs.length; j++) {
        if (
          j - size >= 0 &&
          innerBoxs[j].innerText !== "" &&
          innerBoxs[j - size].classList.contains("empty")
        ) {
          convertToValueBox(j - size, j, innerBoxs);
          convertToEmptyBox(j, innerBoxs);
        }
        if (
          j - size >= 0 &&
          innerBoxs[j].innerText != "" &&
          !innerBoxs[j - size].classList.contains("empty")
        ) {
          let a = parseInt(innerBoxs[j].innerText);
          let b = parseInt(innerBoxs[j - size].innerText);
          if (a == b) {
            innerBoxs[j - size].innerText = a + b;
            applyColor(innerBoxs[j - size], a + b);
            removeValueClasses(innerBoxs[j]);
            displayScore(a);
            convertToEmptyBox(j, innerBoxs);
          }
        }
      }
    }
  }
  function keyR(innerBoxs) {
    for (let i = 0; i < innerBoxs.length; i++) {
      for (let j = 0; j < innerBoxs.length; j++) {
        if (
          j + 1 < innerBoxs.length &&
          innerBoxs[j].innerText &&
          innerBoxs[j + 1].classList.contains("empty") &&
          Math.floor(j / size) == Math.floor((j + 1) / size)
        ) {
          convertToValueBox(j + 1, j, innerBoxs);
          convertToEmptyBox(j, innerBoxs);
        }
        if (
          j + 1 < innerBoxs.length &&
          innerBoxs[j].innerText != "" &&
          !innerBoxs[j + 1].classList.contains("empty") &&
          Math.floor(j / size) == Math.floor((j + 1) / size)
        ) {
          let a = parseInt(innerBoxs[j].innerText);
          let b = parseInt(innerBoxs[j + 1].innerText);
          if (a == b) {
            innerBoxs[j + 1].innerText = a + b;
            applyColor(innerBoxs[j + 1], a + b);
            removeValueClasses(innerBoxs[j]);
            displayScore(a);
            convertToEmptyBox(j, innerBoxs);
          }
        }
      }
    }
  }
  function keyL(innerBoxs) {
    for (let i = 0; i < innerBoxs.length; i++) {
      for (let j = 0; j < innerBoxs.length; j++) {
        if (
          j - 1 >= 0 &&
          innerBoxs[j].innerText &&
          innerBoxs[j - 1].classList.contains("empty") &&
          Math.floor(j / size) == Math.floor((j - 1) / size)
        ) {
          convertToValueBox(j - 1, j, innerBoxs);
          convertToEmptyBox(j, innerBoxs);
        }
        if (
          j - 1 >= 0 &&
          innerBoxs[j].innerText != "" &&
          !innerBoxs[j - 1].classList.contains("empty") &&
          Math.floor(j / size) == Math.floor((j - 1) / size)
        ) {
          let a = parseInt(innerBoxs[j].innerText);
          let b = parseInt(innerBoxs[j - 1].innerText);
          if (a == b) {
            innerBoxs[j - 1].innerText = a + b;
            applyColor(innerBoxs[j - 1], a + b);
            removeValueClasses(innerBoxs[j]);
            displayScore(a);
            convertToEmptyBox(j, innerBoxs);
          }
        }
      }
    }
  }
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        keyU(innerBoxs);
        spawn(innerBoxs);
        break;
      case "ArrowDown":
        keyD(innerBoxs);
        spawn(innerBoxs);
        break;
      case "ArrowLeft":
        keyL(innerBoxs);
        spawn(innerBoxs);
        break;
      case "ArrowRight":
        keyR(innerBoxs);
        spawn(innerBoxs);
        break;
    }
  });
}
