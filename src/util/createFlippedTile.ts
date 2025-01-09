import { Tile } from "../classes/Tile";
import { FlipDirection } from "../types/index";

export const createFlippedTile = (tile: Tile, dir: FlipDirection): Tile => {
  const { top, right, bottom, left } = tile.sockets;
  const { rotation, image, flipDirection } = tile;

  if (flipDirection) {
    throw new Error("Tile already flipped");
  }

  const flippedTile = new Tile(
    image,
    {
      top: dir === "horizontal" ? top : bottom,
      right: dir === "vertical" ? left : right,
      bottom: dir === "horizontal" ? bottom : top,
      left: dir === "vertical" ? right : left,
    },
    rotation
  );

  return flippedTile;
};
