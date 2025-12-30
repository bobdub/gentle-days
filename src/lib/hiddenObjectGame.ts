/**
 * Hidden Object Game Logic
 * 
 * The game works by defining clickable regions over ACTUAL objects visible in the image.
 * Each day, a random subset of these objects becomes the "targets" to find.
 * The rest remain in the scene but clicking them does nothing.
 */

export interface HiddenObject {
  id: string;
  name: string;
  /** Hitbox as percentage of image dimensions */
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DailyGameState {
  /** All objects in the scene */
  allObjects: HiddenObject[];
  /** The subset of objects the player must find today */
  targets: HiddenObject[];
}

/**
 * These are the ACTUAL objects visible in the green_park.webp image.
 * Coordinates are percentages relative to image width/height.
 * Carefully mapped to match the illustration.
 */
export const SCENE_OBJECTS: HiddenObject[] = [
  // Objects on/near the bench and side table
  { id: 'teacup', name: 'Teacup', x: 5.5, y: 50, width: 8, height: 10 },
  { id: 'blue_book', name: 'Blue Book', x: 11, y: 54, width: 7, height: 7 },
  { id: 'straw_hat', name: 'Straw Hat', x: 16, y: 47, width: 12, height: 12 },
  { id: 'blue_blanket', name: 'Blue Blanket', x: 33, y: 42, width: 18, height: 16 },
  
  // Objects on the ground near bench
  { id: 'plant_basket', name: 'Plant Basket', x: 38, y: 62, width: 10, height: 12 },
  { id: 'bell', name: 'Bell', x: 30, y: 62, width: 5, height: 7 },
  
  // Objects on the path / right side
  { id: 'watering_can', name: 'Watering Can', x: 60, y: 58, width: 12, height: 14 },
  { id: 'picnic_basket', name: 'Picnic Basket', x: 72, y: 60, width: 10, height: 12 },
  
  // Garden trellis in background
  { id: 'garden_trellis', name: 'Garden Trellis', x: 68, y: 18, width: 10, height: 22 },
  
  // Flowers and plants
  { id: 'yellow_flowers', name: 'Yellow Flowers', x: 75, y: 82, width: 18, height: 14 },
  { id: 'pink_flowers_left', name: 'Pink Clover', x: 2, y: 72, width: 12, height: 14 },
  { id: 'bushes_right', name: 'Green Bushes', x: 82, y: 45, width: 14, height: 15 },
  
  // Trees
  { id: 'left_tree', name: 'Oak Tree', x: 0, y: 5, width: 20, height: 50 },
  { id: 'right_tree', name: 'Birch Tree', x: 82, y: 5, width: 18, height: 45 },
  
  // Path elements
  { id: 'stone_path', name: 'Stone Path', x: 35, y: 75, width: 25, height: 20 },
  
  // Wooden bench
  { id: 'wooden_bench', name: 'Wooden Bench', x: 18, y: 35, width: 35, height: 28 },
  
  // Small side table
  { id: 'side_table', name: 'Side Table', x: 5, y: 52, width: 15, height: 14 },
  
  // Background elements
  { id: 'distant_trees', name: 'Distant Trees', x: 35, y: 8, width: 30, height: 20 },
  { id: 'sky', name: 'Misty Sky', x: 25, y: 0, width: 50, height: 12 },
];

/**
 * Seeded random number generator (mulberry32)
 */
const mulberry32 = (seed: number) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

/**
 * Shuffle array with seeded RNG
 */
const shuffleWithRng = <T,>(items: T[], rng: () => number): T[] => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Create daily game state with randomized targets.
 * Each day gets a different seed, so different objects are targets.
 */
export const createDailyGameState = (dayNumber: number, targetCount = 5): DailyGameState => {
  // Create a unique seed for each day
  const seed = 20250000 + dayNumber * 7919; // Prime multiplier for better distribution
  const rng = mulberry32(seed);
  
  // Shuffle all objects and pick the first N as targets
  const shuffled = shuffleWithRng(SCENE_OBJECTS, rng);
  const targets = shuffled.slice(0, Math.min(targetCount, SCENE_OBJECTS.length));
  
  return {
    allObjects: SCENE_OBJECTS,
    targets,
  };
};
