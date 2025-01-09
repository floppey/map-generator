import { reverseString } from "../util/reverseString";
import { Grid } from "./Grid";
import { Tile } from "./Tile";

export class Cell {
  x: number;
  y: number;
  grid: Grid;
  options: Tile[];
  collapsed?: Tile;

  constructor(grid: Grid, x: number, y: number, options: Tile[]) {
    this.grid = grid;
    this.x = x;
    this.y = y;
    this.options = options;
  }

  collapse() {
    if (!this.collapsed) {
      this.collapsed =
        this.options[Math.floor(Math.random() * this.options.length)];
    } else {
      console.log("Cell already collapsed", this);
      throw new Error("Cell already collapsed");
    }
  }

  /** Get adjecent cells */
  getNeighbors() {
    return {
      top: this.grid.cells.find(
        (cell) => cell.x === this.x && cell.y === this.y - 1
      ),
      right: this.grid.cells.find(
        (cell) => cell.x === this.x + 1 && cell.y === this.y
      ),
      bottom: this.grid.cells.find(
        (cell) => cell.x === this.x && cell.y === this.y + 1
      ),
      left: this.grid.cells.find(
        (cell) => cell.x === this.x - 1 && cell.y === this.y
      ),
    };
  }

  /** Update list of options based on it's neighbors */
  evaluate() {
    if (this.collapsed) {
      return;
    }

    const neighbors = this.getNeighbors();
    if (neighbors.top?.collapsed) {
      this.options = this.options.filter(
        (option) =>
          option.sockets.top ===
          reverseString(neighbors.top?.collapsed?.sockets.bottom)
      );
    }
    if (neighbors.right?.collapsed) {
      this.options = this.options.filter(
        (option) =>
          option.sockets.right ===
          reverseString(neighbors.right?.collapsed?.sockets.left)
      );
    }
    if (neighbors.bottom?.collapsed) {
      this.options = this.options.filter(
        (option) =>
          option.sockets.bottom ===
          reverseString(neighbors.bottom?.collapsed?.sockets.top)
      );
    }
    if (neighbors.left?.collapsed) {
      this.options = this.options.filter(
        (option) =>
          option.sockets.left ===
          reverseString(neighbors.left?.collapsed?.sockets.right)
      );
    }
  }
}
