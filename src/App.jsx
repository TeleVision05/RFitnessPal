import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');
  const [count, setCount] = useState(0)
  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten Free', 'No Milk',
    'No eggs', 'No Fish', 'No Shellfish', 'No Tree Nuts',
    'No Peanuts', 'No Wheat', 'No Soybean', 'No Seasme',
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const [inputText, setInputText] = useState('');
  const [storedValues, setStoredValues] = useState([]);

  const storeValues = () => {
    const values = inputText
      .split(',')
      .map(val => val.trim())
      .filter(val => val.length > 0);
    setStoredValues(values);
    console.log('Stored values:', values);
  };


  return (
    <div className="App">
      <h1 className="page-title">R'FitnessPal</h1>
      <img src="/src/assets/UC_Riverside_logo.svg.png" alt="UC Riverside Logo" className="page-logo"/>
      <h2 className="page-title">Select your meal!</h2>

      <div className="dropdown-container">
        <select value={selectedRestaurant} onChange={(e) => setSelectedRestaurant(e.target.value)} className="styled-dropdown">
          <option value="default" disabled>
            Select a restaurant
          </option>
          <option value="glasgow">Glasgow</option>
          <option value="lothian">Lothian</option>
        </select>
      </div>

      <div className="dropdown-container">
        <select value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)} className="styled-dropdown">
          <option value="default" disabled>
            Select a meal
          </option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>

      {/* Dietary options section */}
      <div className="dietary-options-container">
        {dietaryOptions.map((label, index) => (
          <label key={index} className="dietary-option-label">
            <input
              type="checkbox"
              className="dietary-option-checkbox"
              checked={selectedOptions.includes(label)}
              onChange={() => handleCheckboxChange(label)}
            />
            {label}
          </label>
        ))}
      </div>
      <div className="ingredient-input-container">
        <label htmlFor="data-input">Enter ingredients (comma-separated):</label>
        <input
          type="text"
          id="data-input"
          placeholder="e.g. apple, banana, orange"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={storeValues} className="submit-button">Submit</button>
      </div>
    </div>
  );
}



export default App;
