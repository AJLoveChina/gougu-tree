import "./main.scss";
import {renderShapes} from "./render";

function main() {
  let canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  renderShapes(canvas);
  document.body.appendChild(canvas);
}

main();