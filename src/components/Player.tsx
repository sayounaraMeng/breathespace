import { useEffect, useState } from 'react';
import { useAppStore } from '../stores/appStore';
import { SceneEngine } from '../services/SceneEngine';
import { AudioService } from '../services/AudioService';
import { MeditationSession } from '../types';

export function Player() {
  const { 
    currentScene, 
    timer, 
    audio, 
    setAudio, 
    setTimer,
    startTimer,
    pauseTimer,
    stopTimer,
    updateStats 
  } = useAppStore();
  
  const [audioService] = useState(() => new AudioService());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    audioService.initialize().then(setIsReady);
    return () => {
      audioService.stop();
    };
  }, [audioService]);

  // 监听计时器完成
  useEffect(() => {
    if (timer.isCompleted && timer.remainingTime === 0) {
      handleComplete();
    }
  }, [timer.isCompleted, timer.remainingTime]);

  const handlePlay = async () => {
    if (!isReady) return;

    const soundscape = SceneEngine.getSoundscape(currentScene);
    
    if (timer.isRunning) {
      // 暂停
      audioService.pause();
      pauseTimer();
      setAudio({ isPlaying: false });
    } else {
      // 播放
      if (timer.remainingTime === timer.selectedDuration) {
        // 从头开始
        audioService.play(soundscape);
      } else {
        // 恢复
        audioService.resume();
      }
      startTimer();
      setAudio({ isPlaying: true, duration: soundscape.duration });
    }
  };

  const handleStop = () => {
    audioService.stop();
    stopTimer();
    setAudio({ isPlaying: false, currentTime: 0 });
    setTimer({
      selectedDuration: timer.selectedDuration,
      remainingTime: timer.selectedDuration,
      isRunning: false,
      isCompleted: false
    });
  };

  const handleComplete = () => {
    audioService.stop();
    setAudio({ isPlaying: false });
    
    // 保存会话记录
    const session: MeditationSession = {
      id: Date.now().toString(),
      startTime: new Date(Date.now() - timer.selectedDuration * 1000),
      duration: timer.selectedDuration,
      actualDuration: timer.selectedDuration,
      scene: currentScene,
      completed: true
    };
    updateStats(session);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseInt(e.target.value);
    audioService.setVolume(volume);
    setAudio({ volume });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = timer.selectedDuration > 0 
    ? ((timer.selectedDuration - timer.remainingTime) / timer.selectedDuration) * 100 
    : 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* 进度条 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{formatTime(timer.selectedDuration - timer.remainingTime)}</span>
          <span>{formatTime(timer.remainingTime)}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 播放控制 */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={handlePlay}
          disabled={!isReady}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl transition-all ${
            timer.isRunning 
              ? 'bg-amber-500 hover:bg-amber-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
        >
          {timer.isRunning ? '⏸' : '▶'}
        </button>
        
        <button
          onClick={handleStop}
          className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-all"
        >
          ⏹
        </button>
      </div>

      {/* 音量控制 */}
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-sm">🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={audio.volume}
          onChange={handleVolumeChange}
          className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-gray-600 text-sm w-10 text-right">{audio.volume}%</span>
      </div>

      {/* 当前场景 */}
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">
          当前场景: {SceneEngine.getSceneLabel(currentScene)}
        </span>
      </div>
    </div>
  );
}
