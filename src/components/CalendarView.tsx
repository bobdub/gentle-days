import { DayData } from '@/types/calendar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Lock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  days: DayData[];
  onSelectDay: (day: number) => void;
  onBack: () => void;
}

export function CalendarView({ days, onSelectDay, onBack }: CalendarViewProps) {
  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-gentle-fade">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
              Garden Mornings
            </h1>
            <p className="text-muted-foreground">
              Tap any unlocked day to begin
            </p>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-5 md:grid-cols-6 gap-3 md:gap-4">
          {days.map((day, index) => (
            <button
              key={day.day}
              onClick={() => day.isUnlocked && onSelectDay(day.day)}
              disabled={day.isFuture}
              className={cn(
                "relative aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                day.isToday && "door-today animate-pulse-soft",
                day.isCompleted && !day.isToday && "door-opened",
                day.isUnlocked && !day.isCompleted && !day.isToday && "door-unopened hover:scale-105 hover:shadow-card cursor-pointer",
                day.isFuture && "door-locked cursor-not-allowed",
                "animate-gentle-fade"
              )}
              style={{ animationDelay: `${index * 30}ms` }}
              aria-label={`Day ${day.day}${day.isToday ? ', today' : ''}${day.isCompleted ? ', completed' : ''}${day.isFuture ? ', locked' : ''}`}
            >
              {/* Day number */}
              <span className={cn(
                "text-xl md:text-2xl font-display font-semibold",
                day.isToday && "text-foreground",
                day.isCompleted && !day.isToday && "text-primary",
                day.isUnlocked && !day.isCompleted && !day.isToday && "text-foreground",
                day.isFuture && "text-muted-foreground"
              )}>
                {day.day}
              </span>

              {/* Status indicator */}
              <div className="absolute bottom-2 md:bottom-3">
                {day.isCompleted && (
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                )}
                {day.isToday && !day.isCompleted && (
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                )}
                {day.isFuture && (
                  <Lock className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md door-today" />
            <span>Today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md door-opened" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md door-unopened" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md door-locked" />
            <span>Coming soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
