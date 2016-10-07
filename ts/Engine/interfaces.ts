
module Engine {

export interface Visual {
    Render(
        context : CanvasRenderingContext2D,
        x : number,
        y : number,
        width : number,
        height : number);
}

}
