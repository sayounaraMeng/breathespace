import { useEffect } from 'react';
import { useAppStore } from '../stores/appStore';

export function useStorage() {
  const { todayStats, loadTodayStats } = useAppStore();

  useEffect(() => {
    loadTodayStats();
  }, [loadTodayStats]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins}分钟`;
  };

  return {
    totalSessions: todayStats.totalSessions,
    totalDuration: todayStats.totalDuration,
    formattedDuration: formatDuration(todayStats.totalDuration)
  };
}
