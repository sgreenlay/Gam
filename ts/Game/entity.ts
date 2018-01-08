
///<reference path='../Engine/Components/Graphics/visual.ts'/>
///<reference path='../Engine/Components/Physics/body.ts'/>

module Game {

export class Entity {
    public body : Engine.Components.Physics.Body;
    public visual : Engine.Components.Graphics.SimpleVisual;

    constructor(bounds : Engine.Rect, color : string) {
        this.body = new Engine.Components.Physics.Body(bounds);
        this.visual = new Engine.Components.Graphics.SimpleVisual(
            this.body.bounds,
            color
        );
    }
}

}
