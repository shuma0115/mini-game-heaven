# Project: Gomoku Game

## Overview

This project is a web-based Gomoku (Omok) game with Renju rules, implemented in a single `index.html` file. The game features a canvas-based board, sound effects, and Korean language support.

## Features

- **Gomoku Game Logic:** Players can place stones on a 15x15 board.
- **Renju Rules:**
    - The game checks for a line of five stones to determine the winner.
    - **Overline Rule:** The "overline" rule for Black (six or more stones in a row results in a loss) is implemented.
    - **3x3 and 4x4 Rules:** An implementation for detecting double threes and double fours for the black player is in place. However, a full and accurate implementation of these Renju rules is highly complex and requires sophisticated pattern matching. The current implementation is an improvement but may not cover all edge cases perfectly.
- **Sound Effects:** The Web Audio API is used to generate and play sounds for:
    - Placing a stone.
    - Winning the game.
    - Losing the game.
- **UI:**
    - The game board is rendered on an HTML5 canvas.
    - A status display shows whose turn it is and the game result.
    - A "New Game" button allows players to reset the board.
- **Language:** All in-game text is in Korean.

## File Structure

- **`index.html`**: Contains the entire application, including HTML structure, CSS for styling, and JavaScript for game logic and sound effects.
