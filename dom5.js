const output = document.querySelector('div');
const myInput = document.querySelector('input');
const btn = document.querySelector('button');
btn.onclick = clickedMe;
let val = (true) ? 'true' : 'false';
val = (true && false) ? 'true' : 'false';
val = (10 > 5) ? 'true' : 'false';
val = (isNaN('test')) ? 'true' : 'false';

output.textContent = 'How old are you?';
btn.textContent = 'Entry Checker';

console.log(val);

function clickedMe(){
    const myAge = myInput.value;
    if(!isNaN(myAge)){
        console.log('ready');
        output.style.backgroundColor = 'white';
        output.style.color = 'black';
        output.textContent = 'Please enter  your Age?';
        const message = myAge >= 19 ? `${myAge} is allowed to enter.` : `${myAge} is not old enough!`;
        output.innerHTML += `<div>${message}</div>`;
        myInput.value = '';
    }else{
        myInput.value = '';
        output.style.backgroundColor = 'red';
        output.style.color = 'white';
        output.textContent = 'Please enter a number for your Age!';
    }
}