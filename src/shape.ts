import { IPoint } from "./interface";
import { distanceA2B } from "./common";

export abstract class Shape {
  fillStyle?: string;
  strokeStyle?: string;

  abstract render(ctx: CanvasRenderingContext2D): boolean;
}

export class Polygon extends Shape {
  points: IPoint[];

  constructor(options: { points: IPoint[] }) {
    super();
    this.points = options.points;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    this.points.forEach((item, idx) => {
      if (idx === 0) {
        ctx.moveTo(item.x, item.y);
      } else {
        ctx.lineTo(item.x, item.y);
      }
    });

    ctx.strokeStyle = this.strokeStyle;
    ctx.closePath();
    ctx.stroke();
    if (this.fillStyle) {
      ctx.fillStyle = this.fillStyle;
      ctx.fill();
    }
    ctx.restore();
    return true;
  }
}

export class Rect extends Polygon {
  tl: IPoint;
  tr: IPoint;
  br: IPoint;
  bl: IPoint;

  constructor({
    tl,
    tr,
    br,
    bl,
    ...options
  }: {
    tl: IPoint;
    tr: IPoint;
    br: IPoint;
    bl: IPoint;
  }) {
    super({ points: [tl, tr, br, bl] });
    this.tl = tl;
    this.tr = tr;
    this.br = br;
    this.bl = bl;
  }

  width() {
    return distanceA2B(this.tl, this.tr);
  }

  height() {
    return distanceA2B(this.tl, this.bl);
  }

  set(options: { fillStyle?: string, strokeStyle?: string }) {
    this.fillStyle = options.fillStyle;
    this.strokeStyle = options.strokeStyle;
  }
}
