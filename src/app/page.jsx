"use client";

import { useState } from "react";
import { StickyNote } from "lucide-react";
import clsx from "clsx";
import Whiteboard from "@/components/drag";

// Show Note Function
const ShowNote = ({ note, currentNote, setCurrentNote }) => {
  return (
    <input
      readOnly={currentNote !== note.id ? true : false}
      type="text"
      value={note?.text}
      onDoubleClick={() => setCurrentNote(note.id)}
      style={{ left: note.x, top: note.y, backgroundColor: note.bgColor }}
      className=" w-[50px] h-[50px] absolute read-only:cursor-default read-only:outline-none "
      onChange={() => {}}
    />
  );
};

// Main Function
export default function WhiteBoard() {
  const [templates, setTemplates] = useState([
    "yellow",
    "hotpink",
    "red",
    "fuchsia",
  ]);
  const [open, setOpen] = useState(false);
  const [pickColor, setPickColor] = useState(null);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  // Color Picker Handler
  const handlePickColor = (color) => {
    setPickColor(color);
    setOpen(false);
  };

  //  Whiteboard Click Handler
  const handleWhiteboardClick = (event) => {
    if (pickColor !== null) {
      const { offsetX, offsetY } = event.nativeEvent;
      const newNote = {
        id: Date.now(),
        x: offsetX,
        y: offsetY,
        text: "",
        bgColor: pickColor,
      };
      setCurrentNote(newNote.id);
      setNotes((prev) => [...prev, newNote]);
      setPickColor(null);
      return;
    }
    setCurrentNote(null);
  };

  return (
    <div
      className="flex min-h-screen flex-col p-24"
      onClick={handleWhiteboardClick}
    >
      {/* Sticky Note Button */}
      <div className="relative">
        <button onClick={() => setOpen((op) => !op)}>
          <StickyNote />
        </button>
        {open && (
          <div className="ml-7 absolute top-1 left-1">
            {templates?.map((item) => (
              <div
                key={item}
                draggable="true"
                onClick={() => handlePickColor(item)}
                className={clsx(
                  `w-10 h-10 m-2 border flex gap-5 cursor-pointer`
                )}
                style={{ backgroundColor: item }}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Notes */}
      <div>
        {notes.length ? (
          <>
            {notes.map((note) => (
              <ShowNote
                note={note}
                key={note.id}
                currentNote={currentNote}
                setCurrentNote={setCurrentNote}
              />
            ))}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
