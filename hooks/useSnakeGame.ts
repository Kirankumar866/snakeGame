import { useState, useEffect, useRef, useCallback } from 'react';
import type { Position, Direction } from '../game/types';
import {
    GRID_SIZE,
    INITIAL_SPEED_MS,
    MIN_SPEED_MS,
    SPEED_INCREMENT,
} from '../game/constants';

// --- Initial State ---
const getInitialSnake = (): Position[] => [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
const getInitialFood = (): Position => ({ x: 15, y: 15 });


export const useSnakeGame = () => {
    // --- State & Refs ---
    const [snake, setSnake] = useState<Position[]>(getInitialSnake);
    const [food, setFood] = useState<Position>(getInitialFood);
    const [score, setScore] = useState<number>(0);
    const [highScore, setHighScore] = useState<number>(0);
    const [speed, setSpeed] = useState<number>(INITIAL_SPEED_MS);
    const [isAlive, setIsAlive] = useState<boolean>(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const directionRef = useRef<Direction>({ x: 1, y: 0 });
    const nextDirectionRef = useRef<Direction>({ x: 1, y: 0 });

    // --- Game Logic ---
    const spawnFood = useCallback((currentSnake: Position[]): Position => {
        let newFoodPosition: Position;
        do {
            newFoodPosition = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
        } while (currentSnake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));
        return newFoodPosition;
    }, []);

    const startGame = useCallback(() => {
        const initialSnake = getInitialSnake();
        setSnake(initialSnake);
        setFood(spawnFood(initialSnake));
        setScore(0);
        setSpeed(INITIAL_SPEED_MS);
        directionRef.current = { x: 1, y: 0 };
        nextDirectionRef.current = { x: 1, y: 0 };
        setIsAlive(true);
    }, [spawnFood]);

    const handleDirectionChange = useCallback((newDirection: Direction) => {
        if (!isAlive) return;
        // Prevent 180-degree reversal unless snake is length 1
        const isReversal = snake.length > 1 && (directionRef.current.x === -newDirection.x && directionRef.current.y === -newDirection.y);
        if (!isReversal) {
            nextDirectionRef.current = newDirection;
        }
    }, [snake.length, isAlive]);

    const gameTick = useCallback(() => {
        setSnake(prevSnake => {
            directionRef.current = nextDirectionRef.current;
            const head = prevSnake[0];
            const newHead: Position = {
                x: head.x + directionRef.current.x,
                y: head.y + directionRef.current.y,
            };

            // Check for collisions
            const hitWall = newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE;
            const hitSelf = prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y);

            if (hitWall || hitSelf) {
                setIsAlive(false);
                if (score > highScore) {
                    setHighScore(score);
                    localStorage.setItem('snakeHighScore', score.toString());
                }
                return prevSnake; // End game
            }

            const newSnake = [newHead, ...prevSnake];

            // Check for food
            if (newHead.x === food.x && newHead.y === food.y) {
                setScore(prev => prev + 10);
                setSpeed(prev => Math.max(MIN_SPEED_MS, prev - SPEED_INCREMENT));
                setFood(spawnFood(newSnake));
                // Don't pop tail to grow
            } else {
                newSnake.pop(); // Move normally
            }

            return newSnake;
        });
    }, [food, score, highScore, spawnFood]);

    // --- Effects ---

    // Load high score from local storage
    useEffect(() => {
        const storedHighScore = localStorage.getItem('snakeHighScore');
        if (storedHighScore) {
            setHighScore(parseInt(storedHighScore, 10));
        }
    }, []);

    // Keyboard input handler
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const keyMap: { [key: string]: Direction } = {
                'ArrowUp': { x: 0, y: -1 }, 'w': { x: 0, y: -1 },
                'ArrowDown': { x: 0, y: 1 }, 's': { x: 0, y: 1 },
                'ArrowLeft': { x: -1, y: 0 }, 'a': { x: -1, y: 0 },
                'ArrowRight': { x: 1, y: 0 }, 'd': { x: 1, y: 0 },
            };
            const newDirection = keyMap[e.key];

            if (newDirection) {
                e.preventDefault();
                handleDirectionChange(newDirection);
            } else if (e.key === 'Enter' || e.key === ' ') {
                 e.preventDefault();
                if (!isAlive) {
                    startGame();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isAlive, startGame, handleDirectionChange]);

    // Main game loop
    useEffect(() => {
        if (!isAlive) return;
        const interval = setInterval(gameTick, speed);
        return () => clearInterval(interval);
    }, [isAlive, speed, gameTick]);

    return {
        snake,
        food,
        score,
        highScore,
        speed,
        isAlive,
        canvasRef,
        directionRef,
        startGame,
        handleDirectionChange,
    };
};