import { Grid } from "./classes/Grid";
import { CELL_SIZE } from "./constants/index";
import { dungeonTiles } from "./data/dungeonTiles";
import { renderAllTiles } from "./render/renderAllTiles";
import { renderMap } from "./render/renderMap";
import { flipAndRotateTiles } from "./util/flipAndRotateTiles";

let animationFrameId = -1;
const images: Record<string, HTMLImageElement> = {};
const uniqueTiles = flipAndRotateTiles(dungeonTiles);
let grid = new Grid(0, 0, uniqueTiles, true, true);
const canvas = document.getElementById("map") as HTMLCanvasElement;
const debugCanvas = document.getElementById("debugCanvas") as HTMLCanvasElement;

const initializeGrid = () => {
  const height = Number(
    (document.getElementById("height") as HTMLInputElement).value
  );
  const width = Number(
    (document.getElementById("width") as HTMLInputElement).value
  );
  const allowOpenEdges = (
    document.getElementById("allowOpenEdges") as HTMLInputElement
  ).checked;
  const autoRestart = (
    document.getElementById("autoRestart") as HTMLInputElement
  ).checked;
  grid = new Grid(width, height, uniqueTiles, allowOpenEdges, autoRestart);
  canvas.height = height * CELL_SIZE;
  canvas.width = width * CELL_SIZE;
};

/** Preload images */
dungeonTiles.forEach((tile) => {
  const img = new Image();
  img.src = `.${tile.image}`;
  images[tile.image] = img;
});

const collapseNextCell = () => {
  const collapsed = grid.collapseNextCell();
  const neighbors = collapsed.getNeighbors();
  Object.values(neighbors).forEach((neighbor) => {
    if (neighbor && !neighbor.collapsed) {
      neighbor.evaluate();
    }
  });
};

const collapseAll = () => {
  if (!grid.cells.some((cell) => !cell.collapsed)) {
    console.log("All cells collapsed");
    cancelAnimationFrame(animationFrameId);
    return;
  }

  collapseNextCell();
  renderMap(canvas, grid, images);
  animationFrameId = requestAnimationFrame(collapseAll);
};

const collapseAllFast = () => {
  if (!grid.cells.some((cell) => !cell.collapsed)) {
    console.log("All cells collapsed");

    renderMap(canvas, grid, images);
    return;
  } else {
    collapseNextCell();
    collapseAllFast();
  }
};

/**
 * Add event listeners
 */

document.getElementById("collapseNext")?.addEventListener("click", () => {
  collapseNextCell();
  renderMap(canvas, grid, images);
  renderAllTiles(debugCanvas, uniqueTiles, images);
});

document.getElementById("collapseAllSlow")?.addEventListener("click", () => {
  cancelAnimationFrame(animationFrameId);
  initializeGrid();
  collapseAll();
  renderAllTiles(debugCanvas, uniqueTiles, images);
});

document.getElementById("collapseAllFast")?.addEventListener("click", () => {
  cancelAnimationFrame(animationFrameId);
  initializeGrid();
  collapseAllFast();
  renderAllTiles(debugCanvas, uniqueTiles, images);
});

document.getElementById("reset")?.addEventListener("click", () => {
  cancelAnimationFrame(animationFrameId);
  initializeGrid();
  renderMap(canvas, grid, images);
  renderAllTiles(debugCanvas, uniqueTiles, images);
});

/**
 * Initial render
 */

setTimeout(() => {
  initializeGrid();
  renderMap(canvas, grid, images);
  renderAllTiles(debugCanvas, uniqueTiles, images);
}, 1000);
