import test from 'node:test';
import assert from 'node:assert/strict';
import {
  OBJECT_POOL,
  PLACEMENT_LOCATIONS,
  createDailyHiddenObjectState,
  selectDailyObjects,
} from '../dist-test/src/lib/hiddenObjectGame.js';

const uniqueIds = (items) => new Set(items.map(item => item.id));

test('defines a 40-object pool with unique ids', () => {
  assert.equal(OBJECT_POOL.length, 40);
  assert.equal(uniqueIds(OBJECT_POOL).size, 40);
});

test('defines 20 placement locations with unique ids', () => {
  assert.equal(PLACEMENT_LOCATIONS.length, 20);
  assert.equal(uniqueIds(PLACEMENT_LOCATIONS).size, 20);
});

test('selects 10 unique daily objects', () => {
  const selection = selectDailyObjects({ seed: 20250101 });
  assert.equal(selection.length, 10);
  assert.equal(uniqueIds(selection).size, 10);
});

test('produces reproducible selections with the same seed', () => {
  const first = selectDailyObjects({ seed: 20250102 });
  const second = selectDailyObjects({ seed: 20250102 });
  assert.deepEqual(
    first.map(item => item.id),
    second.map(item => item.id)
  );
});

test('creates daily placements without collisions', () => {
  const dailyState = createDailyHiddenObjectState({ seed: 20250103 });
  assert.equal(dailyState.dailyPlacements.length, 10);
  const locationIds = dailyState.dailyPlacements.map(item => item.location.id);
  assert.equal(new Set(locationIds).size, 10);
});
