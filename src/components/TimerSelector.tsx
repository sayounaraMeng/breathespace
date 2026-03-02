import { useAppStore } from '../stores/appStore';

const DURATIONS = [
  { value: 300, label: '5分钟' },
  { value: 600, label: '10分钟' },
  { value: 900, label: '15分钟' }
];

export function TimerSelector() {
  const { timer, setTimer } = useAppStore();

  const selectDuration = (duration: number) => {
    setTimer({
      selectedDuration: duration,
      remainingTime: duration,
      isRunning: false,
      isCompleted: false
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-gray-600 text-sm">选择冥想时长</p>
      <div className="flex gap-3">
        {DURATIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => selectDuration(value)}
            disabled={timer.isRunning}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
              timer.selectedDuration === value
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
            } ${timer.isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
