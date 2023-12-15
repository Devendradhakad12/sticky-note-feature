"use client"
import React, { useState } from 'react';
 

const StickyNote = ({ note, isSelected, onSelect, onDragStart, onDragEnd }) => {
  return (
    <div
      className={`sticky-note ${isSelected ? 'selected' : ''}`}
      style={{ left: note.x, top: note.y }}
      onMouseDown={(e) => onDragStart(e, note)}
      onMouseUp={() => onDragEnd(note)}
      onClick={() => onSelect(note.id)}
    >
      {note.text}
    </div>
  );
};

const Whiteboard = () => {
  const [stickies, setStickies] = useState(["k"]);
  const [selectedSticky, setSelectedSticky] = useState(null);
  const [draggedSticky, setDraggedSticky] = useState(null);

  const handleStickyClick = (stickyId) => {
    setSelectedSticky(stickyId);
  };

  const handleDragStart = (event, sticky) => {
    event.preventDefault();
    setDraggedSticky(sticky);
  };

  const handleDragEnd = (sticky) => {
    setDraggedSticky(null);
    setStickies((prevStickies) =>
      prevStickies.map((s) => (s.id === sticky.id ? { ...s, x: sticky.x, y: sticky.y } : s))
    );
  };

  const handleWhiteboardClick = (event) => {
    if (selectedSticky !== null) {
      const { offsetX, offsetY } = event.nativeEvent;
      const newSticky = { id: Date.now(), x: offsetX, y: offsetY, text: "Your Note Text" };
      setStickies((prevStickies) => [...prevStickies, newSticky]);
      setSelectedSticky(null)
    }
  };

  return (
    <div className="whiteboard" onClick={handleWhiteboardClick}>
      {stickies.map((sticky) => (
        <StickyNote
          key={sticky.id}
          note={sticky}
          isSelected={selectedSticky === sticky.id}
          onSelect={handleStickyClick}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
};

export default Whiteboard;
