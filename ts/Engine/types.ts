module Engine {

export class Point {
    constructor(public x : number, public y : number) {}
}

export class Size {
    constructor(public width : number, public height : number) {}
}

export class Rect {
    constructor(public x : number, public y : number, public width : number, public height : number) {}
}

}