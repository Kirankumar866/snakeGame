import React from 'react';

type Direction = { x: number; y: number };

interface ControlsProps {
    onDirectionChange: (dir: Direction) => void;
}

const Controls: React.FC<ControlsProps> = ({ onDirectionChange }) => {

    const handlePress = (e: React.MouseEvent | React.TouchEvent, dir: Direction) => {
        e.preventDefault();
        onDirectionChange(dir);
    }
    
    return (
        <div className="mt-6 md:hidden">
            <div className="grid grid-cols-3 grid-rows-3 gap-3 w-48 h-48">
                <div className="col-start-2 row-start-1">
                     <ControlButton
                        direction={{ x: 0, y: -1 }}
                        onPress={handlePress}
                        aria-label="Move Up"
                        icon={<ArrowUp />}
                    />
                </div>
                <div className="col-start-1 row-start-2">
                     <ControlButton
                        direction={{ x: -1, y: 0 }}
                        onPress={handlePress}
                        aria-label="Move Left"
                        icon={<ArrowLeft />}
                    />
                </div>
                <div className="col-start-3 row-start-2">
                     <ControlButton
                        direction={{ x: 1, y: 0 }}
                        onPress={handlePress}
                        aria-label="Move Right"
                        icon={<ArrowRight />}
                    />
                </div>
                <div className="col-start-2 row-start-3">
                     <ControlButton
                        direction={{ x: 0, y: 1 }}
                        onPress={handlePress}
                        aria-label="Move Down"
                        icon={<ArrowDown />}
                    />
                </div>
            </div>
        </div>
    );
};

interface ControlButtonProps {
    direction: Direction;
    onPress: (e: React.MouseEvent | React.TouchEvent, dir: Direction) => void;
    icon: React.ReactNode;
    'aria-label': string;
}

const ControlButton: React.FC<ControlButtonProps> = ({ direction, onPress, icon, ...props }) => {
    return (
        <button
            onTouchStart={(e) => onPress(e, direction)}
            onClick={(e) => onPress(e, direction)}
            className="w-full h-full bg-slate-700 rounded-lg flex items-center justify-center text-cyan-400 active:bg-purple-600 active:scale-95 transform transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-purple-500"
            {...props}
        >
           {icon}
        </button>
    );
};

const ArrowUp = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>;
const ArrowDown = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const ArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const ArrowRight = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;

export default Controls;
