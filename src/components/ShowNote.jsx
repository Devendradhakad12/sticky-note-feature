// Show Note Component



export const ShowNote = ({ note, currentNote, setCurrentNote, UpdateNote }) => {
   
  
  return (
    <textarea
      // readOnly={currentNote != note.id ? true : false}
      type="text"
      value={note?.text}
      onDoubleClick={() => setCurrentNote(note.id)}
      id={note.id}
      style={{ left: note.x, top: note.y, backgroundColor: note.bgColor }}
      className=" p-3 absolute read-only:cursor-default read-only:outline-none "
      onChange={(e) => UpdateNote(e)}
       
    />
  );
};

 