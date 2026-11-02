import { useState } from "react";
import { startAmbient, stopAmbient } from "../sound.js";

export default function SoundToggle() {
  const [on, setOn] = useState(false);

  const toggle = () => {
    if (on) stopAmbient();
    else startAmbient();
    setOn(!on);
  };

  return (
    <button
      className={`sound-btn ${on ? "on" : "pulse"}`}
      onClick={toggle}
      aria-label="Toggle ocean sound"
    >
      {on ? "🔊 Ocean Sound: ON" : "🔇 Click for Ocean Sound"}
    </button>
  );
}
