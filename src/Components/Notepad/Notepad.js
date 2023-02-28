import React, { useState, useEffect } from "react";
import "./Notepad.scss";

const Notepad = ({ title: defaultTitle, data, onSave }) => {
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(data);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setContent(data);
  }, [data]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleSaveClick = () => {
    onSave(title, content);
    alert(`"${title}" has been saved to local storage.`);
  };

  const handleFormatClick = (format) => {
    switch (format) {
      case "bold":
        setBold(!bold);
        break;
      case "italic":
        setItalic(!italic);
        break;
      case "underline":
        setUnderline(!underline);
        break;
      default:
        break;
    }
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const newImages = [...images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const img = `<img src="${reader.result}" alt="${file.name}"/>`;
        newImages.push(img);
        setContent(`${content} ${img}`);
        setImages(newImages);
      };
    }
  };

  const formatButtons = [
    { label: "B", style: "bold", active: bold },
    { label: "I", style: "italic", active: italic },
    { label: "U", style: "underline", active: underline }
  ];

  const inlineStyle = {
    fontWeight: bold ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
    textDecoration: underline ? "underline" : "none"
  };

  return (
    <div className="notepad">
      <div className="notepad-toolbar">
        {formatButtons.map((button) => (
          <button
            key={button.style}
            className={button.active ? "active" : ""}
            onClick={() => handleFormatClick(button.style)}
          >
            {button.label}
          </button>
        ))}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter a title"
      />
      <textarea
        className="notepad-container"
        onChange={handleInputChange}
        style={inlineStyle}
        value={content}
      />
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default Notepad;
