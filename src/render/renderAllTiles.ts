import { Tile } from "../classes/Tile";
import { CELL_SIZE } from "../constants/index";
import { flipCtx } from "./flipCtx";

export const renderAllTiles = (
  canvas: HTMLCanvasElement,
  tiles: Tile[],
  images: Record<string, HTMLImageElement>
) => {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  canvas.height = tiles.length * 100;
  canvas.width = 1000;

  // render all possible tiles
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let prevImg = tiles[0].image;
  let y = 0;
  let x = -(CELL_SIZE + 5);
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    const img = images[tile.image];

    if (prevImg !== tile.image || x > 800) {
      y += CELL_SIZE + 25;
      x = 0;
      prevImg = tile.image;
    } else {
      x += CELL_SIZE + 5;
    }
    // Save the current context state
    ctx.save();
    if (tile.rotation && tile.flipDirection) {
      // Perform rotation
      ctx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);
      flipCtx(ctx, tile.flipDirection);
      ctx.rotate((tile.rotation * Math.PI) / 180);
      ctx.drawImage(img, -CELL_SIZE / 2, -CELL_SIZE / 2, CELL_SIZE, CELL_SIZE);
    } else if (tile.rotation) {
      // Perform rotation
      ctx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);
      ctx.rotate((tile.rotation * Math.PI) / 180);
      ctx.drawImage(img, -CELL_SIZE / 2, -CELL_SIZE / 2, CELL_SIZE, CELL_SIZE);
    } else if (tile.flipDirection) {
      // Perform flip
      ctx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);
      flipCtx(ctx, tile.flipDirection);
      ctx.drawImage(img, -CELL_SIZE / 2, -CELL_SIZE / 2, CELL_SIZE, CELL_SIZE);
    } else {
      // Draw without rotation
      ctx.drawImage(img, x, y, CELL_SIZE, CELL_SIZE);
    }

    ctx.restore();

    // Draw the sockets
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

    // Draw rotation and flip
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(
      `${tile.rotation ? `${tile.rotation}°` : "0°"} - ${
        tile.flipDirection ? tile.flipDirection : "original"
      }`,
      x + CELL_SIZE / 2,
      y + CELL_SIZE + 15
    );
  }
};
