import { FlipDirection, Sockets } from "../types/index";

export class Tile {
  #sockets: Sockets;
  #image: string;
  #rotation: number;
  #flipDirection: FlipDirection | null;

  constructor(
    image: string,
    sockets: Sockets,
    rotation: number = 0,
    flipDirection: FlipDirection | null = null
  ) {
    this.#image = image;
    this.#sockets = sockets;
    this.#rotation = rotation;
    this.#flipDirection = flipDirection;
  }

  get sockets() {
    return this.#sockets;
  }

  get image() {
    return this.#image;
  }

  get rotation() {
    return this.#rotation;
  }

  get flipDirection() {
    return this.#flipDirection;
  }
}
