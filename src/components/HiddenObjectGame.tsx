import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Check, ArrowLeft, Sparkles } from 'lucide-react';
import greenParkImage from '@/assets/green_park.webp';

// Hidden objects positioned precisely on the actual objects in the image
// Coordinates are percentages from top-left of the image
const GARDEN_OBJECTS = [
  { id: 'teacup', name: 'Teacup', emoji: '☕', x: 7, y: 53, width: 7, height: 12 },
  { id: 'book', name: 'Book', emoji: '📘', x: 12, y: 56, width: 7, height: 10 },
  { id: 'hat', name: 'Hat', emoji: '👒', x: 17, y: 44, width: 15, height: 14 },
  { id: 'blanket', name: 'Blanket', emoji: '🧣', x: 33, y: 38, width: 18, height: 22 },
  { id: 'plantbasket', name: 'Basket', emoji: '🧺', x: 44, y: 58, width: 12, height: 16 },
  { id: 'wateringcan', name: 'Watering Can', emoji: '🚿', x: 57, y: 52, width: 14, height: 24 },
  { id: 'picnicbasket', name: 'Picnic Basket', emoji: '🧺', x: 69, y: 60, width: 14, height: 18 },
  { id: 'trellis', name: 'Trellis', emoji: '🪴', x: 64, y: 10, width: 18, height: 35 },
];

interface HiddenObjectGameProps {
  dayNumber: number;
  onComplete: () => void;
  onBack: () => void;
}

export const HiddenObjectGame: React.FC<HiddenObjectGameProps> = ({
  dayNumber,
  onComplete,
  onBack,
}) => {
  const [foundObjects, setFoundObjects] = useState<string[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [lastFound, setLastFound] = useState<string | null>(null);

  const handleObjectClick = (objectId: string) => {
    if (!foundObjects.includes(objectId)) {
      setFoundObjects([...foundObjects, objectId]);
      setLastFound(objectId);
      setTimeout(() => setLastFound(null), 1500);
    }
  };

  const isComplete = foundObjects.length === GARDEN_OBJECTS.length;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="text-center max-w-md animate-gentle-fade">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-sage/20 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-sage" />
          </div>
          <h2 className="font-display text-3xl text-foreground mb-4">
            Wonderful!
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            You found all the hidden treasures in today's garden scene. 
            Take a moment to enjoy this peaceful view.
          </p>
          <div className="space-y-3">
            <Button variant="calm" size="lg" onClick={onComplete} className="w-full">
              <Check className="w-5 h-5 mr-2" />
              Complete Today's Activity
            </Button>
            <Button variant="ghost" onClick={onBack} className="w-full text-muted-foreground">
              Return to Calendar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="text-muted-foreground">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Day {dayNumber}</p>
            <h1 className="font-display text-xl text-foreground">Find the Hidden Objects</h1>
          </div>
          <Button
            variant="ghost"
            onClick={() => setShowHints(!showHints)}
            className="text-muted-foreground"
          >
            {showHints ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
        </div>

        {/* Game Area */}
        <div className="relative rounded-3xl overflow-hidden shadow-card mb-6">
          <img 
            src={greenParkImage} 
            alt="A peaceful garden park scene with a wooden bench, flowers, and greenery"
            className="w-full h-auto block"
          />
          
          {/* Clickable hitboxes positioned directly over objects */}
          {GARDEN_OBJECTS.map((obj) => (
            <button
              key={obj.id}
              onClick={() => handleObjectClick(obj.id)}
              className={`absolute border-2 transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 ${
                foundObjects.includes(obj.id)
                  ? 'bg-sage/50 border-sage'
                  : showHints
                  ? 'bg-amber/30 border-amber/70 hover:bg-amber/50'
                  : 'border-transparent hover:bg-cream/30 hover:border-cream/50'
              }`}
              style={{
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                width: `${obj.width}%`,
                height: `${obj.height}%`,
              }}
              disabled={foundObjects.includes(obj.id)}
              aria-label={`Find ${obj.name}`}
            >
              {foundObjects.includes(obj.id) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              )}
            </button>
          ))}

          {/* Found notification */}
          {lastFound && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-cream/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-soft animate-gentle-fade">
              <p className="text-sage font-medium flex items-center gap-2">
                <Check className="w-5 h-5" />
                Found: {GARDEN_OBJECTS.find(o => o.id === lastFound)?.name}
              </p>
            </div>
          )}
        </div>

        {/* Objects to find - Visual list with emojis */}
        <div className="bg-cream-dark/50 rounded-2xl p-6">
          <h3 className="font-display text-lg text-foreground mb-4 text-center">
            Find these objects ({foundObjects.length}/{GARDEN_OBJECTS.length})
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 justify-items-center">
            {GARDEN_OBJECTS.map((obj) => (
              <div
                key={obj.id}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  foundObjects.includes(obj.id)
                    ? 'bg-sage/20 opacity-50'
                    : 'bg-cream'
                }`}
              >
                <span className="text-3xl" role="img" aria-label={obj.name}>
                  {obj.emoji}
                </span>
                <span className={`text-xs font-medium text-center ${
                  foundObjects.includes(obj.id) ? 'line-through text-muted-foreground' : 'text-foreground'
                }`}>
                  {obj.name}
                </span>
                {foundObjects.includes(obj.id) && (
                  <Check className="w-4 h-4 text-sage" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hint toggle info */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          {showHints ? 'Hints showing • Tap eye to hide' : 'Need help? Tap the eye icon for hints'}
        </p>
      </div>
    </div>
  );
};
