const ele = document.body.children[0];
console.dir(ele);
let val = 'Laurence Svekis';
document.body.children[0].textContent = val;
ele.textContent = 'UPDATED';

console.log(ele.className);
console.log(ele.innerHTML);

ele.innerHTML += '<h1>Hello</h1>';

