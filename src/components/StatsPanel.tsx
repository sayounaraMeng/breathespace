import { useAppStore } from '../stores/appStore';

export function StatsPanel() {
  const { todayStats } = useAppStore();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins}分钟`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">今日冥想</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <p className="text-3xl font-bold text-blue-600">{todayStats.totalSessions}</p>
          <p className="text-sm text-gray-600 mt-1">冥想次数</p>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <p className="text-3xl font-bold text-green-600">{formatDuration(todayStats.totalDuration)}</p>
          <p className="text-sm text-gray-600 mt-1">累计时长</p>
        </div>
      </div>
      
      {todayStats.totalSessions === 0 && (
        <p className="text-center text-gray-400 text-sm mt-4">今日尚未冥想，开始你的第一次吧</p>
      )}
    </div>
  );
}
