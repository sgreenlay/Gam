
///<reference path='../Engine/helpers.ts'/>

module Engine {

export class Point {
    constructor(public x : number, public y : number) {}

    Equals(other : Point) : boolean
    {
        return AreWithinEpsilon(other.x, this.x) && AreWithinEpsilon(other.y, this.y);
    }
}

export class Size {
    constructor(public width : number, public height : number) {}
}

export class Rect {
    constructor(public x : number, public y : number, public width : number, public height : number) {}

    Center() : Point {
        return new Point(this.x + this.width / 2, this.y + this.height / 2);
    }

    TopLeft() : Point {
        return new Point(this.x, this.y);
    }

    TopRight() : Point {
        return new Point(this.x + this.width, this.y);
    }

    BottomLeft() : Point {
        return new Point(this.x, this.y + this.height);
    }

    BottomRight() : Point {
        return new Point(this.x + this.width, this.y + this.height);
    }

    IsCorner(p : Point) : boolean {
        if ((AreWithinEpsilon(p.x, this.x) && 
                (AreWithinEpsilon(p.y, this.y) || 
                 AreWithinEpsilon(p.y, this.y + this.height))) ||
            (AreWithinEpsilon(p.x, this.x + this.width) && 
                (AreWithinEpsilon(p.y, this.y) || 
                 AreWithinEpsilon(p.y, this.y + this.height))))
        {
            return true;
        }
        return false;
    }

    Size() : Size {
        return new Size(this.width, this.height);
    }

    ApproximateLocation(point : Point) : number {
        var topLeft = this.TopLeft();
        var bottomRight = this.BottomRight();

        //
        // 1 | 2 | 3
        // ---------
        // 4 | 5 | 6
        // ---------
        // 7 | 8 | 9
        //

        if (point.y < topLeft.y)
        {
            if (point.x < topLeft.x)
            {
                return 1;
            }
            else if (point.x > bottomRight.x)
            {
                return 3;
            }
            else
            {
                return 2;
            }
        }
        else if (point.y > bottomRight.y)
        {
            if (point.x < topLeft.x)
            {
                return 7;
            }
            else if (point.x > bottomRight.x)
            {
                return 9;
            }
            else
            {
                return 8;
            }
        }
        else
        {
            if (point.x < topLeft.x)
            {
                return 4;
            }
            else if (point.x > bottomRight.x)
            {
                return 6;
            }
            else
            {
                return 5;
            }
        }
    }

    Intersection(vector : Vector) : Point {
        var approxLocation = this.ApproximateLocation(vector.Start());

        var edges = new Collection<LineSegment>();

        if ((approxLocation == 1) || (approxLocation == 2) || (approxLocation == 3) || (approxLocation == 5))
        {
            var topEdge = new LineSegment(this.TopLeft(), this.TopRight());
            edges.Add(topEdge);
        }

        if ((approxLocation == 1) || (approxLocation == 4) || (approxLocation == 5) || (approxLocation == 7))
        {
            var leftEdge = new LineSegment(this.TopLeft(), this.BottomLeft());
            edges.Add(leftEdge);
        }

        if ((approxLocation == 3) || (approxLocation == 5) || (approxLocation == 6) || (approxLocation == 9))
        {
            var rightEdge = new LineSegment(this.TopRight(), this.BottomRight());
            edges.Add(rightEdge);
        }

        if ((approxLocation == 5) || (approxLocation == 7) || (approxLocation == 8) || (approxLocation == 9))
        {
            var bottomEdge = new LineSegment(this.BottomLeft(), this.BottomRight());
            edges.Add(bottomEdge);
        }

        for (var i = 0; i < edges.Length(); ++i)
        {
            var edge = edges.Get(i);
            var intersection = edge.Intersection(vector);
            if (intersection)
            {
                return intersection;
            }
        }

        return null;
    }
}

export interface Vector
{
    Start() : Point;
    Length() : number;
    Direction() : Point;
    Dot(other : Vector) : number;
    AngleTo(other : Vector) : number;
    PerpendicularTo(other : Vector) : boolean;
    ParallelTo(other : Vector) : boolean;
    Intersection(other : Vector) : Point | null;
}

class VectorBase implements Vector {
    constructor(protected start : Point, protected end : Point) {}

    Start() : Point
    {
        return this.start;
    }

    Length() : number {
        var dx = this.end.x - this.start.x;
        var dy = this.end.y - this.start.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    Direction() : Point {
        var length = this.Length();

        var dx = (this.end.x - this.start.x) / length;
        var dy = (this.end.y - this.start.y) / length;

        return new Point(dx, dy);
    }

    Dot(other : Vector) : number {
        var selfDir = this.Direction();
        var otherDir = other.Direction();

        return selfDir.x * otherDir.x + selfDir.y * otherDir.y;
    }

    AngleTo(other : Vector) : number {
        return Math.atan2(other.Direction().y, other.Direction().x) - Math.atan2(this.Direction().y, this.Direction().x);
    }

    PerpendicularTo(other : Vector) : boolean {
        var angleTo = this.AngleTo(other);
        if (angleTo == 0 || angleTo == undefined)
        {
            return false;
        }
        else if ((angleTo / Math.PI) % 0.5 == 0)
        {
            return true;
        }
        return false;
    }

    ParallelTo(other : Vector) : boolean {
        var angleTo = this.AngleTo(other);
        if (angleTo == undefined)
        {
            return true;
        }
        else if (angleTo % Math.PI == 0)
        {
            return true;
        }
        return false;
    }

    Intersection(other : Vector) : Point | null {
        var as = this.Start();
        var bs = other.Start();

        var ad = this.Direction();
        var bd = other.Direction();

        var det = bd.x * ad.y - bd.y * ad.x

        if (det == 0)
        {
            return null;
        }

        var dx = bs.x - as.x
        var dy = bs.y - as.y

        var u = (dy * bd.x - dx * bd.y) / det;
        var v = (dy * ad.x - dx * ad.y) / det;

        if ((u < 0) || (v < 0))
        {
            return null;
        }

        var x = as.x + ad.x * u;
        var y = as.y + ad.y * u;

        return new Point(x, y);
    }
}

export class LineSegment extends VectorBase {
    Intersection(other : Vector) : Point | null {
        var intersection = super.Intersection(other);

        if (intersection)
        {
            var possibleVector = new VectorBase(this.start, intersection);
            if (possibleVector.Length() > this.Length())
            {
                return null;
            }

            if (other instanceof LineSegment)
            {
                var possibleVector = new VectorBase(other.start, intersection);
                if (possibleVector.Length() > other.Length())
                {
                    return null;
                }
            }
        }

        return intersection;
    }

    End() : Point
    {
        return this.end;
    }
}

export class DirectionVector extends VectorBase {
    static FromPoints(start : Point, end : Point) {
        return new DirectionVector(start, new Point(end.x - start.x, end.y - start.y));
    }
    
    constructor(start : Point, direction : Point) {
        super(start, new Point(start.x + direction.x, start.y + direction.y));
    }

    Intersection(other : Vector) : Point | null {
        var intersection = super.Intersection(other);

        if (intersection)
        {
            if (other instanceof LineSegment)
            {
                var possibleVector = new VectorBase(other.Start(), intersection);
                if (possibleVector.Length() > other.Length())
                {
                    return null;
                }
            }
        }

        return intersection;
    }
}

}