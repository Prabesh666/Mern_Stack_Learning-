import square, { cube, areaOfCircle } from "./calculate.js";

const number = 80;
const squaredNumber = square(number);
const cubeNumber = cube(number);
const area = areaOfCircle(number);
console.log(squaredNumber);
console.log(cubeNumber);
console.log(area);