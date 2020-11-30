
// Quick, easy constructor for a new Vector
function V(x, y) {
    return new Vector(x, y);
}

// Constructor for a Vector object, containing an x and a y
function Vector(x, y) {
    this.x = x;
    this.y = y;

    // Mutator; translates the Vector
    this.translate = function(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    // Mutator; translates the Vector from another Vector
    this.translate = function(vec) {
        this.x += vec.x;
        this.y += vec.y;
    }

    // Returns a new Vector which is a composite of this one and the given one
    this.add = function(a, b) {
        if (b === undefined)
            return new Vector(this.x + a.x, this.y + a.y);
        else
            return new Vector(this.x + a, this.y + b);
    }

    // Returns a new Vector which is the difference of this one and the given one
    this.sub = function(a, b) {
        if (b === undefined)
            return new Vector(this.x - a.x, this.y - a.y);
        else
            return new Vector(this.x - a, this.y - b);
    }

    // Returns a new Vector which is this Vector scaled by the given scalar
    this.scale = function(a) {
        return new Vector(a * this.x, a * this.y);
    }

    // Returns a normalized version of this Vector
    this.normalize = function() {
        var len = this.len();
        if (len === 0)
            return new Vector(0, 0);
        else
            return new Vector(this.x / len, this.y / len);
    }

    // Returns the length of this Vector
    this.len = function() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    // Returns the distance between this Vector and the given Vector
    this.distanceTo = function(vec) {
        return vec.sub(this).len();
    }
}
