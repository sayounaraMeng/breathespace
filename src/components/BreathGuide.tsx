import { useAppStore } from '../stores/appStore';

export function BreathGuide() {
  const { breath } = useAppStore();

  const getPhaseText = () => {
    switch (breath.phase) {
      case 'inhale':
        return '吸气';
      case 'hold':
        return '屏息';
      case 'exhale':
        return '呼气';
      default:
        return '';
    }
  };

  // 根据呼吸阶段计算圆形大小
  const getCircleScale = () => {
    switch (breath.phase) {
      case 'inhale':
        return 0.8 + breath.progress * 0.4; // 0.8 -> 1.2
      case 'hold':
        return 1.2;
      case 'exhale':
        return 1.2 - breath.progress * 0.4; // 1.2 -> 0.8
      default:
        return 1;
    }
  };

  const scale = getCircleScale();

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        {/* 外圈 */}
        <div 
          className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center transition-transform duration-100"
          style={{ 
            transform: `scale(${scale})`,
          }}
        >
          {/* 内圈 */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg"
          >
            <span className="text-white text-xl font-medium">
              {getPhaseText()}
            </span>
          </div>
        </div>
        
        {/* 进度指示 */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          {['inhale', 'hold', 'exhale'].map((phase) => (
            <div
              key={phase}
              className={`w-2 h-2 rounded-full transition-colors ${
                breath.phase === phase ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      <p className="text-gray-500 text-sm mt-6">
        跟随圆圈呼吸：吸气4秒 - 屏息4秒 - 呼气6秒
      </p>
    </div>
  );
}
