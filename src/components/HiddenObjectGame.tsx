import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, Sparkles, Eye, EyeOff } from 'lucide-react';
import greenParkImage from '@/assets/green_park.webp';
import { createDailyGameState, HiddenObject } from '@/lib/hiddenObjectGame';

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
  const [wrongClick, setWrongClick] = useState<{ x: number; y: number } | null>(null);

  // Generate daily game state - different targets each day
  const gameState = useMemo(() => {
    return createDailyGameState(dayNumber, 5); // 5 objects to find per day
  }, [dayNumber]);

  const targetIds = useMemo(() => new Set(gameState.targets.map(t => t.id)), [gameState.targets]);

  const handleObjectClick = (object: HiddenObject) => {
    // Check if this object is a target
    if (!targetIds.has(object.id)) {
      // Wrong object - show brief feedback
      return;
    }

    if (foundObjects.includes(object.id)) return;

    setFoundObjects(prev => [...prev, object.id]);
    setLastFound(object.id);
    setTimeout(() => setLastFound(null), 1500);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Show "wrong" feedback for clicking on empty areas
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setWrongClick({ x, y });
    setTimeout(() => setWrongClick(null), 400);
  };

  const isComplete = foundObjects.length === gameState.targets.length;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="text-center max-w-md animate-gentle-fade">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-sage/20 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-sage" />
          </div>
          <h2 className="font-display text-3xl text-foreground mb-4">Wonderful!</h2>
          <p className="text-muted-foreground text-lg mb-8">
            You found all the hidden objects for today.
            <br />
            Take a slow breath and enjoy this little moment.
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
        <header className="flex items-center justify-between mb-6">
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
            onClick={() => setShowHints(prev => !prev)}
            className="text-muted-foreground"
            aria-label={showHints ? 'Hide hints' : 'Show hints'}
          >
            {showHints ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
        </header>

        {/* Game Area - Click directly on objects in the image */}
        <section 
          className="relative rounded-3xl overflow-hidden shadow-card mb-6 cursor-crosshair"
          onClick={handleImageClick}
        >
          <img
            src={greenParkImage}
            alt="A peaceful garden park scene"
            className="w-full h-auto block select-none pointer-events-none"
            draggable={false}
          />

          {/* Clickable hitboxes over actual objects - NO visible emojis */}
          {gameState.targets.map((object) => {
            const isFound = foundObjects.includes(object.id);
            const showHint = showHints && !isFound;

            return (
              <button
                key={object.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleObjectClick(object);
                }}
                disabled={isFound}
                aria-label={`Find ${object.name}`}
                className={`absolute transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 ${
                  isFound
                    ? 'bg-sage/40 ring-2 ring-sage/60'
                    : showHint
                      ? 'bg-amber/20 ring-2 ring-amber/50 animate-pulse'
                      : 'hover:bg-cream/20'
                }`}
                style={{
                  left: `${object.x}%`,
                  top: `${object.y}%`,
                  width: `${object.width}%`,
                  height: `${object.height}%`,
                }}
              >
                {isFound && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Check className="w-8 h-8 text-sage drop-shadow-lg" />
                  </span>
                )}
              </button>
            );
          })}

          {/* Wrong click feedback */}
          {wrongClick && (
            <div
              className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-ping"
              style={{ left: `${wrongClick.x}%`, top: `${wrongClick.y}%` }}
            >
              <div className="w-full h-full rounded-full bg-red-400/30" />
            </div>
          )}

          {/* Found notification */}
          {lastFound && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-cream/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-soft animate-gentle-fade">
              <p className="text-sage font-medium flex items-center gap-2">
                <Check className="w-5 h-5" />
                Found: {gameState.targets.find(o => o.id === lastFound)?.name}
              </p>
            </div>
          )}
        </section>

        {/* Objects to find - shown as a text list */}
        <section className="bg-cream-dark/50 rounded-2xl p-6">
          <h2 className="font-display text-lg text-foreground mb-4 text-center">
            Find these objects ({foundObjects.length}/{gameState.targets.length})
          </h2>

          <div className="flex flex-wrap gap-3 justify-center">
            {gameState.targets.map(obj => {
              const isFound = foundObjects.includes(obj.id);
              return (
                <div
                  key={obj.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isFound
                      ? 'bg-sage/20 text-sage line-through'
                      : 'bg-cream text-foreground'
                  }`}
                >
                  {obj.name}
                  {isFound && <Check className="w-4 h-4 inline ml-2" />}
                </div>
              );
            })}
          </div>
        </section>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Click directly on objects in the scene to find them
          {showHints ? ' • Hints are showing' : ' • Tap the eye icon for hints'}
        </p>
      </div>
    </div>
  );
};
