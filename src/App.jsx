import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputText, setInputText] = useState('');
  const [cppOutput, setCppOutput] = useState('');
  const [emscriptenModule, setEmscriptenModule] = useState(null);

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten Free', 'No Milk',
    'No eggs', 'No Fish', 'No Shellfish', 'No Tree Nuts',
    'No Peanuts', 'No Wheat', 'No Soybean', 'No Seasme',
  ];

  const handleCheckboxChange = (option) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  // ✅ Load Emscripten Module
  useEffect(() => {
    const loadModule = async () => {
      try {
        if (typeof window.createModule !== 'function') {
          console.error('❌ createModule not found on window');
          return;
        }
  
        const mod = await window.createModule({
          locateFile: (file) => `/${file}`,
        });
  
        setEmscriptenModule(mod);
        console.log('✅ Emscripten module loaded');
      } catch (err) {
        console.error('❌ Failed to load Emscripten module:', err);
      }
    };
  
    loadModule();
  }, []);

  const storeValues = () => {
    const values = inputText
      .split(',')
      .map(val => val.trim())
      .filter(val => val.length > 0);

    if (!emscriptenModule || !emscriptenModule.cwrap) {
      console.warn('Emscripten module not ready');
      return;
    }

    const mod = emscriptenModule;
    const processArgs = mod.cwrap('processArgs', 'string', ['number', 'number']);

    const argPtrs = values.map(val => {
      const len = mod.lengthBytesUTF8(val) + 1;
      const ptr = mod._malloc(len);
      mod.stringToUTF8(val, ptr, len);
      return ptr;
    });

    const argvPtr = mod._malloc(argPtrs.length * 4);
    argPtrs.forEach((ptr, i) => {
      mod.setValue(argvPtr + i * 4, ptr, 'i32');
    });

    const resultStr = processArgs(argPtrs.length, argvPtr);
    setCppOutput(resultStr);
    console.log('C++ Output:', resultStr);

    argPtrs.forEach(ptr => mod._free(ptr));
    mod._free(argvPtr);
  };

  return (
    <div className="App">
      <img src="/src/assets/UC_Riverside_logo.svg.png" alt="UC Riverside Logo" className="page-logo"/>
      <h1 className="page-title">R'FitnessPal</h1>
      <h2 className="page-title">Select your meal!</h2>

      <div className="dropdown-container">
        <select
          value={selectedRestaurant}
          onChange={(e) => setSelectedRestaurant(e.target.value)}
          className="styled-dropdown"
        >
          <option value="" disabled>Select a restaurant</option>
          <option value="Glasgow">Glasgow</option>
          <option value="Lothian">Lothian</option>
        </select>
      </div>

      <div className="dropdown-container">
        <select
          value={selectedMeal}
          onChange={(e) => setSelectedMeal(e.target.value)}
          className="styled-dropdown"
        >
          <option value="" disabled>Select a meal</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>

      {selectedRestaurant && <p>Restaurant: {selectedRestaurant}</p>}
      {selectedMeal && <p>Meal: {selectedMeal}</p>}

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
        <label htmlFor="data-input">Enter values (comma-separated):</label>
        <input
          type="text"
          id="data-input"
          placeholder="e.g. apple, banana, orange"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={storeValues} className="submit-button">Submit</button>

        {cppOutput && (
          <div className="cpp-output">
            <h3>C++ Output</h3>
            <pre>{cppOutput}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
