import { useState, useEffect, useCallback } from 'react';
import { AccessibilitySettings } from '@/types/calendar';

const STORAGE_KEY = 'gentle-calendar-accessibility';

const defaultSettings: AccessibilitySettings = {
  textSize: 'normal',
  reduceMotion: false,
  highContrast: false,
};

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    // Check for system preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return {
      ...defaultSettings,
      reduceMotion: prefersReducedMotion,
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    
    // Apply text size to document
    const root = document.documentElement;
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-extra-large');
    root.classList.add(`text-size-${settings.textSize}`);
    
    // Apply reduce motion
    if (settings.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    // Apply high contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [settings]);

  const updateSetting = useCallback(<K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  return {
    settings,
    updateSetting,
    resetSettings,
  };
}
