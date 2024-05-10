const rowEl = document.getElementById('row');
const columnEl = document.getElementById('column');
const startBtn = document.getElementById('start');
const gameField = document.getElementById('gameField');
const score = document.getElementById('score');
let activeId = [];
let intervalId = null;
let figur;
const board = [];

// gameField.append(board);
const rowCount = +rowEl.value;
const colCount = +columnEl.value;
const sellCount = rowCount * colCount;
let width = colCount;


// -------------------------------   FIGURES -------------------------------------------------
const figT = [
    [width, width + 1, width + 2, 1],
    [0, width, width * 2, width + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [0, width, width * 2, width - 1],
];
/*

***
 *
 
*/



const figI = [
    [0, width, width * 2, width * 3],
    [width, width + 1, width + 2, width + 3],
    [0, width, width * 2, width * 3],
    [width, width + 1, width + 2, width + 3],
];
/*

****

*/

const figSqu = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
];
/*

* *
* *

*/

const figZ = [
    [0, 1, width + 1, width + 2],
    [1, width, width + 1, width * 2],
    [0, 1, width + 1, width + 2],
    [1, width, width + 1, width * 2],
];

/*

**
 **
    
*/


const figForwZ = [
    [1, 0, width, width - 1],
    [0, width, width + 1, width * 2 + 1],
    [1, 0, width, width - 1],
    [0, width, width + 1, width * 2 + 1],
];

/*

 **
**

  
*/

const figL = [
    [1, width + 1, width * 2 + 1, 0],
    [width, width + 1, width + 2, 2],
    [1, width + 1, width * 2 + 1, width * 2 + 2],
    [width, width + 1, width + 2, width * 2 + 2]
];

/*

* 
* 
* *
  
*/



const figForwL = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
];




const colors = {
    figT: 'red',
    figI: 'green',
    figSqu: 'yellow',
    figZ: 'blue',
    figForwZ: 'purple',
    figL: 'brown',
    figForwL: 'orange'
}

/*

  *
  * 
* *
  
*/


const figures = [figT, figI, figSqu, figZ, figForwZ, figL, figForwL];

// ------------------------------------------------------ End of FIGURES ---------------------------------------------------------



startBtn.addEventListener('click', () => {
    // debugger;
    gameField.innerHTML = "";
    const gameBoard = document.createElement('div')
    gameBoard.id = "game"
    gameBoard.innerHTML = "";
    gameBoard.style.width = colCount * 22 + "px";
    gameBoard.style.height = rowCount * 22 + "px";
    gameField.append(gameBoard);
    const cell = {};

    for (let i = 0; i < sellCount; i++) {
        const cellEl = document.createElement('div');
        cellEl.id = i;
        cellEl.className = "cell"
        cellEl.setAttribute("y", Math.floor(i / colCount));
        cellEl.setAttribute("x", i % colCount);
        cellEl.setAttribute("value", 0);
        cellEl.dataset.y = Math.floor(i / colCount);
        cellEl.dataset.x = i % colCount;
        cell[cellEl.id] = {
            y: Math.floor(i / colCount),
            x: i % colCount,
        }
        board.push(cellEl);
        gameBoard.append(cellEl);
    }

    // const board = document.querySelector('.cell')
    let curentPosition = 4;
    let k = 0;
    let currentFigure = figures[randomNumGen(7)][k];
    let nextFigure = figures[randomNumGen(7)][k];


    function draw() {
        // debugger;

        currentFigure.forEach(item => {
            board[curentPosition + item].classList.add('figure')
            board[curentPosition + item].setAttribute('value', 1)
            activeId.push(+board[curentPosition + item].id);
        });
    }



    function drawNext(fig) {
        // debugger;
        let width = 5;
        let figure;
        let color;

        switch (fig) {
            case figT[0]:
                figure = [width, width + 1, width + 2, 1];
                color = colors.figT;
                break;
            case figI[0]:
                figure = [0, width, width * 2, width * 3];
                color = colors.figI;
                break;
            case figSqu[0]:
                figure = [0, 1, width, width + 1];
                color = colors.figSqu;
                break;
            case figZ[0]:
                figure = [0, 1, width + 1, width + 2];
                color = colors.figZ;
                break;
            case figForwZ[0]:
                figure = [1, 0, width, width - 1];
                color = colors.figForwZ;
                break;
            case figL[0]:
                figure = [1, width + 1, width * 2 + 1, 0];
                color = colors.figL;
                break;
            case figForwL[0]:
                figure = [1, width + 1, width * 2 + 1, 2];
                color = colors.figForwL;
                break;
        }
        // const nextView = [];
        const nextView = Array.from(document.getElementsByClassName('nextFig'));
        // nextView.innerHTML = "";
        figure.forEach(item => {
            nextView[1 + item].classList.add('nextFigure');
            // item.nextFigure.style.backgroundColor = color;
            // item.className('nextFigure').style.backgroundColor = color;

        },

        // const figDiv = document.getSelection,

        // figDiv.map(div =>{
        //     div.nextFigure.style.backgroundColor = color;
        // })
    );
    }

    draw();
    drawNext(nextFigure);



    intervalId = setInterval(() => { moveDown() }, 1000);
    if (intervalId === null) {

    }


    // document.addEventListener('keydown', (event) => {
    //     debugger;
    //     if (event === 'ArrowLeft') {
    //         moveLeft();
    //         return
    //     } else if (event === 'ArrowRight') {
    //         moveRight()
    //         return
    //     } else if (event === 'ArrowDown') {
    //         moveDown();
    //         return
    //     }
    // })


    document.addEventListener('keydown', (event) => {
        // debugger;
        switch (event.code) {
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowRight':
                moveRight();
                break;
            case 'ArrowDown':
                moveDown();
                break;
        }
    })







    // for (let i = 0; i < rowCount; i++) {
    //     const row = Array(colCount).fill(0, 0);
    //     board.push(row);
    // }
    // game.append(board);

})





function randomFigSelection() {
    const i = randomNumGen(7);

    return figures[i]

    /* switch (i) {
         case 0: figure = figT;
             break;
         case 1: figure = figI;
             break;
         case 2: figure = fig4;
             break;
         case 3: figure = figForw4;
             break;
         case 4: figure = fig7;
             break;
         case 5: figure = figForw7;
             break;
         case 6: figure = figSqu;
             break;
     }*/
}



function randomNumGen(max) {
    return Math.floor(Math.random() * max);
}


function move(step) {
    // debugger;

    const activeFigure = Array.from(document.getElementsByClassName('figure'));
    // const activeEl = Array.from(document.getElementById(activeId));  
    const nextActiveId = activeId.map(item => item + step);
    const nextActiveFigure = [];
    nextActiveId.forEach(item => nextActiveFigure.push(document.getElementById(`${item}`)));
    activeFigure.forEach(item => { item.classList.remove('figure'); item.setAttribute('value', 0) });
    nextActiveFigure.forEach(item => { item.classList.add('figure'); item.setAttribute('value', 1) });
    activeId.splice(0);
    nextActiveId.splice(0).forEach(item => activeId.push(item))
}

function moveDown() {
    //   debugger;
    if (
        activeId.some(item => Math.floor(item / colCount) === rowCount - 1) ||
        activeId.some(item => board[item + colCount].value === 2) ||
        activeId.some(item => board[item + 1].value === 2) ||
        activeId.some(item => board[item - 1].value === 2)
    ) {
        clearInterval(intervalId);
        intervalId = null;
        activeId.forEach(id => board[id].setAttribute('value', 2))
        // nextFig();
        activeId.splice(0);
        return
    }

    move(colCount);
}

function moveLeft() {
    move(-1);
}

function moveRight() {
    move(1);
}

function createFigures(width) {

}