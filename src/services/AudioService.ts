import { Soundscape } from '../types';

export class AudioService {
  private audioContext: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;
  private isPlaying = false;
  private onEndedCallback: (() => void) | null = null;

  // 初始化音频上下文
  async initialize(): Promise<boolean> {
    try {
      if (!window.AudioContext) {
        console.error('Web Audio API not supported');
        return false;
      }
      
      this.audioContext = new AudioContext();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      
      return true;
    } catch (error) {
      console.error('Failed to initialize audio:', error);
      return false;
    }
  }

  // 播放音景
  play(soundscape: Soundscape): void {
    if (!this.audioContext || !this.gainNode) return;
    
    // 停止当前播放
    this.stop();
    
    // 创建多个振荡器
    soundscape.frequencies.forEach(freq => {
      const oscillator = this.audioContext!.createOscillator();
      const oscGain = this.audioContext!.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      
      // 添加调制效果
      const lfo = this.audioContext!.createOscillator();
      const lfoGain = this.audioContext!.createGain();
      lfo.frequency.value = 0.1; // 0.1 Hz 调制
      lfoGain.gain.value = freq * soundscape.modulation * 0.1;
      
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      lfo.start();
      
      oscillator.connect(oscGain);
      oscGain.connect(this.gainNode!);
      
      oscillator.start();
      this.oscillators.push(oscillator);
    });
    
    this.isPlaying = true;
    
    // 设置自动结束
    setTimeout(() => {
      this.stop();
      this.onEndedCallback?.();
    }, soundscape.duration * 1000);
  }

  // 暂停
  pause(): void {
    if (this.audioContext?.state === 'running') {
      this.audioContext.suspend();
      this.isPlaying = false;
    }
  }

  // 恢复
  resume(): void {
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
      this.isPlaying = true;
    }
  }

  // 停止
  stop(): void {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    this.oscillators = [];
    this.isPlaying = false;
  }

  // 设置音量
  setVolume(volume: number): void {
    if (this.gainNode) {
      this.gainNode.gain.value = volume / 100;
    }
  }

  // 获取当前时间
  getCurrentTime(): number {
    return this.audioContext?.currentTime || 0;
  }

  // 检查是否正在播放
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // 设置结束回调
  onEnded(callback: () => void): void {
    this.onEndedCallback = callback;
  }
}
