import { Grid } from "../classes/Grid";
import { CELL_SIZE } from "../constants/index";
import { flipCtx } from "./flipCtx";

export const renderMap = (
  canvas: HTMLCanvasElement,
  grid: Grid,
  images: Record<string, HTMLImageElement>
) => {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    } else if (cell.options.length === 0) {
      ctx.fillStyle = "red";
      ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
    }
  });
};
