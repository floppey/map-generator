import { draw } from "../main";
import { Cell } from "./Cell";
import { Tile } from "./Tile";

export class Grid {
  #tiles: Tile[];
  #cells: Cell[];

  constructor(
    width: number,
    height: number,
    tiles: Tile[],
    allowOpenEdges: boolean
  ) {
    this.#tiles = tiles;
    this.#cells = [];

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (
          !allowOpenEdges &&
          (x === 0 || y === 0 || x === width - 1 || y === height - 1)
        ) {
          let allowedTiles = [...tiles];
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
          if (x === width - 1) {
            allowedTiles = allowedTiles.filter(
              (tile) => tile.sockets.right === "BBB"
            );
          }
          if (y === height - 1) {
            allowedTiles = allowedTiles.filter(
              (tile) => tile.sockets.bottom === "BBB"
            );
          }
          this.#cells.push(new Cell(this, x, y, [...allowedTiles]));
        } else {
          this.#cells.push(new Cell(this, x, y, [...tiles]));
        }
      }
    }
  }

  get tiles() {
    return this.#tiles;
  }

  get cells() {
    return this.#cells;
  }

  collapseNextCell() {
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
      draw();
      throw new Error("No options left");
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
