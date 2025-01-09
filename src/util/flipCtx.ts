import { FlipDirection } from "../types/index";

export const flipCtx = (
  ctx: CanvasRenderingContext2D,
  direction: FlipDirection
) => {
  if (direction === "horizontal") {
    ctx.scale(1, -1);
  } else if (direction === "vertical") {
    ctx.scale(-1, 1);
  }
};
