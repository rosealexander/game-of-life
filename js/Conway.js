/*! Using p5.js */
export class Conway {
  constructor(resolution, color) {
    this._resolution = resolution;
    this._color = color;
    this._col = width / this._resolution;
    this._row = height / this._resolution;
    this._grid = this._generate2dArray(this._row, this._col);
    this._aux = [];
  }

  get resolution(){
    return this._resolution;
  }

  set resolution(res){
    this._resolution = res;
  }

  _generate2dArray = (r, c) => Array.from(Array(r), () => Array(c).fill(0));

  _drawShapes = () => {
    for (let i = 0; i < this._row; i++) {
      for (let j = 0; j < this._col; j++) {
        let x = j * this._resolution;
        let y = i * this._resolution;
        if (this._grid[i][j] === 1) {
          window.noStroke();
          fill(this._color);
          rect(x, y, this._resolution, this._resolution);
        }
      }
    }
  }

  _step = () => {
    for (let i = 1; i < this._row - 1; i++) {
      for (let j = 1; j < this._col - 1; j++) {

        let score =
            this._grid[i-1][j-1] +
            this._grid[i-1][j] +
            this._grid[i-1][j+1] +
            this._grid[i][j-1] +
            this._grid[i][j+1] +
            this._grid[i+1][j-1] +
            this._grid[i+1][j] +
            this._grid[i+1][j+1];

        if (this._grid[i][j] === 1 && score !== 2 && score !== 3)
          this._aux[i][j] = 0;
        else if (this._grid[i][j] === 0 && score === 3)
            this._aux[i][j] = 1;
      }
    }
  }

  _explode = (i, j) => {
    this._grid[i][j] = 1;
    this._grid[i-1][j-1] = 1;
    this._grid[i-1][j] = 1;
    this._grid[i-1][j+1] = 1;
    this._grid[i][j-1] = 1;
    this._grid[i][j+1] = 1;
    this._grid[i+1][j-1] = 1;
    this._grid[i+1][j] = 1;
    this._grid[i+1][j+1] = 1;
  };

  grow = (posX, posY) => {
    let i = Math.floor(posY / this._resolution);
    let j = Math.floor(posX / this._resolution);

    if (posX > this._resolution
        && posX < width - this._resolution
        && posY > this._resolution
        && posY < height - this._resolution) {
      this._explode(i,j);
    }
  }

  draw = () => {
    //draw squares
    this._drawShapes();

    //deep copy of 2d array
    this._aux = this._grid.map(inner => inner.slice())

    //increment conways game of life
    this._step();

    //swap adjusted aux arr to be the drawn grid
    this._grid = this._aux;

  }
}
