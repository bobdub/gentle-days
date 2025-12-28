import { useState, useCallback, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Eye, Sparkles } from 'lucide-react';
import { HiddenObject, DayData } from '@/types/calendar';
import { cn } from '@/lib/utils';
import {
  createDailyHiddenObjectState,
  dateToSeed,
  DailyObjectPlacement,
} from '@/lib/hiddenObjectGame';

interface HiddenObjectGameProps {
  dayData: DayData;
  startDate: Date;
  onComplete: () => void;
  onBack: () => void;
}

const buildHiddenObjects = (placements: DailyObjectPlacement[]): HiddenObject[] => {
  return placements.map(({ object, location }) => ({
    id: object.id,
    name: object.name,
    x: location.x,
    y: location.y,
    width: location.width,
    height: location.height,
    found: false,
  }));
};

export function HiddenObjectGame({ dayData, startDate, onComplete, onBack }: HiddenObjectGameProps) {
  const dailyDate = useMemo(() => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayData.day - 1);
    return date;
  }, [startDate, dayData.day]);

  const dailyState = useMemo(() => {
    const seed = dateToSeed(dailyDate);
    return createDailyHiddenObjectState({ seed });
  }, [dailyDate]);

  const [objects, setObjects] = useState<HiddenObject[]>(() =>
    buildHiddenObjects(dailyState.dailyPlacements)
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setObjects(buildHiddenObjects(dailyState.dailyPlacements));
    setIsCompleted(false);
    setShowHint(false);
  }, [dailyState]);

  const foundCount = objects.filter(obj => obj.found).length;
  const totalCount = objects.length;

  const handleObjectClick = useCallback((id: string) => {
    setObjects(prev => {
      const updated = prev.map(obj =>
        obj.id === id ? { ...obj, found: true } : obj
      );

      const allFound = updated.every(obj => obj.found);
      if (allFound) {
        setTimeout(() => setIsCompleted(true), 500);
      }

      return updated;
    });
  }, []);

  const handleComplete = () => {
    onComplete();
    onBack();
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
        <div className="max-w-md mx-auto text-center animate-gentle-fade">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-sage-light to-amber-light flex items-center justify-center shadow-card">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>

          <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
            Beautifully done
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            You found all the hidden treasures in today's garden scene.
            Take a moment to appreciate the peaceful morning.
          </p>

          <div className="card-gentle mb-8">
            <p className="font-display italic text-primary">
              "{dayData.title}"
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Day {dayData.day} complete
            </p>
          </div>

          <Button variant="today" size="lg" onClick={handleComplete}>
            <Check className="w-6 h-6" />
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6 animate-gentle-fade">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-display font-semibold text-foreground">
                {dayData.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                Day {dayData.day} • Find the hidden objects
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-semibold text-foreground">
              {foundCount} / {totalCount}
            </div>
            <p className="text-xs text-muted-foreground">found</p>
          </div>
        </div>

        {/* Game area */}
        <div className="relative rounded-3xl overflow-hidden shadow-card mb-6 bg-gradient-to-br from-sage-light via-cream to-rose-light aspect-video">
          {/* Garden scene placeholder - beautiful gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-light/50 via-sage-light/30 to-rose-light/40" />

          {/* Decorative elements */}
          <div className="absolute inset-0">
            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-sage/20 to-transparent" />

            {/* Sun */}
            <div className="absolute top-8 right-12 w-16 h-16 rounded-full bg-gradient-to-br from-amber to-amber-light opacity-60 blur-sm" />

            {/* Flowers */}
            <div className="absolute bottom-16 left-1/4 w-8 h-12 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-rose/80" />
              <div className="w-1 h-8 bg-sage" />
            </div>
            <div className="absolute bottom-20 left-1/3 w-8 h-12 flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-amber/80" />
              <div className="w-1 h-10 bg-sage" />
            </div>
            <div className="absolute bottom-14 right-1/3 w-8 h-12 flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-primary/60" />
              <div className="w-1 h-6 bg-sage" />
            </div>
          </div>

          {/* Clickable hidden objects */}
          {objects.map(obj => (
            <button
              key={obj.id}
              onClick={() => !obj.found && handleObjectClick(obj.id)}
              className={cn(
                "absolute rounded-full transition-all duration-500 focus-visible:outline-none",
                obj.found
                  ? "bg-primary/30 ring-4 ring-primary/50 scale-110"
                  : "hover:bg-foreground/10 cursor-pointer",
                showHint && !obj.found && "animate-pulse-soft bg-accent/20"
              )}
              style={{
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                width: `${obj.width}%`,
                height: `${obj.height}%`,
              }}
              disabled={obj.found}
              aria-label={obj.found ? `${obj.name} - found!` : `Find the ${obj.name}`}
            >
              {obj.found && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-6 h-6 text-primary" />
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Objects to find */}
        <div className="card-gentle animate-gentle-fade" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">
              Objects to find
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHint(!showHint)}
              className="text-muted-foreground"
            >
              <Eye className="w-4 h-4 mr-2" />
              {showHint ? 'Hide hints' : 'Show hints'}
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            {objects.map(obj => (
              <div
                key={obj.id}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  obj.found
                    ? "bg-primary/20 text-primary line-through"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {obj.found && <Check className="w-4 h-4 inline mr-1" />}
                {obj.name}
              </div>
            ))}
          </div>
        </div>

        {/* Encouragement */}
        {foundCount > 0 && foundCount < totalCount && (
          <p className="text-center text-muted-foreground mt-6 animate-gentle-fade">
            {totalCount - foundCount === 1
              ? "Just one more to find. Take your time."
              : `${totalCount - foundCount} more to discover. No rush.`}
          </p>
        )}
      </div>
    </div>
  );
}
