import { Grid } from "../classes/Grid";

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
  grid.render(ctx, images);
};
