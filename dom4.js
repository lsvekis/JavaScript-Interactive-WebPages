const output = document.querySelector('div');
const myInput = document.querySelector('input');
const btn = document.querySelector('button');
let a=val=b = 100;
//let val = 10 = a;

let c = a*b/100;
let d = 504 % 50;
a = a +1;
a++;
a--;
console.log(a);
console.log(d);
let e =10;
e *= a;
console.log(e);
console.clear();
console.log('5' == 5);
console.log('5' === 5);
console.log('5' != 6);
console.log('5' !== 5);
console.log( 10 <= 10);
console.log(('5' == 5) && true);
console.log(('5' == 5) && false);
console.log(('5' != 5) || true);
console.log(('5' == 5) || false);

btn.onclick = ()=>{
    let val = Number(myInput.value);
    console.log(typeof(val));
    console.log(isNaN(val));
    let html = `<div>Results ${val}</div>`;
    if(!isNaN(val)){
        html += `<div>Was a number</div>`;
    }else{
        html += `<div>NOT a number</div>`;
    }
    if(val % 2){
        html += `<div>Odd number</div>`;
    }else{
        html += `<div>Even number</div>`;
    }
    html += `<div>${val * 50} = ${val} X 50</div>`;
    html += `<div>${val / 10} = ${val} / 10</div>`;
    html += `<div>${val * val} = ${val} X ${val}</div>`;
    output.innerHTML = html;
}