import { create } from 'zustand';
import { AudioState, TimerState, BreathCycle, SceneType, MeditationSession } from '../types';
import { SceneEngine } from '../services/SceneEngine';
import { StorageService } from '../services/StorageService';

interface AppState {
  // 场景
  currentScene: SceneType;
  setCurrentScene: (scene: SceneType) => void;
  
  // 音频
  audio: AudioState;
  setAudio: (audio: Partial<AudioState>) => void;
  
  // 计时器
  timer: TimerState;
  setTimer: (timer: Partial<TimerState>) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  stopTimer: () => void;
  tick: () => void;
  
  // 呼吸引导
  breath: BreathCycle;
  setBreath: (breath: Partial<BreathCycle>) => void;
  
  // 统计
  todayStats: {
    totalSessions: number;
    totalDuration: number;
  };
  updateStats: (session: MeditationSession) => void;
  loadTodayStats: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // 场景
  currentScene: SceneEngine.getCurrentScene(),
  setCurrentScene: (scene) => set({ currentScene: scene }),
  
  // 音频
  audio: {
    isPlaying: false,
    volume: 50,
    currentTime: 0,
    duration: 0
  },
  setAudio: (audio) => set((state) => ({ 
    audio: { ...state.audio, ...audio } 
  })),
  
  // 计时器
  timer: {
    selectedDuration: 300,
    remainingTime: 300,
    isRunning: false,
    isCompleted: false
  },
  setTimer: (timer) => set((state) => ({ 
    timer: { ...state.timer, ...timer } 
  })),
  startTimer: () => {
    const { timer } = get();
    set({ 
      timer: { ...timer, isRunning: true, isCompleted: false }
    });
  },
  pauseTimer: () => {
    const { timer } = get();
    set({ timer: { ...timer, isRunning: false } });
  },
  stopTimer: () => {
    const { timer } = get();
    set({ 
      timer: { 
        ...timer, 
        isRunning: false, 
        isCompleted: true,
        remainingTime: 0 
      } 
    });
  },
  tick: () => {
    const { timer } = get();
    if (timer.isRunning && timer.remainingTime > 0) {
      const newRemaining = timer.remainingTime - 1;
      set({ 
        timer: { 
          ...timer, 
          remainingTime: newRemaining,
          isCompleted: newRemaining === 0,
          isRunning: newRemaining > 0
        } 
      });
    }
  },
  
  // 呼吸引导
  breath: {
    phase: 'inhale',
    progress: 0,
    cycleCount: 0
  },
  setBreath: (breath) => set((state) => ({ 
    breath: { ...state.breath, ...breath } 
  })),
  
  // 统计
  todayStats: {
    totalSessions: 0,
    totalDuration: 0
  },
  updateStats: (session) => {
    const { todayStats } = get();
    set({
      todayStats: {
        totalSessions: todayStats.totalSessions + 1,
        totalDuration: todayStats.totalDuration + session.actualDuration
      }
    });
    StorageService.saveSession(session);
  },
  loadTodayStats: () => {
    const stats = StorageService.getTodayStats();
    set({
      todayStats: {
        totalSessions: stats.totalSessions,
        totalDuration: stats.totalDuration
      }
    });
  }
}));
