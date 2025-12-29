export interface HiddenObjectDefinition {
  id: string;
  name: string;
  emoji: string;
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
  isTarget: boolean;
}

export interface DailyHiddenObjectState {
  objectPool: HiddenObjectDefinition[];
  targets: HiddenObjectDefinition[];
  decoys: HiddenObjectDefinition[];
  placementLocations: PlacementLocation[];
  placements: DailyObjectPlacement[];
}

export const OBJECT_POOL: HiddenObjectDefinition[] = [
  { id: 'object_butterfly', name: 'Butterfly', emoji: '🦋' },
  { id: 'object_watering_can', name: 'Watering Can', emoji: '🚿' },
  { id: 'object_bird', name: 'Bird', emoji: '🐦' },
  { id: 'object_ladybug', name: 'Ladybug', emoji: '🐞' },
  { id: 'object_garden_gloves', name: 'Garden Gloves', emoji: '🧤' },
  { id: 'object_snail', name: 'Snail', emoji: '🐌' },
  { id: 'object_dragonfly', name: 'Dragonfly', emoji: '🪰' },
  { id: 'object_garden_hat', name: 'Garden Hat', emoji: '👒' },
  { id: 'object_tea_cup', name: 'Tea Cup', emoji: '☕' },
  { id: 'object_teapot', name: 'Teapot', emoji: '🫖' },
  { id: 'object_book', name: 'Book', emoji: '📘' },
  { id: 'object_key', name: 'Key', emoji: '🗝️' },
  { id: 'object_ribbon', name: 'Ribbon', emoji: '🎀' },
  { id: 'object_lantern', name: 'Lantern', emoji: '🏮' },
  { id: 'object_mushroom', name: 'Mushroom', emoji: '🍄' },
  { id: 'object_leaf', name: 'Leaf', emoji: '🍃' },
  { id: 'object_acorn', name: 'Acorn', emoji: '🌰' },
  { id: 'object_shell', name: 'Shell', emoji: '🐚' },
  { id: 'object_feather', name: 'Feather', emoji: '🪶' },
  { id: 'object_honey', name: 'Honey Jar', emoji: '🍯' },
  { id: 'object_apple', name: 'Apple', emoji: '🍎' },
  { id: 'object_strawberry', name: 'Strawberry', emoji: '🍓' },
  { id: 'object_flower', name: 'Flower', emoji: '🌼' },
  { id: 'object_sunflower', name: 'Sunflower', emoji: '🌻' },
  { id: 'object_rose', name: 'Rose', emoji: '🌹' },
  { id: 'object_tulip', name: 'Tulip', emoji: '🌷' },
  { id: 'object_seed_packet', name: 'Seed Packet', emoji: '🌱' },
  { id: 'object_shears', name: 'Garden Shears', emoji: '✂️' },
  { id: 'object_basket', name: 'Basket', emoji: '🧺' },
  { id: 'object_blanket', name: 'Blanket', emoji: '🧣' },
  { id: 'object_stone', name: 'Smooth Stone', emoji: '🪨' },
  { id: 'object_bell', name: 'Bell', emoji: '🔔' },
  { id: 'object_owl', name: 'Owl', emoji: '🦉' },
  { id: 'object_sparkle', name: 'Sparkle', emoji: '✨' },
  { id: 'object_heart', name: 'Heart', emoji: '💛' },
];

// Positions are expressed as percentages relative to the image container.
// We keep more slots than we need so each day can randomize placements.
export const PLACEMENT_LOCATIONS: PlacementLocation[] = [
  // Top band
  { id: 'slot_1', x: 6, y: 8, width: 7, height: 8 },
  { id: 'slot_2', x: 16, y: 10, width: 7, height: 8 },
  { id: 'slot_3', x: 26, y: 9, width: 7, height: 8 },
  { id: 'slot_4', x: 36, y: 11, width: 7, height: 8 },
  { id: 'slot_5', x: 46, y: 10, width: 7, height: 8 },
  { id: 'slot_6', x: 56, y: 9, width: 7, height: 8 },
  { id: 'slot_7', x: 66, y: 10, width: 7, height: 8 },
  { id: 'slot_8', x: 78, y: 9, width: 7, height: 8 },

  // Upper-mid band
  { id: 'slot_9', x: 8, y: 22, width: 7, height: 8 },
  { id: 'slot_10', x: 18, y: 24, width: 7, height: 8 },
  { id: 'slot_11', x: 30, y: 22, width: 7, height: 8 },
  { id: 'slot_12', x: 42, y: 24, width: 7, height: 8 },
  { id: 'slot_13', x: 54, y: 22, width: 7, height: 8 },
  { id: 'slot_14', x: 66, y: 24, width: 7, height: 8 },
  { id: 'slot_15', x: 78, y: 22, width: 7, height: 8 },

  // Mid band (around bench/path)
  { id: 'slot_16', x: 10, y: 38, width: 7, height: 8 },
  { id: 'slot_17', x: 22, y: 40, width: 7, height: 8 },
  { id: 'slot_18', x: 34, y: 38, width: 7, height: 8 },
  { id: 'slot_19', x: 46, y: 40, width: 7, height: 8 },
  { id: 'slot_20', x: 58, y: 38, width: 7, height: 8 },
  { id: 'slot_21', x: 70, y: 40, width: 7, height: 8 },
  { id: 'slot_22', x: 82, y: 38, width: 7, height: 8 },

  // Lower-mid band
  { id: 'slot_23', x: 8, y: 54, width: 7, height: 8 },
  { id: 'slot_24', x: 20, y: 56, width: 7, height: 8 },
  { id: 'slot_25', x: 32, y: 54, width: 7, height: 8 },
  { id: 'slot_26', x: 44, y: 56, width: 7, height: 8 },
  { id: 'slot_27', x: 56, y: 54, width: 7, height: 8 },
  { id: 'slot_28', x: 68, y: 56, width: 7, height: 8 },
  { id: 'slot_29', x: 80, y: 54, width: 7, height: 8 },

  // Bottom band
  { id: 'slot_30', x: 12, y: 70, width: 7, height: 8 },
  { id: 'slot_31', x: 24, y: 72, width: 7, height: 8 },
  { id: 'slot_32', x: 36, y: 70, width: 7, height: 8 },
  { id: 'slot_33', x: 48, y: 72, width: 7, height: 8 },
  { id: 'slot_34', x: 60, y: 70, width: 7, height: 8 },
  { id: 'slot_35', x: 72, y: 72, width: 7, height: 8 },
  { id: 'slot_36', x: 84, y: 70, width: 7, height: 8 },
];

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

export const createDailyHiddenObjectState = ({
  seed,
  targetsCount = 8,
  decoyCount = 20,
}: {
  seed: number;
  targetsCount?: number;
  decoyCount?: number;
}): DailyHiddenObjectState => {
  const rngTargets = mulberry32(seed);
  const targets = shuffleWithRng(OBJECT_POOL, rngTargets).slice(0, targetsCount);

  const targetIds = new Set(targets.map(t => t.id));
  const remaining = OBJECT_POOL.filter(item => !targetIds.has(item.id));
  const decoys = shuffleWithRng(remaining, mulberry32(seed + 999)).slice(0, decoyCount);

  const totalCount = targets.length + decoys.length;
  const locations = shuffleWithRng(PLACEMENT_LOCATIONS, mulberry32(seed + 17)).slice(0, totalCount);

  const all = shuffleWithRng(
    [
      ...targets.map(object => ({ object, isTarget: true })),
      ...decoys.map(object => ({ object, isTarget: false })),
    ],
    mulberry32(seed + 33)
  );

  const placements: DailyObjectPlacement[] = all.map((entry, index) => ({
    object: entry.object,
    isTarget: entry.isTarget,
    location: locations[index],
  }));

  return {
    objectPool: OBJECT_POOL,
    targets,
    decoys,
    placementLocations: PLACEMENT_LOCATIONS,
    placements,
  };
};
