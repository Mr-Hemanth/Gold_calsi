import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem component
import HomeIcon from '@mui/icons-material/Home'; // Import HomeIcon component
import { Link } from 'react-router-dom'; // Import Link component
import { useGlobal } from './GlobalContext';

function GoldForm() {
  const { goldRate } = useGlobal();
  const [ornamentWeight, setOrnamentWeight] = useState('');
  const [stoneWeight, setStoneWeight] = useState('');
  const [wastage, setWastage] = useState('');
  const [makingCharges, setMakingCharges] = useState('');
  const [total, setTotal] = useState('');
  const [showTotal, setShowTotal] = useState(false); // State to control showing total
  const [selectedGoldType, setSelectedGoldType] = useState('24ct'); // Default selected gold type
  const [exchangeItem, setExchangeItem] = useState(false); // State to track exchange item
  const [exchangeOrnamentWeight, setExchangeOrnamentWeight] = useState('');
  const [exchangeWasteWeight, setExchangeWasteWeight] = useState('');
  const [exchangeCaret, setExchangeCaret] = useState(14); // Default exchange caret
  const [adjustedExchangeCaret, setAdjustedExchangeCaret] = useState(14); // Default adjusted exchange caret

  const handleOrnamentWeightChange = (e) => {
    setOrnamentWeight(e.target.value);
  };

  const handleStoneWeightChange = (e) => {
    setStoneWeight(e.target.value);
  };

  const handleWastageChange = (e) => {
    setWastage(e.target.value);
  };

  const handleMakingChargesChange = (e) => {
    setMakingCharges(e.target.value);
  };

  const handleGoldTypeChange = (event) => {
    setSelectedGoldType(event.target.value);
  };

  const handleExchangeItemChange = (event) => {
    setExchangeItem(event.target.checked);
  };

  const handleExchangeOrnamentWeightChange = (e) => {
    setExchangeOrnamentWeight(e.target.value);
  };

  const handleExchangeWasteWeightChange = (e) => {
    setExchangeWasteWeight(e.target.value);
  };

  const handleExchangeCaretChange = (event) => {
    setExchangeCaret(event.target.value);
  };

  const handleAdjustedExchangeCaretChange = (event) => {
    setAdjustedExchangeCaret(event.target.value);
  };

  const calculateAdjustedGoldRate = () => {
    let adjustedRate = goldRate;
    switch (selectedGoldType) {
      case '18ct':
        adjustedRate *= 0.75;
        break;
      case '20ct':
        adjustedRate *= 0.83;
        break;
      case '21ct':
        adjustedRate *= 0.875;
        break;
      case '22ct':
        adjustedRate *= 0.92;
        break;
      default:
        break;
    }
    // Ensure adjustedRate is always a number before calling toFixed
    if (typeof adjustedRate === 'number') {
      adjustedRate = parseFloat(adjustedRate.toFixed(2));
    } else {
      console.error('Adjusted rate is not a number:', adjustedRate);
      // Handle the error scenario accordingly
    }
    return adjustedRate;
  };

  const calculateTotal = () => {
    let totalCharges = 0;
    const adjustedGoldRate = calculateAdjustedGoldRate();
    const goldWeight = parseFloat(ornamentWeight) - parseFloat(stoneWeight);
    const wastageAmount = (goldWeight * parseFloat(wastage)) / 100;
    totalCharges =
      (goldWeight + wastageAmount) * parseFloat(adjustedGoldRate) +
      goldWeight * parseFloat(makingCharges);

    // Check if it's an exchange item and adjust total charges accordingly
    if (exchangeItem) {
      // Calculate total charges for exchange item
      let exchangeAdjustedGoldRate = goldRate - 100;
      switch (adjustedExchangeCaret) {
        case '14ct':
          exchangeAdjustedGoldRate *= 0.585;
          break;
        case '16ct':
          exchangeAdjustedGoldRate *= 0.667;
          break;
        case '19ct':
          exchangeAdjustedGoldRate *= 0.792;
          break;
        case '21ct':
          exchangeAdjustedGoldRate *= 0.875;
          break;
        case '22ct':
          exchangeAdjustedGoldRate *= 0.92;
          break;
        default:
          break;
      }
      const exchangeGoldWeight = parseFloat(exchangeOrnamentWeight) - parseFloat(exchangeWasteWeight);
      const exchangeValue = exchangeGoldWeight * parseFloat(exchangeAdjustedGoldRate);
      totalCharges -= exchangeValue; // Subtract the value of exchanged gold from total
    }
    
    setTotal(totalCharges.toFixed(2)); // Limiting to two decimal places
    setShowTotal(true); // Show the total field after calculation
  };

  return (
    <div className="jewelry-form-page">
      <div className="jewelry-form-page-content">
        <h1>Jewelry Form</h1>
        <p>Enter the details of your jewelry to calculate its value.</p>
        <p>Today's Gold Rate: {goldRate}</p>
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
          />
          <TextField
            id="stone-weight"
            label="Stone weight"
            placeholder="Enter stone weight"
            variant="outlined"
            value={stoneWeight}
            onChange={handleStoneWeightChange}
          />
          <TextField
            id="wastage"
            label="Wastage (%)"
            placeholder="Enter wastage"
            variant="outlined"
            value={wastage}
            onChange={handleWastageChange}
          />
          <TextField
            id="making-charges"
            label="Making charges"
            placeholder="Enter making charges"
            variant="outlined"
            value={makingCharges}
            onChange={handleMakingChargesChange}
          />
          <TextField
            id="gold-type"
            select
            label="Select Gold Type"
            value={selectedGoldType}
            onChange={handleGoldTypeChange}
            variant="outlined"
          >
            {['18ct', '20ct', '21ct', '22ct', '24ct'].map((goldType) => (
              <MenuItem key={goldType} value={goldType}>
                {goldType}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="today-gold-rate"
            label={`Today's gold rate (${selectedGoldType})`}
            variant="outlined"
            value={calculateAdjustedGoldRate()}
            InputProps={{
              readOnly: true,
            }}
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
              />
              <TextField
                id="exchange-waste-weight"
                label="Exchange Waste weight"
                placeholder="Enter exchange waste weight"
                variant="outlined"
                value={exchangeWasteWeight}
                onChange={handleExchangeWasteWeightChange}
              />
            
              <TextField
                id="adjusted-exchange-caret"
                select
                label="Adjusted Exchange Caret"
                value={adjustedExchangeCaret}
                onChange={handleAdjustedExchangeCaretChange}
                variant="outlined"
              >
                {['14ct', '16ct', '19ct', '21ct', '22ct'].map((caret) => (
                  <MenuItem key={caret} value={caret}>
                    {caret}
                  </MenuItem>
                ))}
              </TextField>
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
          <div>
            <label>
              Exchange Item:
              <input
                type="checkbox"
                checked={exchangeItem}
                onChange={handleExchangeItemChange}
              />
            </label>
          </div>
        </Box>
        <button onClick={calculateTotal}>Calculate Total</button>
      </div>
      <div className="home-icon">
        <Link to="/">
          <HomeIcon />
        </Link>
      </div>
    </div>
  );
}

export default GoldForm;
