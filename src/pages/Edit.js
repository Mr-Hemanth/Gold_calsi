import React, { useState } from 'react';
import { useGlobal } from './GlobalContext';
import './Edit.css'; // Import the CSS file


const Edit = () => {
  const { setGoldRate, setSilverRate } = useGlobal(); // Updated function names
  const [newGoldRate, setNewGoldRate] = useState('');
  const [newSilverRate, setNewSilverRate] = useState('');

  const handleGoldRateChange = (e) => {
    setNewGoldRate(e.target.value);
  };

  const handleSilverRateChange = (e) => {
    setNewSilverRate(e.target.value);
  };

  const handleSave = () => {
    setGoldRate(newGoldRate); // Updated function names
    setSilverRate(newSilverRate); // Updated function names
    alert('Rates successfully saved!');
  };

  return (
    <div>
      <h2>Edit Rates</h2>
      <div>
        <label>New Gold Rate:</label>
        <input type="text" value={newGoldRate} onChange={handleGoldRateChange} />
      </div>
      <div>
        <label>New Silver Rate:</label>
        <input type="text" value={newSilverRate} onChange={handleSilverRateChange} />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Edit;
