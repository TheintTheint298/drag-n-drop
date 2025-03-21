import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Note from "./components/Note";
import Bin from "./components/Bin";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [binnedItems, setBinnedItems] = useState([]);

  useEffect(() => {
    const initialNotes = ["Note 1", "Note 2", "Note 3"];
    localStorage.setItem("notesList", JSON.stringify(initialNotes));

    let array = localStorage.getItem("notesList");
    setNotes(JSON.parse(array));
  }, []);

  useEffect(() => {
    let array = localStorage.getItem("binnedItems");

    if (array) {
      setBinnedItems(JSON.parse(array));
      for (let i = 0; i < notes.length; i++) {
        for (let j = 0; j < binnedItems.length; j++) {
          if (notes[i] === binnedItems[j]) {
            notes.splice(i, 1);
          }
        }
      }
    }
  }, [notes]);

  return (
    <DndProvider backend={HTML5Backend}>
      <h1 className="text-center text-3xl font-semibold mt-4 my-2">
        Drag-n-Drop
      </h1>
      {notes.map((item, i) => (
        <Note
          key={new Date().getTime() + Math.floor(Math.random() * 1000)}
          note={item}
          notes={notes}
          binnedItems={binnedItems}
        />
      ))}
      <Bin binnedItems={binnedItems} />
    </DndProvider>
  );
}

export default App;
