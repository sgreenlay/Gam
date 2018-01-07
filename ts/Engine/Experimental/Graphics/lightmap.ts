
///<reference path='../../Components/Physics/body.ts'/>
///<reference path='../../helpers.ts'/>

module Engine.Experimental.Graphics {

export class Lightmap implements Engine.Components.Graphics.Visual {

    sources : Engine.Collection<Engine.Components.Graphics.Visual>;
    solids : Engine.Collection<Engine.Components.Graphics.Visual>;

    public Debug = true;

    constructor(public bounds : Engine.Rect) {
        this.sources = new Engine.Collection<Engine.Components.Graphics.Visual>();
        this.solids = new Engine.Collection<Engine.Components.Graphics.Visual>();
    }

    AddSource(source : Engine.Components.Graphics.Visual)
    {
        this.sources.Add(source);
    }

    AddSolid(solid : Engine.Components.Graphics.Visual)
    {
        this.solids.Add(solid);
    }

    Render(context : CanvasRenderingContext2D) {
        this.sources.forEach((source : Engine.Components.Graphics.Visual) => {
            var sourceCenter = source.bounds.Center();

            var points = new Engine.Collection<Engine.Point | Engine.LineSegment>();

            points.Add(this.bounds.TopLeft());
            points.Add(this.bounds.TopRight());
            points.Add(this.bounds.BottomLeft());
            points.Add(this.bounds.BottomRight());

            this.solids.forEach((solid : Engine.Components.Graphics.Visual) => {
                var approxLocation = solid.bounds.ApproximateLocation(sourceCenter);

                if ((approxLocation == 1) || (approxLocation == 5))
                {
                    points.Add(solid.bounds.TopLeft());
                }
                else if ((approxLocation == 2) || (approxLocation == 3) || (approxLocation == 4) || (approxLocation == 7))
                {
                    var direction = Engine.DirectionVector.FromPoints(sourceCenter, solid.bounds.TopLeft());
                    var intersection = this.bounds.Intersection(direction);
                    points.Add(new Engine.LineSegment(solid.bounds.TopLeft(), intersection));
                }

                if ((approxLocation == 3) || (approxLocation == 5))
                {
                    points.Add(solid.bounds.TopRight());
                }
                else if ((approxLocation == 1) || (approxLocation == 2) || (approxLocation == 6) || (approxLocation == 9))
                {
                    var direction = Engine.DirectionVector.FromPoints(sourceCenter, solid.bounds.TopRight());
                    var intersection = this.bounds.Intersection(direction);
                    points.Add(new Engine.LineSegment(solid.bounds.TopRight(), intersection));
                }

                if ((approxLocation == 5) || (approxLocation == 7))
                {
                    points.Add(solid.bounds.BottomLeft());
                }
                else if ((approxLocation == 1) || (approxLocation == 4) || (approxLocation == 8) || (approxLocation == 9))
                {
                    var direction = Engine.DirectionVector.FromPoints(sourceCenter, solid.bounds.BottomLeft());
                    var intersection = this.bounds.Intersection(direction);
                    points.Add(new Engine.LineSegment(solid.bounds.BottomLeft(), intersection));
                }

                if ((approxLocation == 5) || (approxLocation == 9))
                {
                    points.Add(solid.bounds.BottomRight());
                }
                else if ((approxLocation == 3) || (approxLocation == 6) || (approxLocation == 7) || (approxLocation == 8))
                {
                    var direction = Engine.DirectionVector.FromPoints(sourceCenter, solid.bounds.BottomRight());
                    var intersection = this.bounds.Intersection(direction);
                    points.Add(new Engine.LineSegment(solid.bounds.BottomRight(), intersection));
                }
            });

            points.Filter((element) : boolean => {
                var shortest : Engine.LineSegment;
                if (element instanceof Engine.Point)
                {
                    shortest = new Engine.LineSegment(sourceCenter, element);
                }
                else if (element instanceof Engine.LineSegment)
                {
                    shortest = new Engine.LineSegment(sourceCenter, element.Start());
                }

                for (var i = 0; i < this.solids.Length(); ++i)
                {
                    var solid = this.solids.Get(i);
                    var intersection = solid.bounds.Intersection(shortest);

                    if (intersection != null)
                    {
                        var segment = new Engine.LineSegment(sourceCenter, intersection);

                        var segmentLength = segment.Length();
                        var shortestLength = shortest.Length();

                        if ((segmentLength < shortestLength) && !Engine.AreWithinEpsilon(segmentLength, shortestLength))
                        {
                            return false;
                        }
                    }
                }

                return true;
            });

            points.Transform((element : Engine.Point | Engine.LineSegment) => {
                if (element instanceof Engine.Point)
                {
                    return element;
                }

                var shortest : Engine.LineSegment;
                var nextShortest : Engine.LineSegment;

                if (element instanceof Engine.LineSegment)
                {
                    shortest = new Engine.LineSegment(sourceCenter, element.Start());
                    nextShortest = new Engine.LineSegment(sourceCenter, element.End());
                }

                for (var i = 0; i < this.solids.Length(); ++i)
                {
                    var solid = this.solids.Get(i);
                    var intersection = solid.bounds.Intersection(nextShortest);
                    if (intersection)
                    {
                        var segment = new Engine.LineSegment(sourceCenter, intersection);
                        var skip = false;

                        if (solid.bounds.IsCorner(intersection))
                        {
                            var topEdge = new Engine.LineSegment(
                                solid.bounds.TopLeft(),
                                solid.bounds.TopRight());
                            
                            if (segment.ParallelTo(topEdge))
                            {
                                skip = true;
                            }
                            else
                            {
                                var leftEdge = new Engine.LineSegment(
                                    solid.bounds.TopLeft(),
                                    solid.bounds.BottomLeft());
                                
                                if (segment.ParallelTo(topEdge))
                                {
                                    skip = true;
                                }
                            }
                        }

                        if (!skip)
                        {
                            var segmentLength = segment.Length();

                            var shortestLength = shortest.Length();
                            var nextShortestLength = nextShortest.Length();

                            if ((segmentLength < nextShortestLength) && 
                                !Engine.AreWithinEpsilon(segmentLength, nextShortestLength) && 
                                !Engine.AreWithinEpsilon(segmentLength, shortestLength))
                            {
                                nextShortest = segment;
                            }
                        }
                    }
                }

                return new Engine.LineSegment(shortest.End(), nextShortest.End());
            });

            var start = new Engine.DirectionVector(sourceCenter, new Engine.Point(1, 0));
            points.Sort((a, b) : number => {
                var A : Engine.DirectionVector;
                var B : Engine.DirectionVector;

                if (a instanceof Engine.Point)
                {
                    A = Engine.DirectionVector.FromPoints(sourceCenter, a);
                }
                else if (a instanceof Engine.LineSegment)
                {
                    A = Engine.DirectionVector.FromPoints(sourceCenter, a.Start());
                }

                if (b instanceof Engine.Point)
                {
                    B = Engine.DirectionVector.FromPoints(sourceCenter, b);
                }
                else if (b instanceof Engine.LineSegment)
                {
                    B = Engine.DirectionVector.FromPoints(sourceCenter, b.Start());
                }

                var angleA = start.AngleTo(A);
                var angleB = start.AngleTo(B);

                if (angleA < angleB) return -1;
                if (angleA > angleB) return 1;
                return 0;
            });

            context.fillStyle = 'rgba(255, 255, 255, 0.4)';
            context.beginPath();
            context.moveTo(sourceCenter.x, sourceCenter.y);

            for (var i = 0; i <= points.Length(); ++i) {
                var idx = i;
                if (idx == points.Length())
                {
                    idx = 0;
                }

                var element = points.Get(idx);

                if (element instanceof Engine.Point)
                {
                    context.lineTo(element.x, element.y);
                }
                else if (element instanceof Engine.LineSegment)
                {
                    context.lineTo(element.Start().x, element.Start().y);
                }
            }

            context.closePath();
            context.fill();

            if (this.Debug)
            {
                for (var i = 0; i < points.Length(); ++i) {
                    var element = points.Get(i);

                    if (element instanceof Engine.Point)
                    {
                        context.strokeStyle = 'green';
                        context.beginPath();
                        context.moveTo(sourceCenter.x, sourceCenter.y);
                        context.lineTo(element.x, element.y);
                        context.closePath();
                        context.stroke();
                    }
                    else if (element instanceof Engine.LineSegment)
                    {
                        context.strokeStyle = 'red';
                        context.beginPath();
                        context.moveTo(sourceCenter.x, sourceCenter.y);
                        context.lineTo(element.End().x, element.End().y);
                        context.closePath();
                        context.stroke();

                        context.strokeStyle = 'green';
                        context.beginPath();
                        context.moveTo(sourceCenter.x, sourceCenter.y);
                        context.lineTo(element.Start().x, element.Start().y);
                        context.closePath();
                        context.stroke();
                    }
                }
            }
        });
    }
}

}
