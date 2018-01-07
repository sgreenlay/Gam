
///<reference path='../Engine/Components/Graphics/visual.ts'/>

module Game {

export class Entity {
    public visual : Engine.Components.Graphics.SimpleVisual;

    constructor(bounds : Engine.Rect, color : string) {
        this.visual = new Engine.Components.Graphics.SimpleVisual(
            bounds,
            color
        );
    }
}

}
