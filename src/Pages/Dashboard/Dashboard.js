import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Notepad from '../../Components/Notepad/Notepad';
import './Dashboard.scss';

const Dashboard = () => {
  const [editorState, setEditorState] = useState(null);

  const handleSave = (data) => {
    setEditorState(data);
  };
  
  return (
    <div className='dashboard'>
      <Navbar/>
      <Notepad 
        data={editorState}
        onSave={handleSave}
        placeholder="Start typing here..."
        showSaveButton
      />
    </div>
  );
}

export default Dashboard;
