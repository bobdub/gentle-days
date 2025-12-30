import { useState, useEffect, useCallback } from 'react';
import { CalendarState, DayData, ActivityType } from '@/types/calendar';

const STORAGE_KEY = 'gentle-calendar-state';

const ACTIVITY_TITLES = [
  "Morning Dew", "Garden Path", "Sunlit Corner", "Quiet Bench",
  "Flower Bed", "Bird Song", "Gentle Breeze", "Stone Steps",
  "Rose Arbor", "Peaceful Pond", "Butterfly Garden", "Shady Oak",
  "Herb Garden", "Garden Gate", "Mossy Wall", "Wishing Well",
  "Lavender Lane", "Secret Garden", "Sunrise View", "Afternoon Tea",
  "Honeybee Haven", "Foxglove Corner", "Evening Light", "Twilight Path",
  "Moonlit Garden", "Starry Night", "First Frost", "Golden Leaves",
  "Misty Morning", "Final Bloom"
];

const ACTIVITY_DESCRIPTIONS = [
  "Find the hidden treasures among the dewdrops",
  "Discover what's waiting along the garden path",
  "Seek out the warmth in this sunny scene",
  "A peaceful moment to find hidden details",
  "Beautiful blooms hide small surprises",
  "Listen closely and look carefully",
  "Let the breeze guide your eyes",
  "Each step reveals something new",
  "Romance and mystery await",
  "Reflections hide many secrets",
  "Flutter through this colorful scene",
  "Ancient wisdom in every detail",
  "Fragrant discoveries to be made",
  "What awaits beyond the threshold?",
  "History whispers in the stones",
  "Make a wish and find a treasure",
  "Purple dreams and hidden things",
  "Only the patient will find all",
  "A new day brings new discoveries",
  "Sweet moments, sweeter finds",
  "Buzzing with hidden delights",
  "Tall tales and tiny treasures",
  "Golden hour, golden finds",
  "Follow the path to discovery",
  "Silver light, silver secrets",
  "Cosmic wonders in the garden",
  "Crystalline beauty awaits",
  "Autumn's treasures revealed",
  "Mystery in the morning mist",
  "A beautiful conclusion"
];

export function useCalendarState() {
  const [state, setState] = useState<CalendarState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const startDate = new Date(parsed.startDate);
        
        // Calculate how many days have passed since start
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);
        const diffTime = now.getTime() - startDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        const currentDay = Math.min(Math.max(1, diffDays), 30);
        
        return {
          ...parsed,
          startDate,
          currentDay,
          completedDays: parsed.completedDays || [],
          openedDays: parsed.openedDays || [],
        };
      } catch {
        // If parsing fails, start fresh
      }
    }
    return {
      startDate: new Date(),
      currentDay: 1,
      completedDays: [],
      openedDays: [],
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const calculateCurrentDay = useCallback(() => {
    const now = new Date();
    const start = new Date(state.startDate);
    start.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    const diffTime = now.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.min(Math.max(1, diffDays), 30);
  }, [state.startDate]);

  useEffect(() => {
    const currentDay = calculateCurrentDay();
    if (currentDay !== state.currentDay) {
      setState(prev => ({ ...prev, currentDay }));
    }
  }, [calculateCurrentDay, state.currentDay]);

  const getDayData = useCallback((day: number): DayData => {
    const currentDay = calculateCurrentDay();
    const isUnlocked = day <= currentDay;
    const isCompleted = state.completedDays.includes(day);
    const isToday = day === currentDay;
    const isFuture = day > currentDay;

    return {
      day,
      isUnlocked,
      isCompleted,
      isToday,
      isFuture,
      activityType: 'hidden-object' as ActivityType,
      title: ACTIVITY_TITLES[day - 1] || `Day ${day}`,
      description: ACTIVITY_DESCRIPTIONS[day - 1] || "A gentle discovery awaits",
    };
  }, [state.completedDays, calculateCurrentDay]);

  const markDayOpened = useCallback((day: number) => {
    setState(prev => ({
      ...prev,
      openedDays: prev.openedDays.includes(day) 
        ? prev.openedDays 
        : [...prev.openedDays, day],
    }));
  }, []);

  const markDayCompleted = useCallback((day: number) => {
    setState(prev => ({
      ...prev,
      completedDays: prev.completedDays.includes(day)
        ? prev.completedDays
        : [...prev.completedDays, day],
    }));
  }, []);

  const resetCalendar = useCallback(() => {
    const newState = {
      startDate: new Date(),
      currentDay: 1,
      completedDays: [],
      openedDays: [],
    };
    setState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  }, []);

  // Unlock all days by setting start date to 30 days ago
  const unlockAllDays = useCallback(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
    const newState = {
      ...state,
      startDate: thirtyDaysAgo,
      currentDay: 30,
    };
    setState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  }, [state]);

  return {
    state,
    getDayData,
    markDayOpened,
    markDayCompleted,
    resetCalendar,
    unlockAllDays,
    currentDay: calculateCurrentDay(),
  };
}
