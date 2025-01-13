# Map Generator

This project is a 2D map generator that uses the Wave Function Collapse (WFC) algorithm to create procedurally generated maps. The generator can create maps with various tile sets, including dungeon, grass-and-dirt, and simple tiles.

## Features

- **Procedural Map Generation**: Generates maps using the WFC algorithm.
- **Tile Sets**: Supports multiple tile sets, including dungeon, grass-and-dirt, and simple tiles.
- **Tile Transformations**: Includes functionality to flip and rotate tiles to create unique map layouts.
- **Canvas Rendering**: Renders the generated maps on an HTML canvas.
- **Interactive Controls**: Provides controls to collapse cells one by one or all at once, with options for slow or fast collapse.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Install dependencies:

```sh
npm install
```

### Running the Project

To start the development server:

```sh
npm run dev
```

To build the project for production:

```sh
npm run build
```

To preview the production build:

```sh
npm run serve
```

## Usage

Open the application in your browser. Use the controls to set the map dimensions and toggle the option to allow open edges. Use the buttons to collapse cells and generate the map.

## Project Structure

- [`src`](src): Contains the source code.
  - `classes/`: Contains the main classes used in the project ([`Cell`](src/classes/Cell.ts), [`Grid`](src/classes/Grid.ts), [`Tile`](src/classes/Tile.ts)).
  - `constants/`: Contains constant values used in the project.
  - `data/`: Contains the tile sets ([`dungeonTiles`](src/data/dungeonTiles.ts), [`grassAndDirtTiles`](src/data/grassAndDirtTiles.ts), [`simpleTiles`](src/data/simpleTiles.ts)).
  - `render/`: Contains functions for rendering the map and tiles ([`renderMap`](src/render/renderMap.ts), [`renderAllTiles`](src/render/renderAllTiles.ts), [`flipCtx`](src/render/flipCtx.ts)).
  - `types/`: Contains TypeScript type definitions.
  - `util/`: Contains utility functions for tile transformations ([`createFlippedTile`](src/util/createFlippedTile.ts), [`createRotatedTile`](src/util/createRotatedTile.ts), [`flipAndRotateTiles`](src/util/flipAndRotateTiles.ts)).
- [`public`](public): Contains static assets and the HTML file.

## License

This project is licensed under the ISC License.
