import { Tile } from "../classes/Tile";
import { FlipDirection } from "../types/index";
import { reverseString } from "./reverseString";

export const createFlippedTile = (tile: Tile, dir: FlipDirection): Tile => {
  const { top, right, bottom, left } = tile.sockets;
  const { rotation, image, flipDirection } = tile;

  if (flipDirection) {
    throw new Error("Tile already flipped");
  }

  const newSockets = {
    horizontal: {
      top: reverseString(bottom),
      right: reverseString(right),
      bottom: reverseString(top),
      left: reverseString(left),
    },
    vertical: {
      top: reverseString(top),
      right: reverseString(left),
      bottom: reverseString(bottom),
      left: reverseString(right),
    },
  };

  const flippedTile = new Tile(image, newSockets[dir], rotation, dir);

  return flippedTile;
};
