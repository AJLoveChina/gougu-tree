import { Shape, Polygon, Rect } from "./shape";
import {distanceA2B, getRectCorners, movePoint} from "./common";

export function renderShapes(canvas: HTMLCanvasElement) {
  let midPoint = { x: canvas.width / 2, y: canvas.height / 2 };
  let objs = [new Rect(getRectCorners(midPoint, 100, 100))];
  const ctx = canvas.getContext("2d");
  return setInterval(() => {
    let newShapse: Rect[] = [];
    objs.forEach((obj) => {
      let shapes = getGouguShapes(obj);
      newShapse.push(...shapes);
    });

    objs.push(...newShapse);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderObjs(objs, ctx);
  }, 1000);
}

export function renderObjs(objs: Shape[], ctx: CanvasRenderingContext2D) {
  objs.forEach((obj) => obj.render(ctx));
}

export function getGouguShapes(rect: Rect): Rect[] {
  let { tl, tr } = rect;
  let dis = distanceA2B(tl, tr);
  let disShort = dis / 2;
  let direction = {x: -1, y: Math.sqrt(3)}
  let p3 = movePoint(tl, direction, disShort);

  return [];
}
