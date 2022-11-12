import { IPoint } from "./interface";

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
    y: point.y + unit.y * distance
  }
}

export function distanceA2B(a: IPoint, b:IPoint) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
