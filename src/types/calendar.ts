export interface DayData {
  day: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  isToday: boolean;
  isFuture: boolean;
  activityType: ActivityType;
  title: string;
  description: string;
}

export type ActivityType = 'hidden-object' | 'match-three' | 'jigsaw' | 'pattern';

export interface HiddenObject {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  found: boolean;
}

export interface CalendarState {
  startDate: Date;
  currentDay: number;
  completedDays: number[];
  openedDays: number[];
}

export interface AccessibilitySettings {
  textSize: 'normal' | 'large' | 'extra-large';
  reduceMotion: boolean;
  highContrast: boolean;
}
