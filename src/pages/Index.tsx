import { useState, useMemo } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { CalendarView } from '@/components/CalendarView';
import { HiddenObjectGame } from '@/components/HiddenObjectGame';
import { SettingsPanel } from '@/components/SettingsPanel';
import { useCalendarState } from '@/hooks/useCalendarState';
import { useAccessibility } from '@/hooks/useAccessibility';

type View = 'welcome' | 'calendar' | 'activity' | 'settings';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('welcome');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  const { 
    state, 
    getDayData, 
    markDayOpened, 
    markDayCompleted, 
    resetCalendar,
    unlockAllDays,
    currentDay 
  } = useCalendarState();
  
  const { settings, updateSetting, resetSettings } = useAccessibility();

  const days = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => getDayData(i + 1));
  }, [getDayData, state.completedDays, state.openedDays]);

  const completedCount = state.completedDays.length;

  const handleStartToday = () => {
    setSelectedDay(currentDay);
    markDayOpened(currentDay);
    setCurrentView('activity');
  };

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    markDayOpened(day);
    setCurrentView('activity');
  };

  const handleCompleteActivity = () => {
    if (selectedDay) {
      markDayCompleted(selectedDay);
    }
  };

  const handleResetCalendar = () => {
    resetCalendar();
    resetSettings();
  };

  const selectedDayData = selectedDay ? getDayData(selectedDay) : null;

  return (
    <main className="min-h-screen">
      {currentView === 'welcome' && (
        <WelcomeScreen
          currentDay={currentDay}
          completedCount={completedCount}
          onStartToday={handleStartToday}
          onViewCalendar={() => setCurrentView('calendar')}
          onOpenSettings={() => setCurrentView('settings')}
        />
      )}

      {currentView === 'calendar' && (
        <CalendarView
          days={days}
          onSelectDay={handleSelectDay}
          onBack={() => setCurrentView('welcome')}
        />
      )}

      {currentView === 'activity' && selectedDay && (
        <HiddenObjectGame
          dayNumber={selectedDay}
          onComplete={handleCompleteActivity}
          onBack={() => setCurrentView('calendar')}
        />
      )}

      {currentView === 'settings' && (
        <SettingsPanel
          settings={settings}
          onUpdateSetting={updateSetting}
          onResetCalendar={handleResetCalendar}
          onUnlockAllDays={unlockAllDays}
          onBack={() => setCurrentView('welcome')}
        />
      )}
    </main>
  );
};

export default Index;
