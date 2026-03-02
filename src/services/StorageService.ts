import { MeditationSession, DailyStats } from '../types';

const STORAGE_KEY = 'breathespace_daily_stats';

interface StorageData {
  version: string;
  stats: Record<string, DailyStats>;
}

export class StorageService {
  // 获取今日统计
  static getDailyStats(date: string): DailyStats | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;
      
      const parsed: StorageData = JSON.parse(data);
      return parsed.stats?.[date] || null;
    } catch {
      return null;
    }
  }

  // 保存冥想会话
  static saveSession(session: MeditationSession): void {
    try {
      const date = session.startTime.toISOString().split('T')[0];
      const existing = localStorage.getItem(STORAGE_KEY);
      
      let data: StorageData = { version: '1.0', stats: {} };
      if (existing) {
        data = JSON.parse(existing);
      }
      
      if (!data.stats[date]) {
        data.stats[date] = {
          date,
          totalSessions: 0,
          totalDuration: 0,
          sessions: []
        };
      }
      
      data.stats[date].sessions.push({
        ...session,
        startTime: session.startTime
      });
      data.stats[date].totalSessions += 1;
      data.stats[date].totalDuration += session.actualDuration;
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  }

  // 获取今日数据（自动处理跨天）
  static getTodayStats(): DailyStats {
    const today = new Date().toISOString().split('T')[0];
    return this.getDailyStats(today) || {
      date: today,
      totalSessions: 0,
      totalDuration: 0,
      sessions: []
    };
  }

  // 清除旧数据（保留最近30天）
  static clearOldData(): void {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return;
      
      const parsed: StorageData = JSON.parse(data);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const cutoffDate = thirtyDaysAgo.toISOString().split('T')[0];
      
      Object.keys(parsed.stats).forEach(date => {
        if (date < cutoffDate) {
          delete parsed.stats[date];
        }
      });
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    } catch (error) {
      console.error('Failed to clear old data:', error);
    }
  }
}
