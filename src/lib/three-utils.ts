// lib/three-utils.ts
const MIN_RADIUS = 7.5;
const MAX_RADIUS = 15;
const DEPTH = 2;
const LEFT_COLOR = "f79A00";
const RIGHT_COLOR = "fd12d1";
const NUM_POINTS = 2000;

const randomFromInterval = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

const getGradientStop = (ratio: number): string => {
  ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;

  const c0 =
    LEFT_COLOR.match(/.{1,2}/g)?.map((c) => parseInt(c, 16) * (1 - ratio)) ??
    [];

  const c1 =
    RIGHT_COLOR.match(/.{1,2}/g)?.map((c) => parseInt(c, 16) * ratio) ?? [];

  const ci = [0, 1, 2].map((i) =>
    Math.min(Math.round((c0[i] ?? 0) + (c1[i] ?? 0)), 255)
  );

  const color = ci
    .reduce((a, v) => (a << 8) + v, 0)
    .toString(16)
    .padStart(6, "0");

  return `#${color}`;
};

const calculateColor = (x: number, y: number): string => {
  const maxDiff = MAX_RADIUS * 2;
  const distance = y + MAX_RADIUS;

  const ratio = distance / maxDiff;

  const stop = getGradientStop(ratio);
  return stop;
};

interface Point {
  idx: number;
  position: [number, number, number];
  color: string;
}

export const pointsInner: Point[] = Array.from(
  { length: NUM_POINTS },
  (_, k) => k + 1
).map((i): Point => {
  const randomeRadius = randomFromInterval(MIN_RADIUS, MAX_RADIUS);
  const randomAngle = Math.random() * 2 * Math.PI;

  const x = Math.cos(randomAngle) * randomeRadius;
  const y = Math.sin(randomAngle) * randomeRadius;
  const z = randomFromInterval(-DEPTH, DEPTH);

  const color = calculateColor(x, y);

  return {
    idx: i,
    position: [x, y, z],
    color,
  };
});

export const pointsOuter: Point[] = Array.from(
  { length: NUM_POINTS / 4 },
  (_, k) => k + 1
).map((i): Point => {
  const randomeRadius = randomFromInterval(MIN_RADIUS / 2, MAX_RADIUS * 3);
  const randomAngle = Math.random() * 2 * Math.PI;

  const x = Math.cos(randomAngle) * randomeRadius;
  const y = Math.sin(randomAngle) * randomeRadius;
  const z = randomFromInterval(-DEPTH * 10, DEPTH * 10);

  const color = calculateColor(x, y);

  return {
    idx: i,
    position: [x, y, z],
    color,
  };
});
