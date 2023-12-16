"use client";

import { useRef } from "react";

// Show Note Component
export const ShowNote = ({ note, currentNote, setCurrentNote, UpdateNote }) => {
  const calculateFontSize = () => {
    const baseFontSize = 16;
    const scaleFactor = 0.9;
    const maxFontSize = 30;

    const lines = note.text.split(" ").length;
    const calculatedFontSize = Math.min(
      maxFontSize,
      baseFontSize * scaleFactor ** lines
    );
    return `${calculatedFontSize}px`;
  };

  return (
    <textarea
      // readOnly={currentNote != note.id ? true : false}
      type="text"
      value={note?.text}
      onDoubleClick={() => setCurrentNote(note.id)}
      id={note.id}
      style={{
        left: note.x,
        top: note.y,
        backgroundColor: note.bgColor,
        fontSize: calculateFontSize(),
      }}
      className=" p-3 absolute read-only:cursor-default read-only:outline-none "
      onChange={(e) => UpdateNote(e)}
    />
  );
};
