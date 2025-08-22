import React from 'react';

interface LoadingSpinnerProps {
    text: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
            <p className="text-slate-300 text-lg font-medium">{text}</p>
        </div>
    );
};

export default LoadingSpinner;
