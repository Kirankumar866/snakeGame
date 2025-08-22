# React Snake Game 🐍

A modern and responsive implementation of the classic Snake game, built with React, TypeScript, and Tailwind CSS. Eat the food, grow your snake, and chase the high score!

This project features a clean, component-based architecture using custom hooks to separate game logic from the UI, and it's fully playable on both desktop and mobile devices.

## ✨ Features

*   **Classic Gameplay**: The timeless fun of Snake, reimagined with a modern aesthetic.
*   **Responsive Design**: A fluid layout that looks great and works perfectly on any screen size.
*   **Multiple Control Schemes**:
    *   **Keyboard**: Use `Arrow Keys` or `WASD` for precise control on desktop.
    *   **On-screen D-Pad**: A familiar D-pad for mobile users.
    *   **Swipe Gestures**: Intuitive swipe controls on the game board for touch devices.
*   **Persistent High Score**: Your high score is automatically saved to your browser's local storage.
*   **Increasing Difficulty**: The snake's speed increases as you eat more food, keeping the game challenging.
*   **Smooth Animations**: Clean and fluid rendering on an HTML5 Canvas with custom-drawn snake head and tail details.

## 🛠️ Tech Stack

*   **Frontend**: [React](https://react.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Rendering**: HTML5 `<canvas>` API
*   **Module Bundling**: No build step needed! Uses modern ES Modules and an import map.

## 🕹️ How to Play

The goal is simple: control the snake to eat the food and grow longer. The game ends if the snake runs into the screen boundaries or its own tail.

*   **Desktop**: Use the **Arrow Keys** or **W/A/S/D** keys to change the snake's direction.
*   **Mobile**: Use the **on-screen D-pad** or simply **swipe** on the game board in the direction you want to go.
*   **Start/Restart**: Press **Enter**, **Spacebar**, or the on-screen button to start or restart the game.

## 📂 Project Structure

The codebase is organized for clarity and maintainability, separating concerns into distinct modules:

```
/
├── components/         # Reusable React UI components
│   ├── Controls.tsx
│   ├── GameBoard.tsx
│   ├── GameOverlay.tsx
│   ├── Header.tsx
│   └── Scoreboard.tsx
│
├── game/               # Core game constants and types
│   ├── constants.ts
│   └── types.ts
│
├── hooks/              # Custom React hooks for state and logic
│   └── useSnakeGame.ts
│
├── App.tsx             # Main application component
├── index.tsx           # Entry point for the React app
└── index.html          # The single HTML page
```

This structure makes it easy to understand how the different parts of the game work together, with `useSnakeGame.ts` containing the core game logic and the `components` directory handling all rendering.
