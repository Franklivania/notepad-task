import React, { useState, useEffect } from "react";
import "./SavedNotepads.scss";
import Notepad from "../../Components/Notepad/Notepad";

const SavedNotepads = () => {
  const [notepads, setNotepads] = useState([]);
  const [selectedNotepad, setSelectedNotepad] = useState(null);

  useEffect(() => {
    const savedNotepads = JSON.parse(localStorage.getItem("notepads")) || [];
    setNotepads(savedNotepads);
  }, []);

  const handleNotepadClick = (notepad) => {
    setSelectedNotepad(notepad);
  };

  const handleModalClose = () => {
    setSelectedNotepad(null);
  };

  const handleNotepadSave = (title, content) => {
    const newNotepads = [...notepads];
    const existingNotepadIndex = newNotepads.findIndex(
      (notepad) => notepad.title === title
    );

    if (existingNotepadIndex >= 0) {
      newNotepads[existingNotepadIndex] = { title, content };
    } else {
      newNotepads.push({ title, content });
    }

    localStorage.setItem("notepads", JSON.stringify(newNotepads));
    setNotepads(newNotepads);
    setSelectedNotepad(null);

    alert("Notepad has been saved to local storage.");
  };

  return (
    <div className="saved-notepads">
      <h2>Saved Notepads</h2>
      <div className="notepad-list">
        {notepads.map((notepad) => (
          <div
            key={notepad.title}
            className="notepad-list-item"
            onClick={() => handleNotepadClick(notepad)}
          >
            {notepad.title}
          </div>
        ))}
      </div>
      {selectedNotepad && (
        <div className="notepad-modal">
          <div className="notepad-modal-content">
            <button className="close-button" onClick={handleModalClose}>
              X
            </button>
            <Notepad
              title={selectedNotepad.title}
              data={selectedNotepad.content}
              onSave={handleNotepadSave}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedNotepads;
