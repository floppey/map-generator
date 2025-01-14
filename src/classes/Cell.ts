import { CELL_SIZE } from "../constants/index";
import { flipCtx } from "../render/flipCtx";
import { reverseString } from "../util/reverseString";
import { Grid } from "./Grid";
import { Tile } from "./Tile";

export class Cell {
  #debug: boolean = false;
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
    this.#debug = window.location.hostname === "localhost";
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

  render(
    ctx: CanvasRenderingContext2D,
    images: Record<string, HTMLImageElement>
  ) {
    const x = this.x * CELL_SIZE;
    const y = this.y * CELL_SIZE;
    const tile = this.collapsed;
    if (tile) {
      const img = images[tile.image];
      if (tile.rotation && tile.flipDirection) {
        // Save the current context state
        ctx.save();

        // Perform rotation
        ctx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);
        flipCtx(ctx, tile.flipDirection);
        ctx.rotate((tile.rotation * Math.PI) / 180);
        ctx.drawImage(
          img,
          -CELL_SIZE / 2,
          -CELL_SIZE / 2,
          CELL_SIZE,
          CELL_SIZE
        );

        // Restore the context state
        ctx.restore();
      } else if (tile.rotation) {
        // Save the current context state
        ctx.save();

        // Perform rotation
        ctx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);
        ctx.rotate((tile.rotation * Math.PI) / 180);
        ctx.drawImage(
          img,
          -CELL_SIZE / 2,
          -CELL_SIZE / 2,
          CELL_SIZE,
          CELL_SIZE
        );

        // Restore the context state
        ctx.restore();
      } else if (tile.flipDirection) {
        // Save the current context state
        ctx.save();

        // Perform flip
        ctx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);
        flipCtx(ctx, tile.flipDirection);
        ctx.drawImage(
          img,
          -CELL_SIZE / 2,
          -CELL_SIZE / 2,
          CELL_SIZE,
          CELL_SIZE
        );

        // Restore the context state
        ctx.restore();
      } else {
        // Draw without rotation
        ctx.drawImage(img, x, y, CELL_SIZE, CELL_SIZE);
      }
    } else if (this.options.length === 0) {
      ctx.fillStyle = "red";
      ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
    }

    if (this.#debug) {
      ctx.save();
      const tile = this.collapsed;
      if (tile) {
        ctx.font = "10px Arial";
        ctx.fillStyle = "orange";
        ctx.textAlign = "center";
        ctx.fillText(tile.sockets.top, x + CELL_SIZE / 2, y + 10);
        ctx.textAlign = "right";
        ctx.fillText(tile.sockets.right, x + CELL_SIZE - 5, y + CELL_SIZE / 2);
        ctx.textAlign = "center";
        ctx.fillText(tile.sockets.bottom, x + CELL_SIZE / 2, y + CELL_SIZE - 5);
        ctx.textAlign = "left";
        ctx.fillText(tile.sockets.left, x + 5, y + CELL_SIZE / 2);
      }
      ctx.strokeStyle = "blue";
      ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
      ctx.restore();
    }
  }
}
