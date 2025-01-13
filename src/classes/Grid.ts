import { Cell } from "./Cell";
import { Tile } from "./Tile";

export class Grid {
  #tiles: Tile[];
  #cells: Cell[];
  #height: number;
  #width: number;
  #allowOpenEdges: boolean;
  #autoRestart: boolean;

  constructor(
    width: number,
    height: number,
    tiles: Tile[],
    allowOpenEdges: boolean,
    autoRestart: boolean
  ) {
    this.#tiles = tiles;
    this.#cells = [];
    this.#height = height;
    this.#width = width;
    this.#allowOpenEdges = allowOpenEdges;
    this.#autoRestart = autoRestart;
    this.populate();
  }

  get tiles() {
    return this.#tiles;
  }

  get cells() {
    return this.#cells;
  }

  populate() {
    for (let x = 0; x < this.#width; x++) {
      for (let y = 0; y < this.#height; y++) {
        if (
          !this.#allowOpenEdges &&
          (x === 0 ||
            y === 0 ||
            x === this.#width - 1 ||
            y === this.#height - 1)
        ) {
          let allowedTiles = [...this.#tiles];
          if (x === 0) {
            allowedTiles = allowedTiles.filter(
              (tile) => tile.sockets.left === "BBB"
            );
          }
          if (y === 0) {
            allowedTiles = allowedTiles.filter(
              (tile) => tile.sockets.top === "BBB"
            );
          }
          if (x === this.#width - 1) {
            allowedTiles = allowedTiles.filter(
              (tile) => tile.sockets.right === "BBB"
            );
          }
          if (y === this.#height - 1) {
            allowedTiles = allowedTiles.filter(
              (tile) => tile.sockets.bottom === "BBB"
            );
          }
          this.#cells.push(new Cell(this, x, y, [...allowedTiles]));
        } else {
          this.#cells.push(new Cell(this, x, y, [...this.#tiles]));
        }
      }
    }
  }

  collapseNextCell(): Cell {
    // Find the cells with the least entropy
    const sortedCells = this.cells
      .filter((cell) => !cell.collapsed)
      .sort((a, b) => a.options.length - b.options.length);
    const leastEntropyCells = sortedCells.filter(
      (cell) => cell.options.length === sortedCells[0].options.length
    );
    // Select a random cell from the least entropy cells
    const selectedCell =
      leastEntropyCells[Math.floor(Math.random() * leastEntropyCells.length)];

    if (selectedCell.options.length === 0) {
      console.log("No options left", selectedCell);
      if (this.#autoRestart) {
        console.log("Restarting grid");
        this.populate();
        return this.collapseNextCell();
      } else {
        throw new Error("No options left");
      }
    }

    // Collapse the cell to a random option
    selectedCell.collapse();

    return selectedCell;
  }

  evaluate() {
    this.cells.forEach((cell) => {
      cell.evaluate();
    });
  }
}
