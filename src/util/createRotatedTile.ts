import { Tile } from "../classes/Tile";

export const createRotatedTile = (tile: Tile): Tile => {
  const { top, right, bottom, left } = tile.sockets;
  const { rotation, image, flipDirection } = tile;

  const rotatedTile = new Tile(
    image,
    { top: left, right: top, bottom: right, left: bottom },
    (rotation + 90) % 360,
    flipDirection
  );

  return rotatedTile;
};
