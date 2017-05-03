module Engine {

export class Collection<T> {
    elements : Array<T>

    constructor() {
        this.elements = new Array<T>();
    }

    forEach(handler : (value : T) => void) {
        this.elements.forEach((value : T) => {
            handler(value);
        });
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

export class Map<T> {
    elements : Object;

    constructor() {
        this.elements = new Object();
    }

    forEach(handler : (key : string, value : T) => void) {
        Object.keys(this.elements).forEach((key : string) => {
            handler(key, this.elements[key]);
        });
    }

    Exists(key : string) : boolean {
        return typeof(this.elements[key]) != 'undefined';
    }

    Get(key : string) : T {
        if (!this.Exists(key)) {
            return null;
        }
        return this.elements[key];
    }

    Add(key : string, value : T) {
        this.elements[key] = value;
    }

    Remove(key : string) {
        delete this.elements[key];
    }
}

}