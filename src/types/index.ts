// 场景类型枚举
export enum SceneType {
  MORNING = 'morning',
  NOON = 'noon',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
  DEFAULT = 'default'
}

// 音景配置
export interface Soundscape {
  id: string;
  name: string;
  scene: SceneType;
  frequencies: number[];
  modulation: number;
  duration: number;
}

// 冥想会话
export interface MeditationSession {
  id: string;
  startTime: Date;
  duration: number;
  actualDuration: number;
  scene: SceneType;
  completed: boolean;
}

// 今日统计
export interface DailyStats {
  date: string;
  totalSessions: number;
  totalDuration: number;
  sessions: MeditationSession[];
}

// 音频状态
export interface AudioState {
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
}

// 计时器状态
export interface TimerState {
  selectedDuration: number;
  remainingTime: number;
  isRunning: boolean;
  isCompleted: boolean;
}

// 呼吸周期状态
export interface BreathCycle {
  phase: 'inhale' | 'hold' | 'exhale';
  progress: number;
  cycleCount: number;
}

// 错误类型
export enum AppError {
  AUDIO_INIT_FAILED = 'AUDIO_INIT_FAILED',
  AUDIO_PLAY_FAILED = 'AUDIO_PLAY_FAILED',
  STORAGE_READ_FAILED = 'STORAGE_READ_FAILED',
  STORAGE_WRITE_FAILED = 'STORAGE_WRITE_FAILED',
  BROWSER_UNSUPPORTED = 'BROWSER_UNSUPPORTED'
}
