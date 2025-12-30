import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, FastForward } from 'lucide-react';
import { AccessibilitySettings } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface SettingsPanelProps {
  settings: AccessibilitySettings;
  onUpdateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  onResetCalendar: () => void;
  onUnlockAllDays?: () => void;
  onBack: () => void;
}

export function SettingsPanel({
  settings,
  onUpdateSetting,
  onResetCalendar,
  onUnlockAllDays,
  onBack,
}: SettingsPanelProps) {
  const textSizeOptions: { value: AccessibilitySettings['textSize']; label: string }[] = [
    { value: 'normal', label: 'Normal' },
    { value: 'large', label: 'Large' },
    { value: 'extra-large', label: 'Extra Large' },
  ];

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-gentle-fade">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
            Settings
          </h1>
        </div>

        <div className="space-y-6">
          {/* Text Size */}
          <div className="card-gentle animate-gentle-fade" style={{ animationDelay: '100ms' }}>
            <h2 className="font-display font-semibold text-foreground mb-4">
              Text Size
            </h2>
            <div className="flex gap-3">
              {textSizeOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => onUpdateSetting('textSize', option.value)}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl text-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    settings.textSize === option.value
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reduce Motion */}
          <div className="card-gentle animate-gentle-fade" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-semibold text-foreground">
                  Reduce Motion
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Minimize animations throughout the app
                </p>
              </div>
              <button
                onClick={() => onUpdateSetting('reduceMotion', !settings.reduceMotion)}
                className={cn(
                  "relative w-14 h-8 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  settings.reduceMotion ? "bg-primary" : "bg-muted"
                )}
                role="switch"
                aria-checked={settings.reduceMotion}
              >
                <span
                  className={cn(
                    "absolute top-1 left-1 w-6 h-6 rounded-full bg-card shadow-soft transition-transform duration-300",
                    settings.reduceMotion && "translate-x-6"
                  )}
                />
              </button>
            </div>
          </div>

          {/* High Contrast */}
          <div className="card-gentle animate-gentle-fade" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-semibold text-foreground">
                  High Contrast
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Increase contrast for better visibility
                </p>
              </div>
              <button
                onClick={() => onUpdateSetting('highContrast', !settings.highContrast)}
                className={cn(
                  "relative w-14 h-8 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  settings.highContrast ? "bg-primary" : "bg-muted"
                )}
                role="switch"
                aria-checked={settings.highContrast}
              >
                <span
                  className={cn(
                    "absolute top-1 left-1 w-6 h-6 rounded-full bg-card shadow-soft transition-transform duration-300",
                    settings.highContrast && "translate-x-6"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Unlock All Days (for testing) */}
          {onUnlockAllDays && (
            <div className="card-gentle animate-gentle-fade" style={{ animationDelay: '400ms' }}>
              <h2 className="font-display font-semibold text-foreground mb-2">
                Unlock All Days
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Skip the daily wait and unlock all 30 days immediately.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={onUnlockAllDays}
              >
                <FastForward className="w-5 h-5 mr-2" />
                Unlock All Days
              </Button>
            </div>
          )}

          {/* Reset Calendar */}
          <div className="card-gentle animate-gentle-fade border-2 border-destructive/20" style={{ animationDelay: '500ms' }}>
            <h2 className="font-display font-semibold text-foreground mb-2">
              Start Fresh
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Begin a new 30-day journey. This will reset all your progress.
            </p>
            <Button
              variant="outline"
              className="w-full border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => {
                if (confirm('Are you sure you want to start fresh? All progress will be reset.')) {
                  onResetCalendar();
                  onBack();
                }
              }}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset Calendar
            </Button>
          </div>
        </div>

        {/* About section */}
        <div className="mt-12 text-center text-muted-foreground animate-gentle-fade" style={{ animationDelay: '500ms' }}>
          <p className="font-display italic">Garden Mornings</p>
          <p className="text-sm mt-1">A gentle daily ritual</p>
        </div>
      </div>
    </div>
  );
}
