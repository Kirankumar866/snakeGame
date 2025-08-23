import React, { useEffect, useRef } from 'react';
import type { Position, Direction } from '../game/types';
import { CANVAS_SIZE, CELL_SIZE } from '../game/constants';

interface GameBoardProps {
    snake: Position[];
    food: Position;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    directionRef: React.RefObject<Direction>;
    onDirectionChange: (dir: Direction) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food, canvasRef, directionRef, onDirectionChange }) => {
    const touchStartRef = useRef<Position | null>(null);
    
    // Canvas drawing
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !directionRef.current) return;

        // Clear canvas
        ctx.fillStyle = '#1e293b'; // slate-800
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Draw food
        ctx.fillStyle = '#f43f5e'; // rose-500
        ctx.beginPath();
        ctx.arc(food.x * CELL_SIZE + CELL_SIZE / 2, food.y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2 * 0.9, 0, 2 * Math.PI);
        ctx.fill();


        // Draw snake
        snake.forEach((segment, index) => {
            ctx.fillStyle = '#67e8f9'; // cyan-300
            
            if (index === 0) { // Head
                const head = segment;
                const dir = directionRef.current;
                
                ctx.fillStyle = '#22d3ee'; // cyan-400
                ctx.fillRect(head.x * CELL_SIZE, head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                
                // Eyes
                ctx.fillStyle = '#1e293b'; // dark bg for contrast
                const eyeSize = CELL_SIZE / 5;
                if (dir.x === 1) { // Right
                    ctx.fillRect(head.x * CELL_SIZE + CELL_SIZE * 0.6, head.y * CELL_SIZE + CELL_SIZE * 0.15, eyeSize, eyeSize);
                    ctx.fillRect(head.x * CELL_SIZE + CELL_SIZE * 0.6, head.y * CELL_SIZE + CELL_SIZE * 0.85 - eyeSize, eyeSize, eyeSize);
                } else if (dir.x === -1) { // Left
                    ctx.fillRect(head.x * CELL_SIZE + CELL_SIZE * 0.4 - eyeSize, head.y * CELL_SIZE + CELL_SIZE * 0.15, eyeSize, eyeSize);
                    ctx.fillRect(head.x * CELL_SIZE + CELL_SIZE * 0.4 - eyeSize, head.y * CELL_SIZE + CELL_SIZE * 0.85 - eyeSize, eyeSize, eyeSize);
                } else if (dir.y === 1) { // Down
                    ctx.fillRect(head.x * CELL_SIZE + CELL_SIZE * 0.15, head.y * CELL_SIZE + CELL_SIZE * 0.6, eyeSize, eyeSize);
                    ctx.fillRect(head.x * CELL_SIZE + CELL_SIZE * 0.85 - eyeSize, head.y * CELL_SIZE + CELL_SIZE * 0.6, eyeSize, eyeSize);
                } else { // Up
                    ctx.fillRect(head.x * CELL_SIZE + CELL_SIZE * 0.15, head.y * CELL_SIZE + CELL_SIZE * 0.4 - eyeSize, eyeSize, eyeSize);
                    ctx.fillRect(head.x * CELL_SIZE + CELL_SIZE * 0.85 - eyeSize, head.y * CELL_SIZE + CELL_SIZE * 0.4 - eyeSize, eyeSize, eyeSize);
                }

            } else if (index === snake.length - 1 && snake.length > 1) { // Tail
                const tail = segment;
                const prev = snake[index - 1];
                const tailDirX = tail.x - prev.x;
                const tailDirY = tail.y - prev.y;

                ctx.beginPath();
                const x = tail.x * CELL_SIZE;
                const y = tail.y * CELL_SIZE;

                if (tailDirX === 1) { // coming from left
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + CELL_SIZE);
                    ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE / 2);
                } else if (tailDirX === -1) { // coming from right
                    ctx.moveTo(x + CELL_SIZE, y);
                    ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE);
                    ctx.lineTo(x, y + CELL_SIZE / 2);
                } else if (tailDirY === 1) { // coming from top
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + CELL_SIZE, y);
                    ctx.lineTo(x + CELL_SIZE / 2, y + CELL_SIZE);
                } else { // coming from bottom
                    ctx.moveTo(x, y + CELL_SIZE);
                    ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE);
                    ctx.lineTo(x + CELL_SIZE / 2, y);
                }
                ctx.closePath();
                ctx.fill();

            } else { // Body
                ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                ctx.strokeStyle = '#0e7490'; // cyan-700
                ctx.strokeRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        });
    }, [snake, food, canvasRef, directionRef]);

    // Touch (swipe) input handler
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!touchStartRef.current) return;
            e.preventDefault();
            const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
            const dx = touchEnd.x - touchStartRef.current.x;
            const dy = touchEnd.y - touchStartRef.current.y;
            const minSwipeDistance = 20;

            if (Math.abs(dx) > Math.abs(dy)) { // Horizontal swipe
                if (dx > minSwipeDistance) onDirectionChange({ x: 1, y: 0 }); // Right
                else if (dx < -minSwipeDistance) onDirectionChange({ x: -1, y: 0 }); // Left
            } else { // Vertical swipe
                if (dy > minSwipeDistance) onDirectionChange({ x: 0, y: 1 }); // Down
                else if (dy < -minSwipeDistance) onDirectionChange({ x: 0, y: -1 }); // Up
            }
            touchStartRef.current = null;
        };
        
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

        return () => {
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchend', handleTouchEnd);
        };
    }, [onDirectionChange, canvasRef]);


    return (
        <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="bg-slate-800 rounded w-full h-auto"
        />
    );
};

export default GameBoard;