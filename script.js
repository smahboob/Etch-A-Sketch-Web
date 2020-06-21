
const container = document.getElementById("container");

function makeGrid(size) {
  container.style.setProperty('--grid-rows', size);
  container.style.setProperty('--grid-cols', size);
  for (i = 0; i < (size * size); i++) {
    let cell = document.createElement("div");
    cell.className = "grid-item";
    container.appendChild(cell);
  };
};

makeGrid(60);
let stopBrush;

let arr;
function changes(){
    const div_elemt = document.querySelectorAll('.grid-item');
    arr = Array.from(div_elemt);

    arr.forEach(item => {
        item.addEventListener('mouseenter', hover)
    });

    arr.forEach(item => {
        item.addEventListener('dblclick', hover1)
        stopBrush = true;
    });
}

changes()

function hover(e){
    e.target.style.backgroundColor = "black";
}

function hover1(e){
    const div_elemt = document.querySelectorAll('.grid-item');
    arr = Array.from(div_elemt);
    if (stopBrush == true){
        arr.forEach(item => {
            item.removeEventListener('mouseenter', hover)
        });
        stopBrush = false;
    }
    else if (stopBrush == false){
        arr.forEach(item => {
            item.addEventListener('mouseenter', hover)
        });
        stopBrush = true;
    }
}

let clearButton = document.querySelector('#clear-button')
clearButton.addEventListener('click', clear)

function clear(e){

    arr.forEach(item => {
        item.parentNode.removeChild(item);
    });
    let size = prompt("Enter size of the new Grid. (Between 10-100)");
    while(size == "" || parseInt(size) > 100 || parseInt(size) <  10){
        size = prompt("Enter size of the new Grid. (Between 10-100)");
    }
    makeGrid(size);
    changes()
}

let removee = document.getElementById('remove-all');
removee.addEventListener('click', rem)

function rem(e){
    arr.forEach(item => {
        item.style.backgroundColor = "white";
    });
}

let colorChange = document.getElementById('pick-color');
colorChange.addEventListener('click', change)

function change(e){
    if(e.target.innerHTML == "Black Brush"){
        e.target.innerHTML = "Multi Color Brush";
        arr.forEach(item => {
            item.addEventListener('mouseenter', changeBack)
        });
        arr.forEach(item => {
            item.removeEventListener('mouseenter', changeIt)
        });
    }
    else if(e.target.innerHTML == "Multi Color Brush"){
        e.target.innerHTML = "Black Brush";
        arr.forEach(item => {
            item.addEventListener('mouseenter', changeIt)
        });
        arr.forEach(item => {
            item.removeEventListener('mouseenter', changeBack)
        });
    }
}

function changeIt(e){
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    e.target.style.backgroundColor = "#" + randomColor;
}

function changeBack(f){
    f.target.style.backgroundColor = "black";
}

