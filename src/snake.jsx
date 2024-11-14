import React, { useState, useEffect, useRef } from "react";
import "./snake.css";

const SnakeGame = () => {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([
    Math.floor(Math.random() * 20),
    Math.floor(Math.random() * 20),
  ]);
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const boardSize = 20; // 20x20 grid

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = newSnake[0];
    let newHead;

    // Calculate new head position
    switch (direction) {
      case "UP":
        newHead = [head[0], head[1] - 1];
        break;
      case "DOWN":
        newHead = [head[0], head[1] + 1];
        break;
      case "LEFT":
        newHead = [head[0] - 1, head[1]];
        break;
      case "RIGHT":
        newHead = [head[0] + 1, head[1]];
        break;
      default:
        return;
    }

    // Check for wall collisions
    if (
      newHead[0] < 0 ||
      newHead[0] >= boardSize ||
      newHead[1] < 0 ||
      newHead[1] >= boardSize
    ) {
      setGameOver(true);
      return;
    }

    // Check for self collisions
    if (
      newSnake
        .slice(1)
        .some(
          (segment) => segment[0] === newHead[0] && segment[1] === newHead[1]
        )
    ) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(newHead); // Add new head to the snake

    // Check for food collision
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood([
        Math.floor(Math.random() * boardSize),
        Math.floor(Math.random() * boardSize),
      ]);
    } else {
      newSnake.pop(); // Remove the last segment of the snake if no food is eaten
    }

    setSnake(newSnake);
  };

  const resetGame = () => {
    setSnake([[5, 5]]);
    setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
    setDirection("RIGHT");
    setGameOver(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    const interval = setInterval(moveSnake, 200);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, [direction, snake]);

  return (
    <div className="game-board">
      {gameOver && (
        <div>
          <div className="game-over">Game Over</div>
          <button className="start-again-button" onClick={resetGame}>
            Start Again
          </button>
        </div>
      )}
      <div className="snake">
        {snake.map((segment, index) => (
          <div
            key={index}
            className="snake-segment"
            style={{ left: segment[0] * 20, top: segment[1] * 20 }}
          />
        ))}
      </div>
      <div className="food" style={{ left: food[0] * 20, top: food[1] * 20 }} />
    </div>
  );
};

export default SnakeGame;
