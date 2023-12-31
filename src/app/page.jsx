"use client";

import { ShowNote } from "@/components/ShowNote";
import clsx from "clsx";
import { StickyNote } from "lucide-react";
import { useState } from "react";
import AnimatedCursor from "react-animated-cursor"

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
      setNotes((prev) => [...prev, newNote]);
      setPickColor(null);
      return;
    }
    
  };

  // Update Note Function
  const UpdateNote = (e) => {
    let updatedNote = notes.map((note) => {
      if (note.id == e.target.id) {
        note.text = e.target.value;
      }
      return note;
    });
    setNotes(updatedNote);
  };

  return (
    <div
      className={`flex min-h-screen flex-col p-24`}
      onClick={handleWhiteboardClick}
    >
       <AnimatedCursor showSystemCursor={pickColor === null ? true : false}  /> 
   
      {/* Sticky Note Button */}
      <div className="relative">
        <button onClick={() => setOpen((op) => !op)}>
          <StickyNote />
        </button>
        {open && (
          <div className="ml-7 z-50 absolute top-1 left-1">
            {templates?.map((item) => (
              <div
                key={item}
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
                UpdateNote={UpdateNote}
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
