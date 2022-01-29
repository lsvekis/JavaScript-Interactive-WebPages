const main = document.querySelector('.game');
const vals = ['💔', '😍'];
const game = {
    players: [0, 0],
    total: 0
};
const scoreDiv = maker('div', main, 'score', 'Score');
const gameArea = maker('div', main, 'gameArea', '');
const player1 = maker('div', gameArea, 'gamer', 'Coin 1');
const player2 = maker('div', gameArea, 'gamer', 'Coin 2');
const coin1 = maker('div', player1, 'coin', '💔');
const coin2 = maker('div', player2, 'coin', '💔');
coin1.val = 1;
coin2.val = 1;
const coins = [coin1, coin2];
const dashboard = maker('div', main, 'dash', '');
const btn = maker('button', dashboard, 'btn', 'Flip Coin');
const btn1 = maker('button', player1, 'btn', `Heads ${vals[1]}`);
btn1.val = 1;
const btn2 = maker('button', player2, 'btn', `Heads ${vals[1]}`);
btn2.val = 1;
const btns = [btn1, btn2];
btn1.style.backgroundColor = 'white';
btn1.style.color = 'black';
btn2.style.backgroundColor = 'white';
btn2.style.color = 'black';
btn1.onclick = flipSelection;
btn2.onclick = flipSelection;
btn.onclick = (e) => {
    btn.disabled = true;
    coins.forEach(ele => {
        ele.style.backgroundColor = 'black';
        ele.textContent = ' ';
    })
    setTimeout(flipper, 500);
}




function flipSelection(e) {
    const ele = e.target;
    console.log(ele.val);
    if (ele.val == 1) {
        ele.innerHTML = `Tails ${vals[0]}`;
        ele.style.backgroundColor = 'black';
        ele.style.color = 'white';
        ele.val = 0;
    } else {
        ele.innerHTML = `Heads ${vals[1]}`;
        ele.style.backgroundColor = 'white';
        ele.style.color = 'black';
        ele.val = 1;
    }
}

function maker(t, p, c, h) {
    const el = document.createElement(t);
    el.classList.add(c);
    el.innerHTML = h;
    return p.appendChild(el);
}
/*
for(let i=0;i<100;i++){
    const boo = Math.floor(Math.random() + 0.5);
    console.log(boo);
}
*/
function flipper() {
    //check for match
    game.total++;
    coins.forEach((ele, ind) => {
        const boo = Math.floor(Math.random() + 0.5);
        ele.innerHTML = vals[boo];
        console.log(btns[ind].val);
        console.log(ele.val);
        ele.val = boo;
        ele.style.backgroundColor = 'gold';
        btn.disabled = false;
        checker(ele.val, btns[ind].val, ind);
    })
}

function checker(coinVal, btnVal, ind) {
    if (btnVal == coinVal) {
        console.log(`${ind} was correct`);
        game.players[ind]++;
    } else {
        console.log(`${ind} was wrong`);
    }
    scoreDiv.innerHTML = `${game.players[0]} vs ${game.players[1]} in total ${game.total} `;
}