const main = document.querySelector('.game');
//main.innerHTML = `&spades; &hearts; &diams; &clubs; `;
const gameArea = maker(main, 'div', 'gameArea', '');
const mes = maker(main, 'div', 'mes', 'Click to play');
const btn = maker(main, 'button', 'btn', 'Next Round');
const game = {
    players: 3,
    cards: [],
    view: [],
    s: []
};
//const cardData = {suits:['spades','hearts','diams','clubs'],val:['A','2','3','4','5','6','7','8','9','10','J','Q','K']} 
const cardData = {
    suits: ['spades', 'hearts', 'diams', 'clubs'],
    val: ['1', '2', '3']
}
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
            game.view[i].innerHTML = 'X';
            game.s[i].innerHTML = 'OUT';
            ele.style.backgroundColor = '#bbb';
        }
    }
    mes.innerHTML = 'Battle has begun....';
    gamer(temp, []);
});
function gamer(inPlay, holder) {
    const vals = [];
    inPlay.forEach((i) => {
        const ele = game.view[i];
        if (game.cards[i].length > 0) {
            const first = game.cards[i].shift();
            showCard(first, ele);
            vals.push(first.cardValue);
            holder.push(first);
            game.s[i].lastChild.innerHTML += `${first.cardNum}${first.icon} `;
        }
    })
    const winners = [];
    let high = Math.max(...vals);
    console.log(high);
    vals.forEach((e, i) => {
        if (e >= high)  winners.push(i);
    })

    if (winners.length > 1) {
        mes.innerHTML += `Tie:${winners}... `;
        return gamer(winners, holder);
    } else if (winners.length == 0) {
        mes.innerHTML += `No winner`;
    } else {
        const temp = winners[0];
        game.cards[temp].push(...holder);
        mes.innerHTML += `Winner is Player ${winners[0]+1}! `;
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
            el.parentNode.style.opacity = 0.5;
        }
    })
    if (tempPlay.length <= 1) {
        mes.innerHTML = `Game Over! Player ${tempPlay[0]+1} Wins.`;
        btn.disabled = true;
    }
}
function showCard(first, ele) {
    ele.innerHTML = `<div>${first.cardNum}${first.icon}</div>`;
    ele.style.color = first.clr;
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
        const cardLeft = maker(score, 'div', 'box', ``);
        const cardPlayed = maker(score, 'div', 'box', ``);
        game.s.push(score);
        start = end;
        end = end + num;
    }
    updateScores();
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