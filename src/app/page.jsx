"use client";

import { useState } from "react";
import { StickyNote } from "lucide-react";
 

export default function Home() {
  const [templates, setTemplates] = useState(["slate", "emerald", "red","fuchsia"]);
  const [open, setOpen] = useState(false);


  return (
    <div className="flex min-h-screen flex-col p-24">
      <div>
        <button onClick={() => setOpen((op) => !op)}>
          <StickyNote />
        </button>
        {open && 
        <div className="ml-7">
        {
          templates.map((item)=>(
            <button  className={`w-10 h-10 m-2 bg-${item}-500 border border-${item}-700 flex gap-5`}></button>
          ))
        }
        </div>
        }
      </div>

      <div></div>
    </div>
  );
}
