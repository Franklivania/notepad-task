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
    const newNotepad = {
      title,
      content,
      date: new Date().toLocaleString()
    };

    const existingNotepadIndex = notepads.findIndex(
      (notepad) => notepad.title === title
    );

    if (existingNotepadIndex >= 0) {
      const newNotepads = [...notepads];
      newNotepads[existingNotepadIndex] = newNotepad;
      localStorage.setItem("notepads", JSON.stringify(newNotepads));
      setNotepads(newNotepads);
    } else {
      const newNotepads = [...notepads, newNotepad];
      localStorage.setItem("notepads", JSON.stringify(newNotepads));
      setNotepads(newNotepads);
    }

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
            <div className="notepad-title">{notepad.title}</div>
            <div className="notepad-date">{notepad.date}</div>
          </div>
        ))}
      </div>
      {selectedNotepad && (
        <div className="notepad-modal">
          <div className="notepad-modal-content">
            <div className="notepad-modal-header">
              <h2>{selectedNotepad.title}</h2>
              <button onClick={handleModalClose}>Close</button>
            </div>
            <div className="notepad-modal-body">
              <Notepad
                title={selectedNotepad.title}
                data={selectedNotepad.content}
                onSave={handleNotepadSave}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedNotepads;