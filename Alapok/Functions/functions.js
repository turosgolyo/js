const sum = (number1, number2) => number1 + number2;

const multiply = (number1, number2)  => number1 * number2;

const subtraction = (number1, number2) => number1 - number2;

const division = (number1, number2) => number1 / number2;


const muvelet = (a, b, fgv) => fgv(a, b);
// a fuggvenyek ARROW fuggvenyek

// console.log(sum(9, 2));
// console.log(multiply(9, 2));
// console.log(subtraction(9, 2));
// console.log(division(9, 2));

console.log(muvelet(3, 2, sum));
//az osszeadas fuggveny a callback fuggveny