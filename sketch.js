
let side_length = 20;
const container = document.querySelector('.container');

let colorSelection = true;
const eraseColor = '#ffffff';
const defaultColor = '#000000'
let chosenColor = defaultColor;
let selectedColor = defaultColor;

function getRandomHexColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function colorSquare() {
    let color = chosenColor
    if (!colorSelection) {
        color = getRandomHexColor();
    }
    this.style.backgroundColor = color;
}

function removeGrid() {
    while (container.firstChild) {
        let row = container.firstChild;
        while (row.firstChild) {
            let square = row.firstChild;
            square.removeEventListener('mouseenter', colorSquare)
            row.removeChild(square);
        }
        container.removeChild(row);
    }
}

function createGrid() {
    // Set up the HTML Elements and their Classes
    for (let i = 0; i < side_length; i++) {
        let row = document.createElement('div');
        row.classList.add('row')
        for (let j = 0; j < side_length; j++) {
            let square = document.createElement('div');
            square.classList.add('square')
            square.addEventListener('mouseenter', colorSquare)
            row.appendChild(square)
        }
        container.appendChild(row);
    }
}
  
// Select the slider element
const slider = document.querySelector('#slider');
const label = document.querySelector('.label');
// Add an event listener for the 'input' event
slider.addEventListener('input', function() {
    side_length = this.value;
    label.innerText = `Grid Size: ${side_length} x ${side_length}`;
    removeGrid();
    createGrid();
});


const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', function() {
    removeGrid();
    createGrid();
});

const eraseButton = document.querySelector('#erase');
eraseButton.addEventListener('change', function() {
    colorSelection = true;
    chosenColor = eraseColor;
});


const colorButton = document.querySelector('#defaultColor');
colorButton.addEventListener('change', function() {
    colorSelection = true;
    chosenColor = selectedColor;
});

const randomButton = document.querySelector('#randomColor');
randomButton.addEventListener('change', function() {
    colorSelection = false;
});


let colorSelector = document.querySelector('#colorSelector')
colorSelector.addEventListener('input', function() {
    // Get the selected color value
    selectedColor = this.value;
    // If the Default Color Mode is on, then change the color as well
    if (colorButton.checked) {
        chosenColor = selectedColor;
    }
});




createGrid();