module Engine {

export function Round(value : number, decimals : number) {
    var n : string = value + 'e' + decimals;
    return Number(Math.round(+n) + 'e-' + decimals);
}

var epsilon = 0.001;

export function AreWithin(a : number, b : number, e : number) {
    return Math.abs(a - b) <= e;
}

export function AreWithinEpsilon(a : number, b : number) {
    return AreWithin(a, b, epsilon);
}

export function IsWithin(n : number, e : number) {
    return Math.abs(n) <= e;
}

export function IsWithinEpsilon(n : number) {
    return IsWithin(n, epsilon);
}

}