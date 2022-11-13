import { Shape, Rect } from "./shape";
import {
  getRectCorners,
  LineSegment,
  movePoint,
  randomColor,
  rotateVector,
} from "./common";
import { CusCanvas } from "./canvas";

export function renderShapes(
  canvas: HTMLCanvasElement,
  options: { bFill: boolean; bRandomColor: boolean }
) {
  let midPoint = { x: canvas.width / 2, y: canvas.height / 2 };
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("can't get ctx");
  }
  const cusCanvas = new CusCanvas({ ctx });

  const allShapes = gouguTreeShapes(
    new Rect(getRectCorners(midPoint, 100, 100))
  );
  const defaultColor = "#333";
  const interval = setInterval(() => {
    if (ctx.canvas.hidden) {
      return;
    }

    let firstOne = allShapes.shift();
    if (firstOne) {
      firstOne.set({
        strokeStyle: options.bRandomColor ? randomColor() : defaultColor,
      });

      if (options.bFill) {
        firstOne.set({
          fillStyle: options.bRandomColor ? randomColor() : defaultColor,
        });
      }

      cusCanvas.add(firstOne);
      cusCanvas.zoom(0.0003, midPoint);
      cusCanvas.render();
    } else {
      clearInterval(interval);
    }
  }, 1000 / 60);
  return interval;
}

export function gouguTreeShapes(rect: Rect) {
  let prevGeneratedShapes: Rect[] = [rect];
  const allShapes = [rect];
  const minRectSize = 8;

  while (prevGeneratedShapes.length > 0) {
    let newGeneratedShapes: Rect[] = [];

    prevGeneratedShapes.forEach((obj) => {
      if (obj.width() >= minRectSize && obj.height() >= minRectSize) {
        let shapes = getGouguShapes(obj);
        newGeneratedShapes.push(...shapes);
      }
    });

    allShapes.push(...newGeneratedShapes);
    prevGeneratedShapes = newGeneratedShapes;
  }

  return allShapes;
}

export function renderObjs(objs: Shape[], ctx: CanvasRenderingContext2D) {
  objs.forEach((obj) => obj.render(ctx));
}

export function getGouguShapes(rect: Rect): Rect[] {
  let { tl, tr } = rect;
  let seg = new LineSegment(tl, tr);
  let dis = seg.distance();
  let direction = seg.direction();
  const radian = Math.PI / 6;
  let rotateDir = rotateVector(direction, radian, false);
  let p3 = movePoint(tl, rotateDir, (dis / 2) * Math.sqrt(3));

  return [new LineSegment(tl, p3), new LineSegment(p3, tr)]
    .map((seg) => seg.getSquare(false))
    .map((item) => new Rect(item));
}
