import {IPoint} from "./interface";

export abstract class Shape {
  abstract render(ctx: CanvasRenderingContext2D): boolean;
}

export class Polygon extends Shape {
  points: IPoint[];
  strokeStyle: string;

  constructor(options: { points: IPoint[] }) {
    super();
    this.points = options.points;
    this.strokeStyle = "#000";
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
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
    ctx.save();
    return true;
  }
}

export class Rect extends Polygon {
  tl: IPoint;
  tr: IPoint;
  br: IPoint;
  bl: IPoint;

  constructor({tl, tr, br, bl}: { tl: IPoint, tr: IPoint, br: IPoint, bl: IPoint }) {
    super({points: [tl, tr, br, bl]});
    this.tl = tl;
    this.tr = tr;
    this.br = br;
    this.bl = bl;
  }
}