import React from 'react';

interface ScoreboardProps {
    score: number;
    highScore: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, highScore }) => {
    return (
        <div className="w-full max-w-md flex justify-between items-center my-4 text-lg">
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
                <span>SCORE: </span>
                <span className="font-bold text-cyan-400">{score}</span>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
                <span>HIGH SCORE: </span>
                <span className="font-bold text-purple-400">{highScore}</span>
            </div>
        </div>
    );
};

export default Scoreboard;
