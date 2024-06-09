const rowEl = document.getElementById('row');
const columnEl = document.getElementById('column');
const startBtn = document.getElementById('start');
const gameField = document.getElementById('gameField');
const score = document.getElementById('score');
let scoreCount = 0;
let activeId = [];
let intervalId = null;
let figur;
let board = [];
const taken = [];
let i = 0;


// gameField.append(board);
const rowCount = +rowEl.value;
const colCount = +columnEl.value;
const sellCount = rowCount * colCount;
let width = colCount;
let currentFigure;
let nextFigure;
let currentRotation = 0;

// Deffinding Right and Left vertical borders

// let borderLeft;
// let borderRight;

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
    [width, width + 1, width + 2, width * 2]
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

/*

  *
  * 
* *
  
*/


const colors = {
    figT: 'red',
    figI: 'green',
    figSqu: 'yellow',
    figZ: 'blue',
    figForwZ: 'purple',
    figL: 'brown',
    figForwL: 'orange'
}




const figures = [figT, figI, figSqu, figZ, figForwZ, figL, figForwL];

// ------------------------------------------------------ End of FIGURES ---------------------------------------------------------



startBtn.addEventListener('click', () => {
    // debugger;
    scoreCount = 0;
    score.innerText = scoreCount;
    gameField.innerHTML = "";
    const gameBoard = document.createElement('div')
    /*
    board = Array.from(document.createElement('div'));
    board.id = "game"
    board.innerHTML = "";
    board.style.width = colCount * 22 + "px";
    board.style.height = rowCount * 22 + "px";
    */
    gameBoard.id = "game"
    gameBoard.innerHTML = "";
    gameBoard.style.width = colCount * 22 + "px";
    gameBoard.style.height = rowCount * 22 + "px";
    // board = Array.from(gameBoard);
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
    // gameBoard.append(board);


    let curentPosition = 4;
    let index = randomNumGen(7);
    currentFigure = figures[index];
    let nameForClass = randomFigSelection(index);
    nextFigure = figures[randomNumGen(7)];

    // Drawing the figure
    function draw() {
        // debugger;

        currentFigure[currentRotation].forEach(item => {
            board[curentPosition + item].classList.add('figure', `${nameForClass}`);
            board[curentPosition + item].setAttribute('value', 1);
            activeId.push(+board[curentPosition + item].id);
            // className.
        });

        // activeId.forEach(div => div.style.className(nameForClass).backgroundColor = colors[nameForClass]);
        // activeId.forEach(div => div.style.nameForClass.backgroundColor = colors[nameForClass]);
        // item.nextFigure.style.backgroundColor = color;
        // item.className('nextFigure').style.backgroundColor = color;


    }


    //  Undrawing the figure 
    function undraw() {
        // debugger;

        currentFigure[currentRotation].forEach(item => {
            board[curentPosition + item].classList.remove('figure', `${nameForClass}`);
            board[curentPosition + item].setAttribute('value', 0);
            activeId.splice(0);

        });
    }

    // ---------------------------------------------------------------------------------------



    // creating function for checking if the row is fillid


    function lineIsCompleted() {
        // debugger;
        for (let i = 0; i < rowCount; i++) {
            const divs = [];
            for (let j = 0; j < colCount; j++) {
                board.forEach(div => {
                    if (div.getAttribute("y") == i && div.getAttribute("x") == j) {
                        divs.push(div)
                    }
                })
            }
            if (divs.every(div => div.getAttribute("value") == 2)) {
                // debugger;
                scoreCount++;
                score.innerText = scoreCount;
                // const removed = board.splice(+divs[0].id)
                divs.map(div => {
                    // debugger;
                    div.setAttribute("value", 0);
                    const list = div.classList.value;
                    const classnames = list.split(' ').splice(1);
                    classnames.map(classname => div.classList.remove(classname));

                })

                // const removed =  board.splice(i*colCount, colCount);
                // board = removed.concat(board);   

                const taken = Array.from(document.getElementsByClassName('taken'));
                taken.map(div => {
                    if (div.getAttribute("value") !== 2) {
                        debugger;
                        undraw();
                        div.classList.value;
                        const classnames = list.split(' ').splice(1);
                        classnames.map(classname => div.classList.remove(classname));
                        const id = +div.id + colCount;
                        const newLineDiv = document.getElementById(`${id}`);
                        classnames.map(classname => newLineDiv.classList.add(classname));
                        newLineDiv.setAttribute("value", 2);
                        draw();
                    }

                })

            }
        }





    }


    // ---------------------------------------------------------------------------------------

    //Creating functions for moving by directions

    // declaring moving function


    function move(step) {

        undraw();
        curentPosition += step;
        draw();

        // debugger;
        lineIsCompleted();


        // const activeFigure = Array.from(document.getElementsByClassName('figure'));    
        // const nextActiveId = activeId.map(id => id + step);
        // const nextActiveFigure = [];
        // nextActiveId.forEach(item => nextActiveFigure.push(document.getElementById(`${item}`)));
        // activeFigure.forEach(item => { item.classList.remove('figure'); item.setAttribute('value', 0) });
        // nextActiveFigure.forEach(item => { item.classList.add('figure'); item.setAttribute('value', 1) });
        // activeId.splice(0);
        // nextActiveId.splice(0).forEach(item => activeId.push(item))
    }

    // moveing down

    function moveDown() {
        //   debugger;
        if (
            activeId.some(item => Math.floor(item / colCount) === rowCount - 1) ||
            activeId.some(item => board[item + colCount].getAttribute("value") === "2")
        ) {
            // debugger;
            clearInterval(intervalId);
            intervalId = null;

            activeId.forEach(id => {
                board[id].setAttribute('value', 2);
                board[id].classList.add('taken');
                board[id].classList.remove('figure');
                taken.push(board[id]);
            })

            activeId.splice(0);
            curentPosition = 4
            currentRotation = 0;
            currentFigure = nextFigure;
            index = randomNumGen(7);
            nextFigure = figures[index];
            nameForClass = randomFigSelection(index);
            draw();
            drawNext(nextFigure[0]);
            intervalId = setInterval(() => { moveDown() }, 1000);
            return
        }

        let isFilled = false;
        for (let i = 0; i < colCount; i++) {
            if (board[i].classList.contains('taken')) {
                isFilled = true;
                break;
            }
        }

        if (isFilled) {
            // debugger;
            clearInterval(intervalId);
            intervalId = null;
            alert("Game Over");
            return
        }

        move(colCount);
    }

    //Moving left

    function moveLeft() {
        // debugger;
        const borderLeft = activeId.some(part => {
            // debugger;
            if (part % colCount === 0) {
                return true
            }
        });

        if (activeId.some(item => board[item - 1].getAttribute("value") === "2")) {
            return
        }


        if (!borderLeft) {
            // debugger;
            move(-1);
        }

    }


    //Moving right

    function moveRight() {
        // debugger;

        const borderRight = activeId.some(part => {
            // debugger;        
            if (part % colCount === colCount - 1) {
                return true
            }
        });

        if (activeId.some(item => board[item + 1].getAttribute("value") === "2")) {
            return
        }


        if (!borderRight) {
            // debugger;
            move(1);
        }

    }





    function figureRotation() {
        undraw();

        if (currentRotation === currentFigure.length - 1) {
            currentRotation = 0;
        } else {
            currentRotation++;
        };

        currentFigure[currentRotation];
        draw();
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
        nextView.innerHTML = "";
        nextView.forEach(item => {
            item.classList.remove('nextFigure')
        });
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

    // drawing and moving the figure
    draw();
    drawNext(nextFigure[0]);

    intervalId = setInterval(() => { moveDown() }, 1000);



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
            case 'ArrowUp':
                figureRotation();
                break;
        }
    })

})





function randomFigSelection(num) {

    let figure;

    // const i = randomNumGen(7);
    // return figures[i]

    switch (num) {
        case 0: figure = 'figT';
            break;
        case 1: figure = 'figI';
            break;
        case 2: figure = 'figSqu';
            break;
        case 3: figure = 'figZ';
            break;
        case 4: figure = 'figForwZ';
            break;
        case 5: figure = 'figL';
            break;
        case 6: figure = 'figForwL';
            break;
    }

    return figure;
}



function randomNumGen(max) {
    return Math.floor(Math.random() * max);
}














// function rule(){

//     return {
//         activeId.some(item => Math.floor(item / colCount) === rowCount - 1) ||
//         activeId.some(item => board[item + colCount].value === 2) ||5
//         /*activeId.some(item => board[item + 1].value === 2) ||
//         activeId.some(item => board[item - 1].value === 2)*/
//     }
// }
