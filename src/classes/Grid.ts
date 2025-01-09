import { Cell } from "./Cell";
import { Tile } from "./Tile";

export class Grid {
  #tiles: Tile[];
  #cells: Cell[];

  constructor(size: number, tiles: Tile[]) {
    this.#tiles = tiles;
    this.#cells = [];

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        this.#cells.push(new Cell(this, x, y, [...tiles]));
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

    // Collapse the cell to a random option
    selectedCell.collapse();
  }

  evaluate() {
    this.cells.forEach((cell) => {
      cell.evaluate();
    });
  }
}
