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

const collapseAll = async () => {
  if (!grid.cells.some((cell) => !cell.collapsed)) {
    console.log("All cells collapsed");
    return;
  }

  setTimeout(() => {
    collapseNextCell();
    collapseAll();
  }, 100);
};

const renderLoop = async () => {
  renderMap(canvas, grid, images);
  if (grid.cells.some((cell) => !cell.collapsed)) {
    animationFrameId = requestAnimationFrame(renderLoop);
  }
};

const collapseAllFast = async () => {
  if (grid.cells.some((cell) => !cell.collapsed)) {
    setTimeout(() => {
      collapseNextCell();
      collapseAllFast();
    }, 0);
  } else {
    console.log("All cells collapsed");
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
  renderLoop();
});

document.getElementById("collapseAllFast")?.addEventListener("click", () => {
  cancelAnimationFrame(animationFrameId);
  initializeGrid();
  collapseAllFast();
  renderLoop();
});

document.getElementById("reset")?.addEventListener("click", () => {
  cancelAnimationFrame(animationFrameId);
  initializeGrid();
  renderMap(canvas, grid, images);
});

/**
 * Initial render
 */

setTimeout(() => {
  initializeGrid();
  renderMap(canvas, grid, images);
  renderAllTiles(debugCanvas, uniqueTiles, images);
}, 1000);
