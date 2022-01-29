const main = document.querySelector('.game');
//main.innerHTML = `&spades; &hearts; &diams; &clubs; `;
const gameArea = maker(main, 'div', 'gameArea', '');
const btn = maker(main, 'button', 'btn', 'Next Round');
const mes = maker(main, 'div', 'mes', 'Click to Play');
const game = {
    players: 9,
    cards: [],
    view: [],
    s: []
};
const cardData = {suits:['spades','hearts','diams','clubs'],val:['A','2','3','4','5','6','7','8','9','10','J','Q','K']}  
/*const cardData = {
    suits: ['spades', 'hearts', 'diams', 'clubs'],
    val: ['A', '2', '3', '4', '5']
}
*/
const deck = [];
buildDeck();
addPlayers();
btn.addEventListener('click', (e) => {
    const temp = [];
    for (let i = 0; i < game.players; i++) {
        game.s[i].lastChild.innerHTML = '';
        if (game.cards[i].length > 0) {
            temp.push(i);
        } else {
            const ele = game.view[i];
            ele.innerHTML = 'X';
            game.s[i].firstChild.innerHTML = 'OUT';
            ele.style.backgroundColor = '#bbb';
        }
    }
    mes.innerHTML = 'Battle has begun...';
    gamer(temp, []);
})


console.clear();
const arr = [1,2,4,5];
console.log(Math.max(1,2,4,5));
console.log(Math.max(...arr));
console.log(Math.max(arr));

function a(...vals){
    console.log(vals);
};
a(...arr);
function b(vals){
    console.log(vals);
};
b(...arr);





function gamer(inPlay, holder) {
    const vals = [];
    console.log(inPlay);
    inPlay.forEach((i) => {
        if (game.cards[i].length > 0) {
            const ele = game.view[i];
            const first = game.cards[i].shift();
            showCard(first, ele);
            vals.push(first.cardValue);
            holder.push(first);
            game.s[i].lastChild.innerHTML += `${first.cardNum}${first.icon} `;
        }
    })
    const winners = [];
    const highValue = Math.max(...vals);
    console.log(highValue);
    vals.forEach((e, i) => {
        if (e >= highValue) winners.push(inPlay[i]);
    })
    console.log(winners);
    if (winners.length > 1) {
        mes.innerHTML += `Tie:`;
        winners.forEach(v => {
            mes.innerHTML += `P${v+1} `;
        })
        mes.innerHTML += `...`;
        return gamer(winners, holder);
    } else if (winners.length == 0) {
        mes.innerHTML += 'No winner';
    } else {
        const temp = winners[0];
        game.cards[temp].push(...holder);
        mes.innerHTML += `Winner is Player ${temp+1}!`;
    }
    updateScores();
}
function updateScores() {
    let tempPlay = [];
    game.s.forEach((el, i) => {
        const cardCount = game.cards[i].length;
        if (cardCount) {
            el.firstChild.innerHTML = `${cardCount} left`;
            tempPlay.push(i);
        } else {
            el.parentNode.style.opacity = 0.4;
        }
    })
    if (tempPlay.length <= 1) {
        mes.innerHTML = `Game Over! Player ${tempPlay[0]+1} Wins`;
        btn.disabled = true;
        btn.textContent = 'GAME OVER';
    }
}
function showCard(cc, ele) {
    ele.innerHTML = `<div>${cc.cardNum}${cc.icon}</div>`;
    ele.style.color = cc.clr;
}
function addPlayers() {
    let start = 0;
    let num = Math.floor(deck.length / game.players);
    let end = start + num;
    for (let i = 0; i < game.players; i++) {
        const el = maker(gameArea, 'div', 'player', ``);
        const ele = maker(el, 'div', 'info', `${i+1} Player`);
        const card = maker(el, 'div', 'card', ``);
        game.view.push(card);
        game.cards[i] = deck.slice(start, end);
        const score = maker(el, 'div', 'score', ``);
        const cardLeft = maker(score, 'div', 'box', `${game.cards[i].length} left`);
        const cardPlayed = maker(score, 'div', 'box', '');
        game.s.push(score);
        start = end;
        end = end + num;
    }
    console.log(game.cards);
}
function buildDeck() {
    cardData.suits.forEach((suit) => {
        cardData.val.forEach((v, ind) => {
            const bgC = (suit == 'hearts') || (suit == 'diams') ? 'red' : 'black';
            const card = {
                suit: suit,
                icon: `&${suit};`,
                clr: bgC,
                cardNum: v,
                cardValue: ind + 1
            }
            deck.push(card);
        })
    })
    deck.sort(() => {
        return Math.random() - 0.5;
    })
}
function maker(par, eleType, cla, html) {
    const ele = document.createElement(eleType);
    ele.classList.add(cla);
    ele.innerHTML = html;
    return par.appendChild(ele);
}