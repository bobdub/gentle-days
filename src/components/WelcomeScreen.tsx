import { Button } from '@/components/ui/button';
import { Flower2, Calendar, Settings } from 'lucide-react';

interface WelcomeScreenProps {
  currentDay: number;
  completedCount: number;
  onStartToday: () => void;
  onViewCalendar: () => void;
  onOpenSettings: () => void;
}

export function WelcomeScreen({
  currentDay,
  completedCount,
  onStartToday,
  onViewCalendar,
  onOpenSettings,
}: WelcomeScreenProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getDateString = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-lg mx-auto text-center animate-gentle-fade">
        {/* Decorative element */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sage-light to-rose-light flex items-center justify-center shadow-soft animate-float">
              <Flower2 className="w-12 h-12 text-primary" strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-amber-light flex items-center justify-center shadow-soft">
              <span className="text-lg font-display font-semibold text-foreground">{currentDay}</span>
            </div>
          </div>
        </div>

        {/* Greeting */}
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-2">
          {getGreeting()}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {getDateString()}
        </p>

        {/* Theme title */}
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-display italic text-primary mb-2">
            Garden Mornings
          </h2>
          <p className="text-muted-foreground">
            A gentle month of quiet discoveries
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-10 card-gentle">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground">Your journey</span>
            <span className="font-semibold text-foreground">{completedCount} of 30 days</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700"
              style={{ width: `${(completedCount / 30) * 100}%` }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <Button 
            variant="today" 
            size="lg" 
            className="w-full"
            onClick={onStartToday}
          >
            <Flower2 className="w-6 h-6" />
            Open Today's Door
          </Button>
          
          <Button 
            variant="calm" 
            size="lg" 
            className="w-full"
            onClick={onViewCalendar}
          >
            <Calendar className="w-6 h-6" />
            View Calendar
          </Button>
        </div>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="mt-8 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
          aria-label="Open settings"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
