import { useEffect } from 'react';
import { useAppStore } from './stores/appStore';
import { Header } from './components/Header';
import { Player } from './components/Player';
import { BreathGuide } from './components/BreathGuide';
import { TimerSelector } from './components/TimerSelector';
import { StatsPanel } from './components/StatsPanel';
import { useBreathCycle } from './hooks/useBreathCycle';

function App() {
  const { timer, loadTodayStats } = useAppStore();
  
  // 加载今日统计
  useEffect(() => {
    loadTodayStats();
  }, [loadTodayStats]);

  // 呼吸引导
  useBreathCycle(timer.isRunning);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：播放器 */}
          <div className="lg:col-span-2 space-y-6">
            <Player />
            
            <TimerSelector />
            
            <BreathGuide />
          </div>
          
          {/* 右侧：统计 */}
          <div className="lg:col-span-1">
            <StatsPanel />
          </div>
        </div>
      </main>
      
      {/* 页脚 */}
      <footer className="text-center py-6 text-gray-400 text-sm">
        <p>呼吸间 - 让每一次呼吸都充满宁静</p>
      </footer>
    </div>
  );
}

export default App;
