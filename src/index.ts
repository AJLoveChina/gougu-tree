import "./main.scss";
import { renderShapes } from "./render";

function main() {
  const id = "canvas";
  const canvasFind = document.getElementById(id);

  if (canvasFind) {
    canvasFind.hidden = true;
    document.body.removeChild(canvasFind);
  }

  let canvas: HTMLCanvasElement;
  canvas = document.createElement("canvas");
  canvas.id = id;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let bFill = (document.getElementById("fill-checkbox") as HTMLInputElement)
    .checked;

  let bRandomColor = (
    document.getElementById("random-color-checkbox") as HTMLInputElement
  ).checked;

  renderShapes(canvas, {
    bFill,
    bRandomColor,
  });
}

function listen() {
  const btn = document.getElementById("render");
  btn.addEventListener("click", () => {
    main();
  });
}

main();
listen();
