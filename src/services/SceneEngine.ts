import { SceneType } from '../types';
import { SOUNDSCAPES, SCENE_LABELS } from '../utils/soundscapes';

export class SceneEngine {
  // 根据当前时间获取场景
  static getCurrentScene(): SceneType {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 12) return SceneType.MORNING;
    if (hour >= 12 && hour < 14) return SceneType.NOON;
    if (hour >= 14 && hour < 18) return SceneType.AFTERNOON;
    if (hour >= 18 && hour < 24) return SceneType.EVENING;
    
    return SceneType.DEFAULT;
  }

  // 根据小时数获取场景（用于测试）
  static getSceneByHour(hour: number): SceneType {
    if (hour >= 6 && hour < 12) return SceneType.MORNING;
    if (hour >= 12 && hour < 14) return SceneType.NOON;
    if (hour >= 14 && hour < 18) return SceneType.AFTERNOON;
    if (hour >= 18 && hour < 24) return SceneType.EVENING;
    return SceneType.DEFAULT;
  }

  // 获取音景配置
  static getSoundscape(scene: SceneType) {
    return SOUNDSCAPES[scene];
  }

  // 获取场景标签
  static getSceneLabel(scene: SceneType): string {
    return SCENE_LABELS[scene];
  }

  // 获取所有可用场景
  static getAllScenes(): SceneType[] {
    return [SceneType.MORNING, SceneType.NOON, SceneType.AFTERNOON, SceneType.EVENING];
  }
}
