import { useState, useEffect } from 'react';
import './App.css';
import { getFoods } from './assets/utils';

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState('default');
  const [selectedMeal, setSelectedMeal] = useState('');
  const [count, setCount] = useState(0)
  const [emscriptenModule, setEmscriptenModule] = useState(null);
  const [cppOutput, setCppOutput] = useState('');


  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten Free', 'No Milk',
    'No Eggs', 'No Fish', 'No Shellfish', 'No Tree Nuts',
    'No Peanuts', 'No Wheat', 'No Soybean', 'No Sesame',
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
    const values = inputText.includes(',')
      ? inputText
        .split(',')
        .map(val => val.trim())
        .filter(val => val.length > 0)
      : [inputText.trim()].filter(val => val.length > 0);
    setStoredValues(values);
    console.log('Stored values:', values);

    // Call the external function with the selected values
    console.log(getFoods(selectedRestaurant, selectedMeal, selectedOptions, storedValues));
  };

  useEffect(() => {
    async function loadModule() {
      const moduleFactory = (await import('../src/program.js')).default;
      const mod = await moduleFactory({
        locateFile: (file) => `/${file}`,
      });

      // Optional: capture C++ output in console or state
      mod.print = (text) => {
        setCppOutput("Sample text from C++: " + text);
        // console.log('[C++ output]', text);
        // setCppOutput(prev => prev + text + '\n');
      };

      setEmscriptenModule(mod);
    }

    loadModule();
  }, []);

  useEffect(() => {
    if (!emscriptenModule || selectedRestaurant === 'default') return;
  
    const result = emscriptenModule.ccall(
      'getRestaurantInfo',
      'string',
      ['string'],
      [selectedRestaurant.toLowerCase()]
    );
  
    console.log('C++ says:', result);
    setCppOutput(result); // Add this line to show result in UI
  }, [selectedRestaurant, emscriptenModule]);



  return (
    <div className="App">
      <h1 className="page-title">R'FitnessPal</h1>
      <img src="/src/assets/UC_Riverside_logo.svg.png" alt="UC Riverside Logo" className="page-logo"/>
      <h2 className="page-title">Select your meal!</h2>

      <div className="dropdown-container">
        <select value={selectedRestaurant} onChange={(e) => setSelectedRestaurant(e.target.value)} className="styled-dropdown">
          <option value="default">
            Select a restaurant
          </option>
          <option value="glasgow">Glasgow</option>
          <option value="lothian">Lothian</option>
        </select>
      </div>

      {cppOutput && (
        <div className="cpp-output-box" style={{ border: '1px solid black', padding: '1rem', marginTop: '1rem', backgroundColor: '#f9f9f9' }}>
          <p>{cppOutput}</p>
        </div>
      )}

      <div className="dropdown-container">
        <select value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)} className="styled-dropdown">
          <option value="default">
            Select a meal
          </option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
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
