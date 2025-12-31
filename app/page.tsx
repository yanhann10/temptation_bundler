"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, Circle, Sparkles, Target, Trophy } from "lucide-react";

interface Bundle {
  id: string;
  need: string;
  want: string;
  completed: boolean;
  createdAt: Date;
}

export default function Home() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [need, setNeed] = useState("");
  const [want, setWant] = useState("");
  const [showExamples, setShowExamples] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("resolution-bundles");
    if (saved) {
      const parsed = JSON.parse(saved);
      setBundles(parsed.map((b: any) => ({ ...b, createdAt: new Date(b.createdAt) })));
      setShowExamples(false);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (bundles.length > 0) {
      localStorage.setItem("resolution-bundles", JSON.stringify(bundles));
    }
  }, [bundles]);

  const addBundle = (e: React.FormEvent) => {
    e.preventDefault();
    if (need.trim() && want.trim()) {
      const newBundle: Bundle = {
        id: Date.now().toString(),
        need: need.trim(),
        want: want.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setBundles([newBundle, ...bundles]);
      setNeed("");
      setWant("");
      setShowExamples(false);
    }
  };

  const toggleComplete = (id: string) => {
    setBundles(bundles.map(b => b.id === id ? { ...b, completed: !b.completed } : b));
  };

  const deleteBundle = (id: string) => {
    setBundles(bundles.filter(b => b.id !== id));
  };

  const completedCount = bundles.filter(b => b.completed).length;
  const completionRate = bundles.length > 0 ? Math.round((completedCount / bundles.length) * 100) : 0;

  const examples = [
    { need: "Exercise for 30 minutes", want: "Watch next episode of favorite show" },
    { need: "Study for 1 hour", want: "Listen to favorite music or podcast" },
    { need: "Write 500 words", want: "Have fancy coffee at favorite café" },
    { need: "Practice instrument for 45 min", want: "Video call with best friend" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Resolution Bundler
            </h1>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Build lasting habits with <span className="font-semibold">temptation bundling</span> –
            pair what you <span className="text-purple-600 dark:text-purple-400 font-semibold">need</span> to do
            with what you <span className="text-blue-600 dark:text-blue-400 font-semibold">want</span> to do.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Based on <i>Atomic Habits</i> by James Clear
          </p>
        </div>

        {/* Stats */}
        {bundles.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
                  <Target className="w-6 h-6" />
                  {bundles.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Bundles</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-green-600 dark:text-green-400">
                  <Trophy className="w-6 h-6" />
                  {completedCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {completionRate}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>
        )}

        {/* Create Bundle Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Create Your Bundle
          </h2>
          <form onSubmit={addBundle} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">
                I NEED to...
              </label>
              <input
                type="text"
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                placeholder="e.g., Exercise for 30 minutes"
                className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 dark:border-purple-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                I WANT to...
              </label>
              <input
                type="text"
                value={want}
                onChange={(e) => setWant(e.target.value)}
                placeholder="e.g., Watch my favorite TV show"
                className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-5 h-5" />
              Create Bundle
            </button>
          </form>
        </div>

        {/* Examples */}
        {showExamples && bundles.length === 0 && (
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              💡 Example Bundles
            </h3>
            <div className="space-y-3">
              {examples.map((ex, i) => (
                <div key={i} className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 text-sm">
                  <div className="text-purple-700 dark:text-purple-300 font-medium">Need: {ex.need}</div>
                  <div className="text-blue-700 dark:text-blue-300 font-medium">Want: {ex.want}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bundles List */}
        {bundles.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Your Bundles
            </h2>
            {bundles.map((bundle) => (
              <div
                key={bundle.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all ${
                  bundle.completed ? "opacity-75" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(bundle.id)}
                    className="mt-1 flex-shrink-0 transition-transform hover:scale-110"
                  >
                    {bundle.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className={bundle.completed ? "line-through text-gray-500 dark:text-gray-500" : ""}>
                      <div className="mb-2">
                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">NEED:</span>
                        <span className="ml-2 text-gray-800 dark:text-gray-100">{bundle.need}</span>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">WANT:</span>
                        <span className="ml-2 text-gray-800 dark:text-gray-100">{bundle.want}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Created {bundle.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteBundle(bundle.id)}
                    className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">How It Works</h3>
          <p className="mb-4">
            Temptation bundling is a strategy to make hard habits more attractive by pairing
            something you need to do with something you want to do. Only allow yourself the reward
            after completing the necessary task.
          </p>
          <p className="text-xs">
            💡 Tip: The key is to <strong>only</strong> do the thing you want after completing
            the thing you need. This creates a powerful motivation loop!
          </p>
        </div>
      </div>
    </div>
  );
}
