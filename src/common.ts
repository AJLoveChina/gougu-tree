import { IPoint, Matrix2D } from "./interface";

export function getRectCorners(
  midPoint: IPoint,
  width: number,
  height: number
) {
  let [tl, tr, br, bl] = [
    translatePoint(midPoint, { x: -width / 2, y: -height / 2 }),
    translatePoint(midPoint, { x: width / 2, y: -height / 2 }),
    translatePoint(midPoint, { x: width / 2, y: height / 2 }),
    translatePoint(midPoint, { x: -width / 2, y: height / 2 }),
  ];
  return {
    points: [tl, tr, br, bl],
    tl,
    tr,
    br,
    bl,
  };
}

export function translatePoint(p: IPoint, offset: IPoint) {
  return {
    x: p.x + offset.x,
    y: p.y + offset.y,
  };
}

export function movePoint(point: IPoint, vec: IPoint, distance: number) {
  let mod = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
  let unit = { x: vec.x / mod, y: vec.y / mod };
  return {
    x: point.x + unit.x * distance,
    y: point.y + unit.y * distance,
  };
}

export function distanceA2B(a: IPoint, b: IPoint) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export class LineSegment {
  start: IPoint;
  end: IPoint;

  constructor(start: IPoint, end: IPoint) {
    this.start = start;
    this.end = end;
  }

  direction() {
    return {
      x: this.end.x - this.start.x,
      y: this.end.y - this.start.y,
    };
  }

  distance() {
    return distanceA2B(this.start, this.end);
  }

  getSquare(clockWise: boolean) {
    const direction = this.direction();
    let normalDirection = rotateVector(direction, Math.PI / 2, clockWise);
    const dis = this.distance();
    const p1 = movePoint(this.start, normalDirection, dis);
    const p2 = movePoint(this.end, normalDirection, dis);
    let points: [IPoint, IPoint, IPoint, IPoint];
    if (clockWise) {
      points = [this.start, this.end, p2, p1];
    } else {
      points = [p1, p2, this.end, this.start];
    }
    let [tl, tr, br, bl] = points;
    return {
      tl,
      tr,
      br,
      bl,
    };
  }
}

export function rotateVector(
  vector: IPoint,
  radian: number,
  clockwise: boolean
) {
  let newRadian = radian % (Math.PI * 2);
  if (!clockwise) {
    newRadian = Math.PI * 2 - newRadian;
  }
  const cs = Math.cos(newRadian);
  const sn = Math.sin(newRadian);
  const x = vector.x;
  const y = vector.y;
  return {
    x: x * cs - y * sn,
    y: x * sn + y * cs,
  };
}

export function random(start: number, end: number) {
  const min = Math.min(start, end);
  const max = Math.max(start, end);
  if (min === max) {
    return min;
  }
  return min + Math.random() * (max - min);
}

export function randomColor() {
  return `rgba(${Math.floor(random(0, 255))}, ${Math.floor(
    random(0, 255)
  )}, ${Math.floor(random(0, 255))}, ${random(0.5, 1)})`;
}

export function getInitMatrix2d(): Matrix2D {
  return [1, 0, 0, 1, 0, 0];
}

/**
 * Multiply matrix A by matrix B to nest transformations
 */
export function multiplyTransformMatrices(a: Matrix2D, b: Matrix2D): Matrix2D {
  // Matrix multiply a * b
  return [
    a[0] * b[0] + a[2] * b[1],
    a[1] * b[0] + a[3] * b[1],
    a[0] * b[2] + a[2] * b[3],
    a[1] * b[2] + a[3] * b[3],
    a[0] * b[4] + a[2] * b[5] + a[4],
    a[1] * b[4] + a[3] * b[5] + a[5],
  ];
}

/**
 * Apply transform t to point p
 */
export function transformPoint(p: IPoint, t: Matrix2D) {
  return {
    x: t[0] * p.x + t[2] * p.y + t[4],
    y: t[1] * p.x + t[3] * p.y + t[5],
  };
}

/**
 * Invert transformation t
 */
export function invertTransform(t: Matrix2D): Matrix2D {
  let a = 1 / (t[0] * t[3] - t[1] * t[2]),
    r: Matrix2D = [a * t[3], -a * t[1], -a * t[2], a * t[0], 0, 0],
    o = transformPoint({ x: t[4], y: t[5] }, r);
  r[4] = -o.x;
  r[5] = -o.y;
  return r;
}

export function copyMatrix(matrix: Matrix2D): Matrix2D {
  return [...matrix];
}
