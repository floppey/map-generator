import { Grid } from "./classes/Grid";
import { Tile } from "./classes/Tile";
// import { createFlippedTile } from "./util/createFlippedTile";
import { createRotatedTile } from "./util/createRotatedTile";

const tiles: Tile[] = [
  new Tile("0.png", { top: "AAA", right: "AAA", bottom: "AAA", left: "AAA" }),
  new Tile("1.png", { top: "ABA", right: "AAA", bottom: "ABA", left: "AAA" }),
  new Tile("2.png", { top: "ABA", right: "ABA", bottom: "ABA", left: "ABA" }),
  new Tile("3.png", { top: "ABA", right: "ABA", bottom: "AAA", left: "ABA" }),
  new Tile("4.png", { top: "ABA", right: "AAA", bottom: "AAA", left: "ABA" }),
];

const rotatedTiles: Tile[] = [];

for (let i = 0; i < tiles.length; i++) {
  const rotate90 = createRotatedTile(tiles[i]);
  const rotate180 = createRotatedTile(rotate90);
  const rotate270 = createRotatedTile(rotate180);
  rotatedTiles.push(rotate90, rotate180, rotate270);
}

const flippedTiles: Tile[] = [];
// for (let i = 0; i < tiles.length; i++) {
//   const horizontal = createFlippedTile(tiles[i], "horizontal");
//   const vertical = createFlippedTile(tiles[i], "vertical");
//   flippedTiles.push(horizontal, vertical);
// }

tiles.push(...rotatedTiles, ...flippedTiles);

// Remove duplicates
const uniqueTiles: Tile[] = [];
tiles.forEach((tile) => {
  if (
    !uniqueTiles.some(
      (uniqueTile) =>
        uniqueTile.image === tile.image &&
        uniqueTile.sockets.top === tile.sockets.top &&
        uniqueTile.sockets.right === tile.sockets.right &&
        uniqueTile.sockets.bottom === tile.sockets.bottom &&
        uniqueTile.sockets.left === tile.sockets.left
    )
  ) {
    uniqueTiles.push(tile);
  }
});

const GRID_SIZE = 20;
const CANVAS_SIZE = 1000;
const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

const canvas = document.getElementById("map") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("Could not get canvas context");
}

canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

let grid = new Grid(GRID_SIZE, uniqueTiles);
let animationFrameId = -1;

const images: Record<string, HTMLImageElement> = {};

tiles.forEach((tile) => {
  const img = new Image();
  img.src = `./simple/${tile.image}`;
  images[tile.image] = img;
});

export const draw = () => {
  // Clear the canvas
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // Populate the cells
  grid.cells.forEach((cell) => {
    const x = cell.x * CELL_SIZE;
    const y = cell.y * CELL_SIZE;
    if (cell.collapsed) {
      const img = images[cell.collapsed.image];
      if (cell.collapsed?.rotation) {
        // Save the current context state
        ctx.save();

        // Perform rotation
        ctx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);
        ctx.rotate((cell.collapsed.rotation * Math.PI) / 180);
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
    }
  });
};

export const collapseNextCell = () => {
  grid.collapseNextCell();
  grid.evaluate();
};

export const collapseAll = () => {
  if (!grid.cells.some((cell) => !cell.collapsed)) {
    console.log("All cells collapsed");
    cancelAnimationFrame(animationFrameId);
    return;
  }

  collapseNextCell();
  draw();
  animationFrameId = requestAnimationFrame(collapseAll);
};

document.getElementById("collapseNext")?.addEventListener("click", () => {
  collapseNextCell();
  draw();
});

document.getElementById("collapseAll")?.addEventListener("click", () => {
  cancelAnimationFrame(animationFrameId);
  collapseAll();
});

document.getElementById("reset")?.addEventListener("click", () => {
  cancelAnimationFrame(animationFrameId);
  grid = new Grid(GRID_SIZE, uniqueTiles);
});
