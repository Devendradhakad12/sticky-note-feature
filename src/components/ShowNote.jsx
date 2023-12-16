"use client";

import { useState } from "react";

// Show Note Component
export const ShowNote = ({ note, UpdateNote }) => {
  const [fontSize,setFontSize] = useState(12)
  const [charCount,setCharCount] = useState(25)
  const calculateFontSize = () => {
    if (charCount == note.text.length) {
     setFontSize(fontSize-2)
      setCharCount(charCount*2)
    }
    return `${fontSize}px`;
  };

  return (
    <textarea
      type="text"
      value={note?.text}
      id={note.id}
      style={{
        left: note.x,
        top: note.y,
        backgroundColor: note.bgColor,
        fontSize: calculateFontSize(),
        color: "black",
        padding: "12px",
        position: "absolute",
      }}
      onChange={(e) => UpdateNote(e)}
    />
  );
};
