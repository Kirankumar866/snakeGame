import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ImageViewerProps {
    imageUrl: string | null;
    isLoading: boolean;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl, isLoading }) => {
    return (
        <div className="w-full lg:w-3/5 aspect-video bg-slate-800 rounded-lg shadow-2xl overflow-hidden flex items-center justify-center border-2 border-slate-700/50 transition-all duration-500">
            {isLoading && !imageUrl ? (
                <LoadingSpinner text="Conjuring visuals..." />
            ) : imageUrl ? (
                 <img
                    key={imageUrl}
                    src={imageUrl}
                    alt="Current scene"
                    className="w-full h-full object-cover animate-fade-in"
                    style={{ animation: 'fadeIn 0.8s ease-in-out' }}
                />
            ) : (
                <div className="p-8 text-center text-slate-400">
                    <p>Your adventure's visuals will appear here.</p>
                </div>
            )}
             <style>{`
                @keyframes fadeIn {
                    0% { opacity: 0; transform: scale(0.98); }
                    100% { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default ImageViewer;
