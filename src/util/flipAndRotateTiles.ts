import { Tile } from "../classes/Tile";
import { createFlippedTile } from "./createFlippedTile";
import { createRotatedTile } from "./createRotatedTile";

export const flipAndRotateTiles = (tiles: Tile[]): Tile[] => {
  const rotatedTiles: Tile[] = [];

  tiles.forEach((original) => {
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

  // Sort tiles by image name
  const sortedTiles: Tile[] = flippedTiles.sort((a, b) =>
    a.image.localeCompare(b.image)
  );

  // Remove duplicates
  const uniqueTiles: Tile[] = [];
  sortedTiles.forEach((tile) => {
    // Allow multiple "empty" tiles
    if (
      tile.sockets.top === "AAA" &&
      tile.sockets.right === "AAA" &&
      tile.sockets.bottom === "AAA" &&
      tile.sockets.left === "AAA" &&
      tile.rotation === 0 &&
      tile.flipDirection === null
    ) {
      uniqueTiles.push(tile);
      return;
    }
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

  console.log(uniqueTiles);

  return uniqueTiles;
};
