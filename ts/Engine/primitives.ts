module Engine {

export class Collection<T> {
    elements : Array<T>

    constructor() {
        this.elements = new Array<T>();
    }

    Add(element : T) {
        this.elements.push(element);
    }

    Remove(element : T) {
        var idx = this.elements.indexOf(element);
        if (idx > 0) {
            this.elements.splice(idx);
        }
    }
}

}