/*! Using p5.js */
export class Ball {
    constructor(posX, posY, radius, velocity) {
        this._r = radius;
        this._x = posX;
        this._y = posY;
        this._vmax = velocity;
        this._v = this._vmax * 2;
        let rand = Math.random() * ( 2 * Math.PI );
        let angle = rand - Math.PI / 2;
        this._dirY = Math.sin(angle);
        this._dirX = Math.cos(angle);
    }

    get x(){ return this._x; }
    set x(posX) { this._x = posX }
    get y() { return this._y; }
    set y(posY) { this._y = posY }
    get r(){ return this._r; }
    set r(radius) { this._r = radius; }
    get v(){ return this._v; }
    set v(velocity) { this._v = velocity; }
    get dirY(){ return this._dirY; }
    set dirY(dirY) { this._dirY = dirY; }
    get dirX(){ return this._dirX; }
    set dirX(dirX) { this._dirX = dirX; }

    _tick(){
        if (this._v > this._vmax) this._v -= 0.25;
        this._x += this._dirX * this._v;
        this._y += this._dirY * this._v;
    }

    detectWallCollision() {
        return this._x - this._r < 0
            ||  this._x + this._r > window.innerWidth
            ||  this._y - this._r < 0
            ||  this._y + this._r > window.innerHeight;
    }

    wallCollisionResolution() {

        let angle = Math.atan2(this._dirY, this._dirX);

        if ( angle > 0 && angle <= Math.PI/4 ) {
            angle += Math.PI/6;
        } else if ( angle >= 3*Math.PI/4 && angle < Math.PI ) {
            angle -= Math.PI/6;
        } else if ( angle < 0 && angle >= -1 * Math.PI/4) {
            angle -= Math.PI/6;
        } else if ( angle <= -3 * Math.PI/4 && angle < -1 * Math.PI ) {
            angle += Math.PI/6;
        } else if ( angle === 0 || angle === Math.PI || angle === -1 * Math.PI ) {
            Math.random() > 0.5 ? angle += Math.PI/6 : angle -= Math.PI/6;
        }

        this._dirX = Math.cos(angle);
        this._dirY = Math.sin(angle);

        if (this._x - this._r < 0){
            this._x = this._r;
            this._dirX *= -1;
        }
        else if (this._x + this._r > window.innerWidth) {
            this._x = window.innerWidth - this._r;
            this._dirX *= -1;
        }
        else if (this._y - this._r < 0) {
            this._y = this._r;
            this._dirY *= -1;

        } else if (this._y + this._r > window.innerHeight) {
            this._y = window.innerHeight - this._r;
            this._dirY *= -1;
        }
    }

    draw(){
        fill(255,255,255);
        window.noStroke();
        ellipse(this._x, this._y, this._r*2, this._r*2);
        this._tick();
    }
}
