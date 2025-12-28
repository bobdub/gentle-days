import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Check, ArrowLeft, Sparkles } from 'lucide-react';
import greenParkImage from '@/assets/green_park.webp';

// Hidden objects that exist in the garden park scene
const GARDEN_OBJECTS = [
  { id: 'teacup', name: 'Teacup', x: 8, y: 58, width: 6, height: 8 },
  { id: 'book', name: 'Blue Book', x: 10, y: 62, width: 5, height: 6 },
  { id: 'hat', name: 'Straw Hat', x: 18, y: 52, width: 10, height: 8 },
  { id: 'blanket', name: 'Blue Blanket', x: 32, y: 48, width: 12, height: 10 },
  { id: 'basket', name: 'Plant Basket', x: 42, y: 68, width: 8, height: 8 },
  { id: 'wateringcan', name: 'Watering Can', x: 62, y: 65, width: 10, height: 12 },
  { id: 'picnicbasket', name: 'Picnic Basket', x: 72, y: 70, width: 10, height: 10 },
  { id: 'trellis', name: 'Garden Trellis', x: 72, y: 22, width: 12, height: 18 },
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
        <div className="relative rounded-3xl overflow-hidden shadow-card mb-6 bg-sage-light/20 aspect-[3/2]">
          <img 
            src={greenParkImage} 
            alt="A peaceful garden park scene with a wooden bench, flowers, and greenery"
            className="w-full h-full object-cover"
          />
          
          {/* Clickable areas for hidden objects */}
          {GARDEN_OBJECTS.map((obj) => (
            <button
              key={obj.id}
              onClick={() => handleObjectClick(obj.id)}
              className={`absolute transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 ${
                foundObjects.includes(obj.id)
                  ? 'bg-sage/40 ring-2 ring-sage pointer-events-none'
                  : showHints
                  ? 'bg-amber/30 hover:bg-amber/50 ring-2 ring-amber/50'
                  : 'hover:bg-cream/20'
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
                  <Check className="w-6 h-6 text-sage drop-shadow-md" />
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

        {/* Objects to find */}
        <div className="bg-cream-dark/50 rounded-2xl p-6">
          <h3 className="font-display text-lg text-foreground mb-4 text-center">
            Objects to Find ({foundObjects.length} of {GARDEN_OBJECTS.length})
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {GARDEN_OBJECTS.map((obj) => (
              <div
                key={obj.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  foundObjects.includes(obj.id)
                    ? 'bg-sage/20 text-sage line-through'
                    : 'bg-cream text-foreground'
                }`}
              >
                {obj.name}
                {foundObjects.includes(obj.id) && (
                  <Check className="w-4 h-4 inline ml-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hint toggle info */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          {showHints ? 'Hints are showing • Click the eye to hide them' : 'Tap the eye icon if you need hints'}
        </p>
      </div>
    </div>
  );
};
