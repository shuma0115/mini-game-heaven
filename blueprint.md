# Project: Gomoku Game

## Overview

This project is a web-based, single-player Gomoku (Omok) game against a computer opponent. The game aims to follow Renju rules for the human player, is presented in Korean, and features realistic sound effects.

## Features

### Core Gameplay
- **Single-Player vs. AI:** The game is designed for a single human player (playing as black) against a computer AI (playing as white).
- **15x15 Game Board:** A standard Gomoku board rendered on an HTML5 canvas.
- **AI Opponent:** A basic AI opponent is implemented. The AI will prioritize moves that win the game or block the player from winning.
- **Reset Game:** A button is available to reset the game at any time.

### Renju Rules (for Human Player)
- **Win Condition:** The first player to get an unbroken row of exactly five stones wins.
- **Black's Prohibitions:** The human player (black) is subject to the following forbidden moves, which will result in a loss:
  - **Overlines:** Forming a row of six or more stones.
  - **Double Threes (3x3):** Placing a stone that simultaneously forms two or more open-three rows.
  - **Double Fours (4x4):** Placing a stone that simultaneously forms two or more four-rows.
- **White's Advantages:** The computer player (white) is not subject to these prohibitions.

### User Interface and Experience
- **Language:** All in-game text, including status messages and button labels, is in Korean.
- **Visual Feedback:** The game board and stones are clearly rendered, and the current player's turn is displayed.
- **Sound Effects:**
  - A more realistic, synthesized sound of a stone being placed on a board is played.
  - A winning sound is played when the player wins.
  - A losing sound is played when the player loses or makes a forbidden move.

## Technical Implementation

- **Frontend:** The game is built using HTML, CSS, and JavaScript, with all the code contained within the `index.html` file.
- **Graphics:** The game board and stones are drawn using the HTML5 Canvas API.
- **Game Logic:** The game state is managed in JavaScript, with a 2D array representing the board.
- **AI:** A simple, score-based evaluation function is used to find the best move for the computer.
- **Audio:** The sound effects are generated programmatically using the Web Audio API.
