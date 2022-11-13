import { Shape } from "./shape";
import { IPoint, Matrix2D } from "./interface";
import {copyMatrix, getInitMatrix2d, invertTransform, transformPoint} from "./common";

export class CusCanvas {
  ctx: CanvasRenderingContext2D;
  shapes: Shape[];
  viewportMatrix: Matrix2D = getInitMatrix2d();

  constructor({ ctx }: { ctx: CanvasRenderingContext2D }) {
    this.ctx = ctx;
    this.shapes = [];
  }

  add(shape: Shape) {
    this.shapes.push(shape);
    this.render();
  }

  /**
   * @param zoom  positive value zoom in,  negative value zoom out
   */
  zoom(zoom: number, centerPoint: IPoint) {
    zoom = Math.max(zoom, -1);
    const mul = 1 + zoom;

    let vpt: Matrix2D = copyMatrix(this.viewportMatrix);
    let point = transformPoint(
      centerPoint,
      invertTransform(this.viewportMatrix)
    );
    vpt[0] *= mul;
    vpt[3] *= mul;
    let after = transformPoint(point, vpt);
    vpt[4] += centerPoint.x - after.x;
    vpt[5] += centerPoint.y - after.y;

    this.viewportMatrix = vpt;
  }

  render() {
    const ctx = this.ctx;
    ctx.save();
    ctx.transform(...this.viewportMatrix);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.shapes.forEach((shape) => shape.render(ctx));
    ctx.restore();
    return true;
  }
}
