import { SceneEngine } from '../services/SceneEngine';
import { useAppStore } from '../stores/appStore';

export function Header() {
  const { currentScene, setCurrentScene } = useAppStore();
  const scenes = SceneEngine.getAllScenes();

  return (
    <header className="w-full py-4 px-6 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">呼吸间</h1>
        <div className="flex gap-2 flex-wrap">
          {scenes.map((scene) => (
            <button
              key={scene}
              onClick={() => setCurrentScene(scene)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentScene === scene
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {SceneEngine.getSceneLabel(scene)}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
