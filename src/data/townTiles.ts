import { Tile } from "../classes/Tile";

/**
 * Town tiles
 *
 * Sockets:
 * A = grass
 * B = road
 * C = water
 */
export const townTiles: Tile[] = [
  new Tile("/town/grass.png", {
    top: "AAAA",
    right: "AAAA",
    bottom: "AAAA",
    left: "AAAA",
  }),
  new Tile("/town/grass-road-1.png", {
    top: "ABBA",
    right: "AAAA",
    bottom: "ABBA",
    left: "AAAA",
  }),
  new Tile("/town/grass-road-2.png", {
    top: "ABBA",
    right: "ABBA",
    bottom: "ABBA",
    left: "AAAA",
  }),
  new Tile("/town/grass-road-3.png", {
    top: "AAAA",
    right: "ABBA",
    bottom: "ABBA",
    left: "AAAA",
  }),
  new Tile("/town/grass-road-4.png", {
    top: "ABBA",
    right: "ABBA",
    bottom: "ABBA",
    left: "ABBA",
  }),
  new Tile("/town/grass-road-5.png", {
    top: "BAAB",
    right: "AAAA",
    bottom: "AAAA",
    left: "AAAA",
  }),
  new Tile("/town/grass-road-water-1.png", {
    top: "ABBC",
    right: "CCCC",
    bottom: "CBBA",
    left: "AAAA",
  }),
  new Tile("/town/grass-road-water-2.png", {
    top: "ABBC",
    right: "CCCC",
    bottom: "CBBA",
    left: "ABBA",
  }),
  new Tile("/town/grass-road-water-3.png", {
    top: "CCCC",
    right: "CCCC",
    bottom: "CBBA",
    left: "ABBA",
  }),
  new Tile("/town/water.png", {
    top: "CCCC",
    right: "CCCC",
    bottom: "CCCC",
    left: "CCCC",
  }),
];
