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


// -------------------------------   FIGURES -------------------------------------------------
const figT = [
    [colCount, colCount + 1, colCount + 2, 1],
    [0, colCount, colCount * 2, colCount + 1],
    [colCount, colCount + 1, colCount + 2, colCount * 2 + 1],
    [0, colCount, colCount * 2, colCount - 1],
];
/*

***
 *
 
*/



const figI = [
    [0, colCount, colCount * 2, colCount * 3],
    [colCount, colCount + 1, colCount + 2, colCount + 3],
    [0, colCount, colCount * 2, colCount * 3],
    [colCount, colCount + 1, colCount + 2, colCount + 3],
];
/*

****

*/

const figSqu = [
    [0, 1, colCount, colCount + 1],
    [0, 1, colCount, colCount + 1],
    [0, 1, colCount, colCount + 1],
    [0, 1, colCount, colCount + 1]
];
/*

* *
* *

*/

const figZ = [
    [0, 1, colCount + 1, colCount + 2],
    [1, colCount, colCount + 1, colCount * 2],
    [0, 1, colCount + 1, colCount + 2],
    [1, colCount, colCount + 1, colCount * 2],
];

/*

**
 **
    
*/


const figForwZ = [
    [1, 0, colCount, colCount - 1],
    [0, colCount, colCount + 1, colCount * 2 + 1],
    [1, 0, colCount, colCount - 1],
    [0, colCount, colCount + 1, colCount * 2 + 1],
];

/*

 **
**

  
*/

const figL = [
    [1, colCount + 1, colCount * 2 + 1, 0],
    [colCount, colCount + 1, colCount + 2, 2],
    [1, colCount + 1, colCount * 2 + 1, colCount * 2 + 2],
    [colCount, colCount + 1, colCount + 2, colCount * 2 + 2]
];

/*

* 
* 
* *
  
*/



const figForwL = [
    [1, colCount + 1, colCount * 2 + 1, 2],
    [colCount, colCount + 1, colCount + 2, colCount * 2 + 2],
    [1, colCount + 1, colCount * 2 + 1, colCount * 2],
    [colCount, colCount * 2, colCount * 2 + 1, colCount * 2 + 2]
];




const colors = {
    figT: 'red',
    figI: 'green',
    figSqu: 'yellow',
    fig4: 'blue',
    figForw4: 'purple',
    fig7: 'brown',
    figForw7: 'orange'
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
    gameBoard.style.width = colCount * 32 + "px";
    gameBoard.style.height = rowCount * 32 + "px";
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


    function draw() {
        // debugger;
        let currentFigure = figures[randomNumGen(7)][k];
        let nextFigure = figures[randomNumGen(7)][k];
        currentFigure.forEach(item => {
            board[curentPosition + item].classList.add('figure')
            board[curentPosition + item].setAttribute('value', 1)
            activeId.push(+board[curentPosition + item].id);
        });

        // const nextView = Array.from(document.getElementsByClassName('nextFig'));
        // nextFigure.forEach(item => {
        //     nextView[2 + item /(colCount / 5) ].classList.add('nextFigure')
        //     // nextView[curentPosition + item].setAttribute('value', 1)
        // });


    }

    draw();



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