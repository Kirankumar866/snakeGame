import React from 'react';
import type { Scene } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface StoryPanelProps {
    scene: Scene | null;
    isLoading: boolean;
    onChoice: (choice: string) => void;
}

const StoryPanel: React.FC<StoryPanelProps> = ({ scene, isLoading, onChoice }) => {
    return (
        <div className="w-full lg:w-2/5 flex flex-col p-6 bg-slate-800/50 rounded-lg shadow-xl border border-slate-700/50 backdrop-blur-sm">
            <div className="flex-grow overflow-y-auto pr-2">
                {isLoading && !scene ? (
                    <div className="h-full flex items-center justify-center">
                        <LoadingSpinner text="Weaving the threads of fate..." />
                    </div>
                ) : scene ? (
                    <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">{scene.sceneDescription}</p>
                ) : (
                     <div className="h-full flex items-center justify-center text-slate-400">
                        <p>The story will unfold here.</p>
                    </div>
                )}
            </div>
            {scene && (
                <div className="mt-6 pt-6 border-t border-slate-700">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">What do you do?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {scene.choices.map((choice, index) => (
                            <button
                                key={index}
                                onClick={() => onChoice(choice)}
                                disabled={isLoading}
                                className="w-full text-left p-4 bg-slate-700 text-slate-200 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                            >
                                {choice}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoryPanel;
