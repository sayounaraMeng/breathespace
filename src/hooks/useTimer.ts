import { useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '../stores/appStore';

export function useTimer() {
  const { timer, startTimer, pauseTimer, stopTimer, tick } = useAppStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timer.isRunning) {
      intervalRef.current = setInterval(() => {
        tick();
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.isRunning, tick]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const selectDuration = (duration: number) => {
    useAppStore.setState((state) => ({
      timer: {
        ...state.timer,
        selectedDuration: duration,
        remainingTime: duration,
        isRunning: false,
        isCompleted: false
      }
    }));
  };

  const progress = timer.selectedDuration > 0 
    ? ((timer.selectedDuration - timer.remainingTime) / timer.selectedDuration) * 100 
    : 0;

  return {
    selectedDuration: timer.selectedDuration,
    remainingTime: timer.remainingTime,
    isRunning: timer.isRunning,
    isCompleted: timer.isCompleted,
    formattedTime: formatTime(timer.remainingTime),
    progress,
    start: startTimer,
    pause: pauseTimer,
    stop: stopTimer,
    selectDuration
  };
}
