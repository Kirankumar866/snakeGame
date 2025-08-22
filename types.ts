export interface Scene {
  sceneDescription: string;
  choices: string[];
  imagePrompt: string;
}

export type GameState = 'start' | 'playing' | 'loading' | 'error';
