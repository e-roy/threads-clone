// lib/three-utils.ts
const MIN_RADIUS = 2;
const MAX_RADIUS = 15;
const DEPTH = 3;
const LEFT_COLOR = "f79A00";
const RIGHT_COLOR = "fd12d1";
const NUM_POINTS = 4000;
const SWIRL_FACTOR = 0.1; // Determines how much 'swirl' the galaxy has

let maxRadius = 10;
let spiralFactor = maxRadius / (2 * Math.PI);
let points: [number, number][] = [];

for (let i = 0; i < NUM_POINTS; ++i) {
  let fraction = i / NUM_POINTS;
  let angle = 2 * Math.PI * fraction * 2.75; // The factor of 10 controls the number of spiral loops
  let radius = fraction * spiralFactor * 11; // The factor of 10 ensures the spiral reaches to the edge of the plot
  let x = radius * Math.cos(angle);
  let y = radius * Math.sin(angle);
  points.push([x, y]);
}
const randomFromInterval = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

const randomNumberVariant = (): number => {
  return Math.random() * 3 - 0.2;
};

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
  const randomRadius = randomFromInterval(MIN_RADIUS, MAX_RADIUS);
  const randomAngle = i * SWIRL_FACTOR; // Adjust the angle calculation
  const totalDepth = DEPTH - 2;

  const x = points[i]
    ? points[i][0] + randomNumberVariant()
    : randomRadius * Math.cos(randomAngle);
  const y = points[i]
    ? points[i][1] + randomNumberVariant()
    : randomRadius * Math.sin(randomAngle);
  const z = randomFromInterval(-totalDepth, totalDepth);

  const color = calculateColor(x, y);

  return {
    idx: i,
    position: [x, y, z],
    color,
  };
});

export const pointsOuter: Point[] = Array.from(
  { length: NUM_POINTS / 8 },
  (_, k) => k + 1
).map((i): Point => {
  const randomeRadius = randomFromInterval(MIN_RADIUS / 2, MAX_RADIUS * 3);
  const randomAngle = Math.random() * 2 * Math.PI;

  const x = Math.cos(randomAngle) * randomeRadius;
  const y = Math.sin(randomAngle) * randomeRadius;
  const z = randomFromInterval(-DEPTH * 5, DEPTH * 5);

  const color = calculateColor(x, y);

  return {
    idx: i,
    position: [x, y, z],
    color,
  };
});
