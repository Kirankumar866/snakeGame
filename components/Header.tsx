import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="w-full p-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-lg">
                Snake Game
            </h1>
        </header>
    );
};

export default Header;