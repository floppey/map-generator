import { Grid } from "./classes/Grid";
import { Tile } from "./classes/Tile";
import { dungeonTiles } from "./data/dungeonTiles";
import { createFlippedTile } from "./util/createFlippedTile";
import { createRotatedTile } from "./util/createRotatedTile";
import { flipCtx } from "./util/flipCtx";

const rotatedTiles: Tile[] = [];

dungeonTiles.forEach((original) => {
  const rotate90 = createRotatedTile(original);
  const rotate180 = createRotatedTile(rotate90);
  const rotate270 = createRotatedTile(rotate180);

  rotatedTiles.push(original, rotate90, rotate180, rotate270);
});

const flippedTiles: Tile[] = [];

rotatedTiles.forEach((original) => {
  const flipHorizontal = createFlippedTile(original, "horizontal");
  const flipVertical = createFlippedTile(original, "vertical");
  flippedTiles.push(original, flipHorizontal, flipVertical);
});

const symmetricalTiles: Tile[] = flippedTiles.sort((a, b) =>
  a.image.localeCompare(b.image)
);

// Remove duplicates
const uniqueTiles: Tile[] = [];
symmetricalTiles.forEach((tile) => {
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
const debugCanvas = document.getElementById("debug") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const debugCtx = debugCanvas.getContext("2d");

if (!ctx || !debugCtx) {
  throw new Error("Could not get canvas context");
}

canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;
debugCanvas.height = uniqueTiles.length * 100;
debugCanvas.width = CANVAS_SIZE;

let grid = new Grid(GRID_SIZE, uniqueTiles);
let animationFrameId = -1;

const images: Record<string, HTMLImageElement> = {};

dungeonTiles.forEach((tile) => {
  const img = new Image();
  img.src = `.${tile.image}`;
  images[tile.image] = img;
});

const drawDebug = () => {
  // render all possible tiles
  debugCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const CELL_SIZE = 80;

  let prevImg = uniqueTiles[0].image;
  let y = 0;
  let x = -(CELL_SIZE + 5);
  for (let i = 0; i < uniqueTiles.length; i++) {
    const tile = uniqueTiles[i];
    const img = images[tile.image];

    if (prevImg !== tile.image || x > 800) {
      y += CELL_SIZE + 25;
      x = 0;
      prevImg = tile.image;
    } else {
      x += CELL_SIZE + 5;
    }
    // Save the current context state
    debugCtx.save();
    if (tile.rotation && tile.flipDirection) {
      // Perform rotation
      debugCtx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);
      flipCtx(debugCtx, tile.flipDirection);
      debugCtx.rotate((tile.rotation * Math.PI) / 180);
      debugCtx.drawImage(
        img,
        -CELL_SIZE / 2,
        -CELL_SIZE / 2,
        CELL_SIZE,
        CELL_SIZE
      );
    } else if (tile.rotation) {
      // Perform rotation
      debugCtx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);
      debugCtx.rotate((tile.rotation * Math.PI) / 180);
      debugCtx.drawImage(
        img,
        -CELL_SIZE / 2,
        -CELL_SIZE / 2,
        CELL_SIZE,
        CELL_SIZE
      );
    } else if (tile.flipDirection) {
      // Perform flip
      debugCtx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);
      flipCtx(debugCtx, tile.flipDirection);
      debugCtx.drawImage(
        img,
        -CELL_SIZE / 2,
        -CELL_SIZE / 2,
        CELL_SIZE,
        CELL_SIZE
      );
    } else {
      // Draw without rotation
      debugCtx.drawImage(img, x, y, CELL_SIZE, CELL_SIZE);
    }

    debugCtx.restore();

    // Draw the sockets
    debugCtx.font = "10px Arial";
    debugCtx.fillStyle = "orange";
    debugCtx.textAlign = "center";
    debugCtx.fillText(
      tile.sockets.top[0],
      x + CELL_SIZE / 2 - CELL_SIZE / 4,
      y + 10
    );
    debugCtx.fillText(tile.sockets.top[1], x + CELL_SIZE / 2, y + 10);
    debugCtx.fillText(
      tile.sockets.top[2],
      x + CELL_SIZE / 2 + CELL_SIZE / 4,
      y + 10
    );

    debugCtx.fillText(
      tile.sockets.right[0],
      x + CELL_SIZE - 10,
      y + CELL_SIZE / 2 - CELL_SIZE / 4
    );
    debugCtx.fillText(
      tile.sockets.right[1],
      x + CELL_SIZE - 10,
      y + CELL_SIZE / 2
    );
    debugCtx.fillText(
      tile.sockets.right[2],
      x + CELL_SIZE - 10,
      y + CELL_SIZE / 2 + CELL_SIZE / 4
    );

    debugCtx.fillText(
      tile.sockets.bottom[0],
      x + CELL_SIZE / 2 + CELL_SIZE / 4,
      y + CELL_SIZE - 10
    );
    debugCtx.fillText(
      tile.sockets.bottom[1],
      x + CELL_SIZE / 2,
      y + CELL_SIZE - 10
    );
    debugCtx.fillText(
      tile.sockets.bottom[2],
      x + CELL_SIZE / 2 - CELL_SIZE / 4,
      y + CELL_SIZE - 10
    );

    debugCtx.fillText(
      tile.sockets.left[0],
      x + 10,
      y + CELL_SIZE / 2 + CELL_SIZE / 4
    );
    debugCtx.fillText(tile.sockets.left[1], x + 10, y + CELL_SIZE / 2);
    debugCtx.fillText(
      tile.sockets.left[2],
      x + 10,
      y + CELL_SIZE / 2 - CELL_SIZE / 4
    );

    // Draw rotation and flip
    debugCtx.font = "10px Arial";
    debugCtx.fillStyle = "black";
    debugCtx.textAlign = "center";
    debugCtx.fillText(
      `${tile.rotation ? `${tile.rotation}°` : "0°"} - ${
        tile.flipDirection ? tile.flipDirection : "original"
      }`,
      x + CELL_SIZE / 2,
      y + CELL_SIZE + 15
    );
  }
};

export const draw = () => {
  // Clear the canvas
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // Populate the cells
  grid.cells.forEach((cell) => {
    const x = cell.x * CELL_SIZE;
    const y = cell.y * CELL_SIZE;
    const tile = cell.collapsed;
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
    }
  });
};

export const collapseNextCell = () => {
  const collapsed = grid.collapseNextCell();
  const neighbors = collapsed.getNeighbors();
  Object.values(neighbors).forEach((neighbor) => {
    if (neighbor && !neighbor.collapsed) {
      neighbor.evaluate();
    }
  });
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

export const collapseAllFast = () => {
  if (!grid.cells.some((cell) => !cell.collapsed)) {
    console.log("All cells collapsed");

    draw();
    return;
  } else {
    collapseNextCell();
    collapseAllFast();
  }
};

document.getElementById("collapseNext")?.addEventListener("click", () => {
  collapseNextCell();
  draw();
  drawDebug();
});

document.getElementById("collapseAllSlow")?.addEventListener("click", () => {
  cancelAnimationFrame(animationFrameId);
  collapseAll();
  drawDebug();
});

document.getElementById("collapseAllFast")?.addEventListener("click", () => {
  cancelAnimationFrame(animationFrameId);
  collapseAllFast();
  drawDebug();
});

document.getElementById("reset")?.addEventListener("click", () => {
  cancelAnimationFrame(animationFrameId);
  grid = new Grid(GRID_SIZE, uniqueTiles);
  draw();
  drawDebug();
});

setTimeout(() => {
  draw();
  drawDebug();
}, 1000);
