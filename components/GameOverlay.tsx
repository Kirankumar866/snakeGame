import React from 'react';

interface GameOverlayProps {
    isAlive: boolean;
    score: number;
    onStart: () => void;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ isAlive, score, onStart }) => {
    if (isAlive) {
        return null;
    }

    return (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center backdrop-blur-sm rounded">
            <h2 className="text-4xl font-bold text-red-500">{score > 0 ? 'Game Over' : 'Ready?'}</h2>
            {score > 0 && <p className="text-xl mt-2">Your score: {score}</p>}
            <button
                onClick={onStart}
                className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xl rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 active:scale-100"
            >
                {score > 0 ? 'Restart' : 'Start Game'}
            </button>
            <p className="mt-4 text-slate-400 text-sm px-2">Use Arrow Keys, WASD, or Swipe to move.</p>
        </div>
    );
};

export default GameOverlay;
