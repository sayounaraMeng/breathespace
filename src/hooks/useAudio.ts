import { useEffect, useRef } from 'react';
import { AudioService } from '../services/AudioService';
import { useAppStore } from '../stores/appStore';
import { Soundscape } from '../types';

export function useAudio() {
  const audioServiceRef = useRef<AudioService | null>(null);
  const { audio, setAudio } = useAppStore();

  useEffect(() => {
    audioServiceRef.current = new AudioService();
    audioServiceRef.current.initialize();
    
    return () => {
      audioServiceRef.current?.stop();
    };
  }, []);

  const play = (soundscape: Soundscape) => {
    if (audioServiceRef.current) {
      audioServiceRef.current.play(soundscape);
      setAudio({ isPlaying: true, duration: soundscape.duration });
    }
  };

  const pause = () => {
    audioServiceRef.current?.pause();
    setAudio({ isPlaying: false });
  };

  const resume = () => {
    audioServiceRef.current?.resume();
    setAudio({ isPlaying: true });
  };

  const stop = () => {
    audioServiceRef.current?.stop();
    setAudio({ isPlaying: false, currentTime: 0 });
  };

  const setVolume = (volume: number) => {
    audioServiceRef.current?.setVolume(volume);
    setAudio({ volume });
  };

  const toggle = (soundscape: Soundscape) => {
    if (audio.isPlaying) {
      pause();
    } else {
      play(soundscape);
    }
  };

  return {
    isPlaying: audio.isPlaying,
    volume: audio.volume,
    play,
    pause,
    resume,
    stop,
    setVolume,
    toggle
  };
}
