const output = document.querySelector('div');
const myInput = document.querySelector('input');
const btn = document.querySelector('button');
let lowValue = 1;
let highValue = 10;
let hiddenNumber = 0;
output.innerHTML = '';
starter();
function starter(){
    myInput.value = '';
    lowValue = getRan(0,5);
    highValue = getRan(lowValue +1,50);
    hiddenNumber = getRan(lowValue,highValue);
    output.innerHTML += `<div>Guess a number between ${lowValue} and ${highValue}</div>`;
    btn.onclick = clickedMe;
    myInput.setAttribute('type','number');
    myInput.setAttribute('min',lowValue);
    myInput.setAttribute('max',highValue);
    btn.textContent = 'Enter Guess';
}
function clickedMe(){
    
    const valInput = myInput.value;
    if(valInput == hiddenNumber){
        console.log('correct');
        output.innerHTML = `<div>Correct it was ${ hiddenNumber}</div>`;
        starter();
    }else{
        //let message = (valInput < hiddenNumber) ? 'Go Higher!' : 'Go Lower';
        let message ;
        if(valInput < hiddenNumber){
            message = `${valInput} was wrong Go Higher!`;
            lowValue = valInput;
        }else{
            message = `${valInput} was wrong Go Lower!`;
            highValue = valInput;
        }
        output.innerHTML = `<div>${message}</div>`;
        console.log(hiddenNumber);
        myInput.value = '';
        output.innerHTML += `<div>Guess Again between ${lowValue} and ${highValue}!</div>`;
    }
   //let temp = Math.random()*10+1;

   //console.log(temp);
   //temp = Math.floor(temp);
   //output.textContent += `${temp}, `;
}

function getRan(min,max){
    return Math.floor(Math.random() * (max-min+1) + min);
}