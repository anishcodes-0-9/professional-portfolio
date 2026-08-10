/* eslint-env jest */
import {
  wrapIndex,
  getCycleCount,
  getTotalSteps,
  getPinHeightVh,
  progressToVirtualPosition,
  virtualPositionToActiveIndex,
  shortestSignedDistance,
  distanceToScale,
  distanceToOpacity,
  distanceToContentOpacity,
  getBufferRadius,
} from './carouselMath';

describe('wrapIndex', () => {
  test('wraps negative indices into range', () => {
    expect(wrapIndex(-1, 8)).toBe(7);
    expect(wrapIndex(-9, 8)).toBe(7);
  });

  test('wraps indices beyond count', () => {
    expect(wrapIndex(8, 8)).toBe(0);
    expect(wrapIndex(15, 8)).toBe(7);
    expect(wrapIndex(16, 8)).toBe(0);
  });

  test('returns 0 for a zero or negative count instead of dividing by zero', () => {
    expect(wrapIndex(3, 0)).toBe(0);
    expect(wrapIndex(3, -2)).toBe(0);
  });
});

describe('getCycleCount', () => {
  test('resolves to 2 cycles for the current 8-project set', () => {
    expect(getCycleCount(8)).toBe(2);
  });

  test('clamps to the maximum for small project counts', () => {
    expect(getCycleCount(4)).toBe(3);
    expect(getCycleCount(1)).toBe(3);
  });

  test('clamps to the minimum for large project counts', () => {
    expect(getCycleCount(20)).toBe(2);
  });

  test('returns 0 for zero projects', () => {
    expect(getCycleCount(0)).toBe(0);
  });
});

describe('getTotalSteps / getPinHeightVh', () => {
  test('computes total steps as count * cycles', () => {
    expect(getTotalSteps(8, 2)).toBe(16);
  });

  test('matches the approved ~644vh pin height at 8 projects / 2 cycles', () => {
    expect(getPinHeightVh(8, 2)).toBe(644);
  });
});

describe('progressToVirtualPosition', () => {
  test('clamps progress below 0 and above 1', () => {
    expect(progressToVirtualPosition(-1, 16)).toBe(0);
    expect(progressToVirtualPosition(2, 16)).toBe(16);
  });

  test('scales linearly with progress', () => {
    expect(progressToVirtualPosition(0.5, 16)).toBe(8);
  });
});

describe('virtualPositionToActiveIndex', () => {
  test('resolves within the first lap', () => {
    expect(virtualPositionToActiveIndex(0, 8)).toBe(0);
    expect(virtualPositionToActiveIndex(7, 8)).toBe(7);
  });

  test('wraps at the end of a lap back to the first project', () => {
    expect(virtualPositionToActiveIndex(8, 8)).toBe(0);
  });

  test('resolves correctly deep into a second cycle', () => {
    expect(virtualPositionToActiveIndex(15, 8)).toBe(7);
    expect(virtualPositionToActiveIndex(16, 8)).toBe(0);
  });
});

describe('shortestSignedDistance', () => {
  test('is zero at the project\'s own position', () => {
    expect(shortestSignedDistance(3, 3, 8)).toBe(0);
  });

  test('treats the two ends of the sequence as ring neighbors', () => {
    // Project 0 should read as a near neighbor from deep in a second lap,
    // not as a far distance equal to the raw difference.
    const distance = shortestSignedDistance(0, 15.6, 8);
    expect(Math.abs(distance)).toBeCloseTo(0.4, 5);
  });

  test('a single project is always its own center', () => {
    expect(shortestSignedDistance(0, 5, 1)).toBe(0);
    expect(shortestSignedDistance(0, 0, 1)).toBe(0);
  });

  test('two projects are always exactly opposite each other', () => {
    expect(Math.abs(shortestSignedDistance(0, 1, 2))).toBe(1);
  });

  test('returns 0 for a zero-count set instead of dividing by zero', () => {
    expect(shortestSignedDistance(0, 3, 0)).toBe(0);
  });
});

describe('distanceToScale / distanceToOpacity', () => {
  test('are at their maximum at zero distance', () => {
    expect(distanceToScale(0)).toBe(1);
    expect(distanceToOpacity(0)).toBe(1);
  });

  test('clamp to their minimum beyond the falloff radius', () => {
    expect(distanceToScale(1.6)).toBeCloseTo(0.72, 5);
    expect(distanceToScale(5)).toBeCloseTo(0.72, 5);
    expect(distanceToOpacity(1.6)).toBeCloseTo(0.22, 5);
    expect(distanceToOpacity(5)).toBeCloseTo(0.22, 5);
  });

  test('interpolate monotonically between the two bounds', () => {
    const near = distanceToScale(0.4);
    const far = distanceToScale(1.2);
    expect(near).toBeGreaterThan(far);
    expect(far).toBeGreaterThan(distanceToScale(1.6));
  });
});

describe('getBufferRadius', () => {
  test('resolves to a small fixed radius for the default falloff', () => {
    expect(getBufferRadius()).toBe(3);
  });
});

describe('distanceToContentOpacity', () => {
  test('is fully opaque at zero distance', () => {
    expect(distanceToContentOpacity(0)).toBe(1);
  });

  test('is fully transparent at and beyond a full step away (the resting neighbor slot)', () => {
    expect(distanceToContentOpacity(1)).toBe(0);
    expect(distanceToContentOpacity(3)).toBe(0);
  });

  test('holds most of its strength through the middle of a turn', () => {
    expect(distanceToContentOpacity(0.15)).toBeGreaterThan(0.8);
    expect(distanceToContentOpacity(0.4)).toBeGreaterThan(0.7);
  });

  test('crosses roughly the midpoint right at the dominance handoff boundary', () => {
    const atHandoff = distanceToContentOpacity(0.5);
    expect(atHandoff).toBeGreaterThan(0.3);
    expect(atHandoff).toBeLessThan(0.7);
  });

  test('is symmetric for positive and negative distances', () => {
    expect(distanceToContentOpacity(0.3)).toBeCloseTo(distanceToContentOpacity(-0.3), 5);
  });
});
