import React, { useEffect, useState } from "react";
import "./CharacterTransition.css";

export default function CharacterTransition({ onFinish }) {
  const [stage, setStage] = useState(0); // 0=sad, 1=neutral, 2=calm, 3=happy
  const messages = [
    "It's okay to feel down sometimes...",
    "Take a slow, deep breath...",
    "You're becoming lighter, calmer...",
    "You're safe. Ready to begin your journey 💚"
  ];

  useEffect(() => {
    const timings = [0, 1600, 3200, 4800];

    timings.forEach((t, i) => {
      setTimeout(() => setStage(i), t);
    });

    setTimeout(() => {
      if (onFinish) onFinish();
    }, 6400);
  }, [onFinish]);

  return (
    <div className="character-trans-container enhanced-bg">
      {/* Floating particles */}
      <div className="particle p1"></div>
      <div className="particle p2"></div>
      <div className="particle p3"></div>

      <div className="character-wrapper enhanced-glow">
        <div className={`face stage-${stage}`}>
          <div className="eyebrows">
            <div className="brow left"></div>
            <div className="brow right"></div>
          </div>

          <div className="eyes">
            <div className="eye"></div>
            <div className="eye"></div>
          </div>

          <div className="mouth"></div>
        </div>
      </div>

      <p className="transition-text fade-text">
        {messages[stage]}
      </p>
    </div>
  );
}
