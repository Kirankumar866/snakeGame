import React from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import GameBoard from './components/GameBoard';
import GameOverlay from './components/GameOverlay';
import Scoreboard from './components/Scoreboard';
import { useSnakeGame } from './hooks/useSnakeGame';

const App: React.FC = () => {
    const {
        snake,
        food,
        score,
        highScore,
        isAlive,
        canvasRef,
        directionRef,
        startGame,
        handleDirectionChange,
    } = useSnakeGame();

    return (
        <div className="min-h-screen bg-slate-900 text-white p-2 sm:p-4 flex flex-col items-center justify-start font-mono select-none">
            <Header />
            <div className="w-full max-w-lg flex flex-col items-center">
                <Scoreboard score={score} highScore={highScore} />

                <div className="relative w-full border-4 border-slate-700 rounded-lg shadow-2xl">
                    <GameBoard
                        snake={snake}
                        food={food}
                        canvasRef={canvasRef}
                        directionRef={directionRef}
                        onDirectionChange={handleDirectionChange}
                    />
                    <GameOverlay isAlive={isAlive} score={score} onStart={startGame} />
                </div>
                
                <Controls onDirectionChange={handleDirectionChange} />
            </div>
        </div>
    );
};

export default App;