
var aa = JSON.stringify({
    a: 1,
    b: 2
});
// console.log(typeof aa);


window.localStorage.setItem('follingData', aa);
var ll = window.localStorage.getItem('follingData');

console.log(ll);
