const ele1 = document.querySelector('div');
const ele2 = document.querySelector('#one');
const ele3 = document.querySelector('.red');
ele1.textContent = 'Laurence Svekis';

const eles = document.querySelectorAll('div');
console.log(ele1);
console.log(ele2);
console.log(ele3);
console.dir(eles);

eles[0].textContent = 'Hello World';
console.log(ele1.textContent);


const myInput = document.querySelector('input');
console.log(myInput.value);
myInput.value = 'Laurence';

eles[1].textContent = 'Click Me';
eles[1].style.border = '1px solid black';
eles[1].style.width = '200px';
eles[1].style.textAlign = 'center';
eles[1].onclick = clicker;

function clicker(){
    let temp = myInput.value; 
    ele2.textContent = temp;
    myInput.value = '';
}


