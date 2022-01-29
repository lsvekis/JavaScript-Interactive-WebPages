const main = document.querySelector('.game');
const message = maker('div', document.body, 'Press any square to start', 'message');
const grid = {
    x: 4,
    y: 3
};
const arr = ['red', 'blue', 'purple', 'green', 'yellow', 'pink', 'orange'];
const game = {
    score: 0,
    total: 0,
    game: [],
    flip: [],
    timer: {},
    pause: false
};
let total = grid.x * grid.y;
total = arr.length * 2 < total ? arr.length * 2 : total;
game.total = total / 2;
document.addEventListener('DOMContentLoaded', makeGrid);
function makeGrid() {
    for (let i = 0; i < total; i++) {
        //const html = `${i+1}`;
        const el = maker('div', main, '', 'box');
        el.onclick = flipBox;
    }
    main.style.setProperty(`grid-template-columns`, `repeat(${grid.y},1fr)`);
    addBoxes();
}
function toggleFlip(parent, boo) {
    const bEle = parent.querySelector('.back');
    const fEle = parent.querySelector('.front');
    if (boo) {
        bEle.style.display = 'none';
        fEle.style.display = 'block';
    } else {
        bEle.style.display = 'block';
        fEle.style.display = 'none';
    }
    //console.log(parent);
}
function checkCards() {
    game.pause = true;
    let match = null;
    let found = false;
    game.flip.forEach((ele) => {
        if (ele.val == match) {
            console.log('match found');
            found = true;
        } else {
            match = ele.val;
        }
        console.log(ele.val);
    })
    if (!found) {
        game.timer = setTimeout(flipback, 500);
    } else {
        game.score++;
        game.flip.forEach((ele) => {
            ele.found = true;
        })
        game.pause = false;
        game.flip.length = 0;
        if (game.score >= game.total) {
            message.textContent = 'Game Over';
        }
    }
}
function flipback() {
    game.flip.forEach((ele) => {
        toggleFlip(ele, false);
        ele.classList.remove('active');
    })
    game.pause = false;
    game.flip.length = 0;
}
function flipBox(e) {
    const parent = e.target.parentNode;
    const tempv = parent.classList.contains('active');
    console.log(tempv);
    if (!game.pause && !tempv) {
        console.log(parent.found);
        if (parent.found) {
            message.textContent = 'Already Found';
        } else {
            parent.classList.add('active');
            if (game.flip.length >= 2) {
                toggleFlip(parent, false);
            } else {
                toggleFlip(parent, true);
            }
            game.flip.push(parent);
            message.textContent = `Cards Flipped : ${game.flip.length}`;
            if (game.flip.length >= 2) {
                checkCards();
            }
        }
    } else {
        message.textContent = `Can't Click Right now`;
    }
}
function addBoxes() {
    let gameItems = total / 2;
    const temp = [];
    arr.sort(() => {
        return Math.random() - 0.5;
    })
    for (let i = 0; i < gameItems; i++) {
        temp.push(arr[i]);
    }
    game.game = temp.concat(temp);
    game.game.sort(() => {
        return Math.random() - 0.5;
    })
    const boxes = main.querySelectorAll('.box');
    boxes.forEach((ele, ind) => {
        ele.val = game.game[ind];
        ele.found = false;
        const front = maker('div', ele, game.game[ind], 'front');
        front.style.backgroundColor = game.game[ind];
        front.style.display = 'none';
        const back = maker('div', ele, ind + 1, 'back');
        back.style.display = 'block';
    })
    //console.log(game);
}
function maker(eleType, parent, html, cla) {
    const ele = document.createElement('div');
    ele.classList.add(cla);
    ele.innerHTML = html;
    return parent.appendChild(ele);
}