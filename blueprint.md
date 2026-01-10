# Project: Gomoku Game

## Overview

This project is a web-based, single-player Gomoku (Omok) game against a computer opponent with selectable difficulty. The game follows Renju rules for the human player, is presented in Korean, and features realistic sound effects.

## Features

### Core Gameplay
- **Single-Player vs. AI:** The game is for a single human player (black) against a computer AI (white).
- **5-Level AI Difficulty:** The AI has 5 difficulty levels:
    1.  **Easiest:** Plays a random move.
    2.  **Beginner:** Plays a random move adjacent to an existing stone.
    3.  **Intermediate:** Looks for immediate win/block opportunities.
    4.  **Hard:** Uses a board evaluation function to score moves based on creating lines of 2, 3, and 4.
    5.  **Expert:** Uses a more aggressive evaluation function to prioritize offense.
- **15x15 Game Board:** A standard Gomoku board rendered on an HTML5 canvas.
- **Reset Game:** A button is available to reset the game at any time.

### Renju Rules (for Human Player)
- **Win Condition:** The first player to get an unbroken row of exactly five stones wins.
- **Black's Prohibitions:** The human player (black) is subject to the following forbidden moves, which will result in a loss:
  - **Overlines:** Forming a row of six or more stones.
  - **Double Threes (3x3) & Double Fours (4x4):** A simplified check for these rules is in place. A complete and perfect implementation is highly complex and is noted as a potential area for future improvement.
- **White's Advantages:** The computer player (white) is not subject to these prohibitions.

### User Interface and Experience
- **Language:** All in-game text is in Korean.
- **Difficulty Selection:** A dropdown menu allows the player to choose the AI difficulty before starting a game.
- **Sound Effects:**
  - A more realistic, synthesized sound of a stone being placed on a board is played.
  - Sounds for winning and losing are included.

## Technical Implementation

- **Frontend:** The game is built using HTML, CSS, and JavaScript, with all code contained within the `index.html` file.
- **Graphics:** The game board and stones are drawn using the HTML5 Canvas API.
- **AI:** The AI uses different strategies based on the selected difficulty, ranging from random moves to a score-based evaluation of potential moves.
- **Audio:** The sound effects are generated programmatically using the Web Audio API.
