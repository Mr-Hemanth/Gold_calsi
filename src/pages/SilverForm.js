import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useGlobal } from './GlobalContext';
import { Link } from 'react-router-dom'; 

function SilverForm() {
  const { silverRate } = useGlobal();
  const [ornamentWeight, setOrnamentWeight] = useState('');
  const [stoneWeight, setStoneWeight] = useState('');
  const [wastage, setWastage] = useState('');
  const [makingCharges, setMakingCharges] = useState('');
  const [total, setTotal] = useState('');
  const [showTotal, setShowTotal] = useState(false); // State to control showing total
  const [selectedPurity, setSelectedPurity] = useState(''); // Default selected purity
  const [exchangeItem, setExchangeItem] = useState(false); // State to track exchange item
  const [exchangeOrnamentWeight, setExchangeOrnamentWeight] = useState('');
  const [exchangePurity, setExchangePurity] = useState('');
  const [exchangeWasteWeight, setExchangeWasteWeight] = useState('');

  const handleOrnamentWeightChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setOrnamentWeight(value);
    } else {
      alert('Please enter only numeric values.');
    }
  };

  const handleStoneWeightChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setStoneWeight(value);
    } else {
      alert('Please enter only numeric values.');
    }
  };

  const handleWastageChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setWastage(value);
    } else {
      alert('Please enter only numeric values.');
    }
  };

  const handleMakingChargesChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setMakingCharges(value);
    } else {
      alert('Please enter only numeric values.');
    }
  };

  const handlePurityChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setSelectedPurity(value);
    } else {
      alert('Please enter only numeric values.');
    }
  };

  const handleExchangeItemChange = (event) => {
    setExchangeItem(event.target.checked);
  };

  const handleExchangeOrnamentWeightChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setExchangeOrnamentWeight(value);
    } else {
      alert('Please enter only numeric values.');
    }
  };

  const handleExchangePurityChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setExchangePurity(value);
    } else {
      alert('Please enter only numeric values.');
    }
  };

  const handleExchangeWasteWeightChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setExchangeWasteWeight(value);
    } else {
      alert('Please enter only numeric values.');
    }
  };

  const calculateAdjustedSilverRate = () => {
    const purity = parseFloat(selectedPurity) / 100; // Convert percentage to decimal
    return silverRate * purity;
  };

  const calculateTotal = () => {
    const adjustedSilverRate = calculateAdjustedSilverRate();
    const silverWeight = parseFloat(ornamentWeight) - parseFloat(stoneWeight);
    const wastageAmount = (silverWeight * parseFloat(wastage)) / 100;
    let totalCharges =
      (silverWeight + wastageAmount) * adjustedSilverRate +
      silverWeight * parseFloat(makingCharges);

    // Check if it's an exchange item and adjust total charges accordingly
    if (exchangeItem) {
      let exchangeItemAmount = 
      ((exchangeOrnamentWeight-exchangeWasteWeight)*(exchangePurity/100))*(silverRate-2);
      totalCharges -= exchangeItemAmount; // Just an example, you should replace this with your actual calculation
    }
    
    setTotal(totalCharges.toFixed(2)); // Limiting to two decimal places
    setShowTotal(true); // Show the total field after calculation
  };

  return (
    <div className="silver-form-page">
       <Link to="/">Home</Link> 
      <div className="silver-form-page-content">
        <h1>Silver Form</h1>
        <p>Enter the details of your silver item to calculate its value.</p>
        <p>Today's Silver Rate: {silverRate}</p>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="ornament-weight"
            label="Ornament weight"
            placeholder="Enter ornament weight"
            variant="outlined"
            value={ornamentWeight}
            onChange={handleOrnamentWeightChange}
            inputMode="numeric"
          />
          <TextField
            id="stone-weight"
            label="Stone weight"
            placeholder="Enter stone weight"
            variant="outlined"
            value={stoneWeight}
            onChange={handleStoneWeightChange}
            inputMode="numeric"
          />
          <TextField
            id="wastage"
            label="Wastage (%)"
            placeholder="Enter wastage"
            variant="outlined"
            value={wastage}
            onChange={handleWastageChange}
            inputMode="numeric"
          />
          <TextField
            id="making-charges"
            label="Making charges"
            placeholder="Enter making charges"
            variant="outlined"
            value={makingCharges}
            onChange={handleMakingChargesChange}
            inputMode="numeric"
          />
          <TextField
            id="purity"
            label="Purity (%)"
            placeholder="Enter purity"
            variant="outlined"
            value={selectedPurity}
            onChange={handlePurityChange}
            inputMode="numeric"
          />
          <TextField
            id="today-silver-rate"
            label={`Today's silver rate`}
            variant="outlined"
            value={calculateAdjustedSilverRate()}
            InputProps={{
              readOnly: true,
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={exchangeItem}
                onChange={handleExchangeItemChange}
                name="exchangeItem"
                color="primary"
              />
            }
            label="Exchange Item"
          />
          {exchangeItem && (
            <div>
              <TextField
                id="exchange-ornament-weight"
                label="Exchange Ornament weight"
                placeholder="Enter exchange ornament weight"
                variant="outlined"
                value={exchangeOrnamentWeight}
                onChange={handleExchangeOrnamentWeightChange}
                inputMode="numeric"
              />
              <TextField
                id="exchange-purity"
                label="Exchange Purity (%)"
                placeholder="Enter exchange purity"
                variant="outlined"
                value={exchangePurity}
                onChange={handleExchangePurityChange}
                inputMode="numeric"
              />
              <TextField
                id="exchange-waste-weight"
                label="Exchange Waste weight"
                placeholder="Enter exchange waste weight"
                variant="outlined"
                value={exchangeWasteWeight}
                onChange={handleExchangeWasteWeightChange}
                inputMode="numeric"
              />
            </div>
          )}
          {showTotal && (
            <TextField
              id="total"
              label="Total"
              variant="outlined"
              value={total}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        </Box>
        <button onClick={calculateTotal}>Calculate Total</button>
      </div>
    </div>
  );
}

export default SilverForm;
