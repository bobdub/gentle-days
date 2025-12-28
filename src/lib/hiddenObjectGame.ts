export interface HiddenObjectDefinition {
  id: string;
  name: string;
}

export interface PlacementLocation {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DailyObjectPlacement {
  object: HiddenObjectDefinition;
  location: PlacementLocation;
}

export interface DailyHiddenObjectState {
  objectPool: HiddenObjectDefinition[];
  dailyObjects: HiddenObjectDefinition[];
  placementLocations: PlacementLocation[];
  dailyPlacements: DailyObjectPlacement[];
}

export const OBJECT_POOL: HiddenObjectDefinition[] = [
  { id: 'object_butterfly', name: 'Butterfly' },
  { id: 'object_watering_can', name: 'Watering Can' },
  { id: 'object_bird', name: 'Bird' },
  { id: 'object_ladybug', name: 'Ladybug' },
  { id: 'object_garden_gloves', name: 'Garden Gloves' },
  { id: 'object_snail', name: 'Snail' },
  { id: 'object_dragonfly', name: 'Dragonfly' },
  { id: 'object_garden_hat', name: 'Garden Hat' },
  { id: 'object_tea_cup', name: 'Tea Cup' },
  { id: 'object_rose', name: 'Rose' },
  { id: 'object_sunflower', name: 'Sunflower' },
  { id: 'object_lantern', name: 'Lantern' },
  { id: 'object_hummingbird', name: 'Hummingbird' },
  { id: 'object_mushroom', name: 'Mushroom' },
  { id: 'object_picnic_basket', name: 'Picnic Basket' },
  { id: 'object_garden_key', name: 'Garden Key' },
  { id: 'object_bluebird', name: 'Bluebird' },
  { id: 'object_feather', name: 'Feather' },
  { id: 'object_stone', name: 'Smooth Stone' },
  { id: 'object_tulip', name: 'Tulip' },
  { id: 'object_apple', name: 'Apple' },
  { id: 'object_honey_jar', name: 'Honey Jar' },
  { id: 'object_ribbon', name: 'Ribbon' },
  { id: 'object_lilypad', name: 'Lily Pad' },
  { id: 'object_water_drop', name: 'Dew Drop' },
  { id: 'object_acorn', name: 'Acorn' },
  { id: 'object_garden_shears', name: 'Garden Shears' },
  { id: 'object_butterfly_net', name: 'Butterfly Net' },
  { id: 'object_leaf', name: 'Leaf' },
  { id: 'object_wind_chime', name: 'Wind Chime' },
  { id: 'object_garden_book', name: 'Garden Book' },
  { id: 'object_owl', name: 'Owl' },
  { id: 'object_teapot', name: 'Teapot' },
  { id: 'object_seed_packet', name: 'Seed Packet' },
  { id: 'object_strawberry', name: 'Strawberry' },
  { id: 'object_fern', name: 'Fern' },
  { id: 'object_shell', name: 'Shell' },
  { id: 'object_bell', name: 'Bell' },
  { id: 'object_pebble_stack', name: 'Pebble Stack' },
  { id: 'object_sparrow', name: 'Sparrow' },
];

export const PLACEMENT_LOCATIONS: PlacementLocation[] = [
  { id: 'slot_1', x: 8, y: 14, width: 7, height: 7 },
  { id: 'slot_2', x: 18, y: 24, width: 9, height: 8 },
  { id: 'slot_3', x: 30, y: 16, width: 7, height: 6 },
  { id: 'slot_4', x: 42, y: 22, width: 6, height: 7 },
  { id: 'slot_5', x: 56, y: 12, width: 8, height: 7 },
  { id: 'slot_6', x: 68, y: 22, width: 8, height: 8 },
  { id: 'slot_7', x: 80, y: 18, width: 7, height: 7 },
  { id: 'slot_8', x: 10, y: 38, width: 8, height: 7 },
  { id: 'slot_9', x: 24, y: 44, width: 9, height: 8 },
  { id: 'slot_10', x: 38, y: 38, width: 7, height: 8 },
  { id: 'slot_11', x: 52, y: 42, width: 8, height: 7 },
  { id: 'slot_12', x: 66, y: 40, width: 9, height: 8 },
  { id: 'slot_13', x: 80, y: 44, width: 7, height: 7 },
  { id: 'slot_14', x: 14, y: 64, width: 9, height: 9 },
  { id: 'slot_15', x: 28, y: 70, width: 8, height: 8 },
  { id: 'slot_16', x: 42, y: 68, width: 9, height: 9 },
  { id: 'slot_17', x: 56, y: 72, width: 8, height: 8 },
  { id: 'slot_18', x: 70, y: 68, width: 9, height: 9 },
  { id: 'slot_19', x: 82, y: 64, width: 7, height: 7 },
  { id: 'slot_20', x: 36, y: 82, width: 10, height: 8 },
];

const MAX_AVOIDANCE_ATTEMPTS = 5;

const mulberry32 = (seed: number) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const shuffleWithRng = <T,>(items: T[], rng: () => number): T[] => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const areSelectionsEqual = (a: HiddenObjectDefinition[], b: HiddenObjectDefinition[]) => {
  if (a.length !== b.length) {
    return false;
  }
  const aIds = new Set(a.map(item => item.id));
  return b.every(item => aIds.has(item.id));
};

export const dateToSeed = (date: Date) => {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return Number(utcDate.toISOString().slice(0, 10).replace(/-/g, ''));
};

export const selectDailyObjects = ({
  seed,
  previousSelection,
}: {
  seed: number;
  previousSelection?: HiddenObjectDefinition[];
}) => {
  let attemptSeed = seed;
  let selection = shuffleWithRng(OBJECT_POOL, mulberry32(attemptSeed)).slice(0, 10);

  if (previousSelection) {
    let attempts = 0;
    while (areSelectionsEqual(selection, previousSelection) && attempts < MAX_AVOIDANCE_ATTEMPTS) {
      attemptSeed += 1;
      selection = shuffleWithRng(OBJECT_POOL, mulberry32(attemptSeed)).slice(0, 10);
      attempts += 1;
    }
  }

  return selection;
};

export const selectPlacementLocations = ({
  seed,
  count,
}: {
  seed: number;
  count: number;
}) => {
  return shuffleWithRng(PLACEMENT_LOCATIONS, mulberry32(seed)).slice(0, count);
};

export const createDailyHiddenObjectState = ({
  seed,
  previousSelection,
}: {
  seed: number;
  previousSelection?: HiddenObjectDefinition[];
}): DailyHiddenObjectState => {
  const dailyObjects = selectDailyObjects({ seed, previousSelection });
  const dailyLocations = selectPlacementLocations({ seed: seed + 17, count: dailyObjects.length });
  const dailyPlacements = dailyObjects.map((object, index) => ({
    object,
    location: dailyLocations[index],
  }));

  return {
    objectPool: OBJECT_POOL,
    dailyObjects,
    placementLocations: PLACEMENT_LOCATIONS,
    dailyPlacements,
  };
};
