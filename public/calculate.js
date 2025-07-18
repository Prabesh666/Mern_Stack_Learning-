function square(value) {
    const result = value * value;

    return result;
}

function cube(value) {
    const result = value * value * value;

    return result;
}

function areaOfCircle(r) {
    const area = 3.14 * r * r;
    return area;
}
export { cube, areaOfCircle };
export default square;