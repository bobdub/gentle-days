import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye, EyeOff, Check, ArrowLeft, Sparkles } from 'lucide-react';
import greenParkImage from '@/assets/green_park.webp';
import { createDailyHiddenObjectState } from '@/lib/hiddenObjectGame';

interface HiddenObjectGameProps {
  dayNumber: number;
  onComplete: () => void;
  onBack: () => void;
}

const dayToSeed = (dayNumber: number) => 20250000 + dayNumber * 1013;

export const HiddenObjectGame: React.FC<HiddenObjectGameProps> = ({
  dayNumber,
  onComplete,
  onBack,
}) => {
  const [foundTargets, setFoundTargets] = useState<string[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [lastFound, setLastFound] = useState<string | null>(null);

  const daily = useMemo(() => {
    return createDailyHiddenObjectState({
      seed: dayToSeed(dayNumber),
      targetsCount: 8,
      decoyCount: 20,
    });
  }, [dayNumber]);

  const handleObjectClick = (objectId: string, isTarget: boolean) => {
    if (!isTarget) return;
    if (foundTargets.includes(objectId)) return;

    setFoundTargets(prev => [...prev, objectId]);
    setLastFound(objectId);
    setTimeout(() => setLastFound(null), 1500);
  };

  const isComplete = foundTargets.length === daily.targets.length;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="text-center max-w-md animate-gentle-fade">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-sage/20 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-sage" />
          </div>
          <h2 className="font-display text-3xl text-foreground mb-4">Wonderful!</h2>
          <p className="text-muted-foreground text-lg mb-8">
            You found all the objects for today.
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
    <TooltipProvider>
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

          {/* Game Area */}
          <section className="relative rounded-3xl overflow-hidden shadow-card mb-6">
            <img
              src={greenParkImage}
              alt="A peaceful garden park scene with a wooden bench, flowers, and greenery"
              className="w-full h-auto block"
              draggable={false}
            />

            {/* Object buttons (many decoys + a few targets). Buttons sit directly on top of the object icons. */}
            {daily.placements.map(({ object, location, isTarget }) => {
              const isFound = isTarget && foundTargets.includes(object.id);
              const showTargetHint = showHints && isTarget && !isFound;

              return (
                <button
                  key={`${object.id}_${location.id}`}
                  type="button"
                  onClick={() => handleObjectClick(object.id, isTarget)}
                  disabled={isFound}
                  aria-label={isTarget ? `Find ${object.name}` : `Decorative ${object.name}`}
                  className={
                    "absolute rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 " +
                    (isFound
                      ? 'bg-sage/45'
                      : showTargetHint
                        ? 'bg-amber/25 hover:bg-amber/35'
                        : 'bg-cream/10 hover:bg-cream/20')
                  }
                  style={{
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                    width: `${location.width}%`,
                    height: `${location.height}%`,
                  }}
                >
                  <span
                    className={
                      'absolute inset-0 flex items-center justify-center select-none ' +
                      (isTarget ? 'text-2xl' : 'text-xl opacity-80')
                    }
                  >
                    {object.emoji}
                  </span>

                  {showTargetHint && (
                    <span className="absolute inset-0 rounded-lg border-2 border-amber/70" />
                  )}

                  {isFound && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Check className="w-7 h-7 text-white drop-shadow-lg" />
                    </span>
                  )}
                </button>
              );
            })}

            {/* Found notification */}
            {lastFound && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-cream/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-soft animate-gentle-fade">
                <p className="text-sage font-medium flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Found: {daily.targets.find(o => o.id === lastFound)?.name}
                </p>
              </div>
            )}
          </section>

          {/* Objects to find (icons, not words) */}
          <section className="bg-cream-dark/50 rounded-2xl p-6">
            <h2 className="font-display text-lg text-foreground mb-4 text-center">
              Find these objects ({foundTargets.length}/{daily.targets.length})
            </h2>

            <div className="flex flex-wrap gap-3 justify-center">
              {daily.targets.map(obj => {
                const isFound = foundTargets.includes(obj.id);
                return (
                  <Tooltip key={obj.id}>
                    <TooltipTrigger asChild>
                      <div
                        className={
                          'relative w-14 h-14 rounded-xl grid place-items-center transition-all ' +
                          (isFound ? 'bg-sage/20 opacity-55' : 'bg-cream')
                        }
                        aria-label={obj.name}
                      >
                        <span className="text-3xl" role="img" aria-hidden>
                          {obj.emoji}
                        </span>
                        {isFound && (
                          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-sage/25 grid place-items-center">
                            <Check className="w-4 h-4 text-sage" />
                          </span>
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{obj.name}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </section>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {showHints ? 'Hints showing • Tap eye to hide' : 'Need help? Tap the eye icon for hints'}
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
};
