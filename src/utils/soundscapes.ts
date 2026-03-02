import { SceneType, Soundscape } from '../types';

// 预定义音景配置
export const SOUNDSCAPES: Record<SceneType, Soundscape> = {
  [SceneType.MORNING]: {
    id: 'morning-birds',
    name: '晨间鸟鸣',
    scene: SceneType.MORNING,
    frequencies: [440, 880, 1320],
    modulation: 0.3,
    duration: 300
  },
  [SceneType.NOON]: {
    id: 'noon-stream',
    name: '溪流水声',
    scene: SceneType.NOON,
    frequencies: [200, 400, 600],
    modulation: 0.5,
    duration: 600
  },
  [SceneType.AFTERNOON]: {
    id: 'afternoon-rain',
    name: '午后细雨',
    scene: SceneType.AFTERNOON,
    frequencies: [300, 500, 700],
    modulation: 0.4,
    duration: 600
  },
  [SceneType.EVENING]: {
    id: 'evening-waves',
    name: '海浪轻抚',
    scene: SceneType.EVENING,
    frequencies: [150, 250, 350],
    modulation: 0.6,
    duration: 900
  },
  [SceneType.DEFAULT]: {
    id: 'default-ambient',
    name: '自然白噪',
    scene: SceneType.DEFAULT,
    frequencies: [350, 550, 750],
    modulation: 0.4,
    duration: 600
  }
};

// 场景时间映射
export const SCENE_TIME_MAP: { hour: number; scene: SceneType }[] = [
  { hour: 6, scene: SceneType.MORNING },
  { hour: 12, scene: SceneType.NOON },
  { hour: 14, scene: SceneType.AFTERNOON },
  { hour: 18, scene: SceneType.EVENING }
];

// 场景标签
export const SCENE_LABELS: Record<SceneType, string> = {
  [SceneType.MORNING]: '晨间唤醒',
  [SceneType.NOON]: '午间放松',
  [SceneType.AFTERNOON]: '午后专注',
  [SceneType.EVENING]: '睡前舒缓',
  [SceneType.DEFAULT]: '自然放松'
};
