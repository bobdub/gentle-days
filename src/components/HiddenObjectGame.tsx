import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Eye, Sparkles } from 'lucide-react';
import { HiddenObject, DayData } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface HiddenObjectGameProps {
  dayData: DayData;
  onComplete: () => void;
  onBack: () => void;
}

// Pre-defined objects for the garden scene
const GARDEN_OBJECTS: HiddenObject[] = [
  { id: '1', name: 'Butterfly', x: 15, y: 20, width: 8, height: 8, found: false },
  { id: '2', name: 'Watering Can', x: 70, y: 65, width: 10, height: 12, found: false },
  { id: '3', name: 'Bird', x: 45, y: 12, width: 7, height: 6, found: false },
  { id: '4', name: 'Ladybug', x: 85, y: 40, width: 5, height: 5, found: false },
  { id: '5', name: 'Garden Gloves', x: 25, y: 75, width: 9, height: 7, found: false },
  { id: '6', name: 'Snail', x: 55, y: 80, width: 6, height: 5, found: false },
];

const GARDEN_SCENE_DATA_URL =
  'data:image/png;base64,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';

export function HiddenObjectGame({ dayData, onComplete, onBack }: HiddenObjectGameProps) {
  const [objects, setObjects] = useState<HiddenObject[]>(GARDEN_OBJECTS);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const foundCount = objects.filter(obj => obj.found).length;
  const totalCount = objects.length;
  const remainingObjects = objects.filter(obj => !obj.found);

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
        <div className="relative rounded-3xl overflow-hidden shadow-card mb-6 aspect-video">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${GARDEN_SCENE_DATA_URL})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cream/40 via-transparent to-sage-light/30" />
          
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
