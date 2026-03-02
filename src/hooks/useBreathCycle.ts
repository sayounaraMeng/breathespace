import { useEffect, useRef } from 'react';
import { useAppStore } from '../stores/appStore';

// 呼吸周期: 吸气4s - 屏息4s - 呼气6s = 14s一个周期
const INHALE_DURATION = 4000;
const HOLD_DURATION = 4000;
const EXHALE_DURATION = 6000;
const CYCLE_DURATION = INHALE_DURATION + HOLD_DURATION + EXHALE_DURATION;

export function useBreathCycle(isActive: boolean) {
  const { breath, setBreath } = useAppStore();
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      setBreath({ phase: 'inhale', progress: 0, cycleCount: 0 });
      return;
    }

    startTimeRef.current = Date.now();

    const animate = () => {
      if (!startTimeRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      const cyclePosition = elapsed % CYCLE_DURATION;

      let phase: 'inhale' | 'hold' | 'exhale';
      let progress: number;

      if (cyclePosition < INHALE_DURATION) {
        phase = 'inhale';
        progress = cyclePosition / INHALE_DURATION;
      } else if (cyclePosition < INHALE_DURATION + HOLD_DURATION) {
        phase = 'hold';
        progress = (cyclePosition - INHALE_DURATION) / HOLD_DURATION;
      } else {
        phase = 'exhale';
        progress = (cyclePosition - INHALE_DURATION - HOLD_DURATION) / EXHALE_DURATION;
      }

      const cycleCount = Math.floor(elapsed / CYCLE_DURATION);

      setBreath({ phase, progress, cycleCount });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isActive, setBreath]);

  return breath;
}
