import { useState, useEffect } from 'react';
import './App.css';
import { getFoods } from './assets/utils';

function doVerySimplePopup(text, callback) {
  var shim, div, parent = document.body;

  shim = document.createElement('iframe');
  shim.className = 'shim';
  parent.appendChild(shim);

  div = document.createElement('div');
  div.className = 'overlay';
  div.innerHTML = text;
  parent.appendChild(div);
  div.onclick = function() {
    parent.removeChild(div);
    parent.removeChild(shim);
    if (typeof callback === "function") {
      try { callback(); } catch (e) { }
    }
  };
}

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState('default');
  const [selectedMeal, setSelectedMeal] = useState('default');
  const [count, setCount] = useState(0)
  const [emscriptenModule, setEmscriptenModule] = useState(null);
  const [cppOutput, setCppOutput] = useState('');
  const [foods, setFoods] = useState([]);
  const [plateFoods, setPlateFoods] = useState([]);

  // Add food to plateFoods with a count variable to keep track of the number of times it has been added
  const addFoodToPlate = (food) => {
    setPlateFoods(prev => {
      const existingFood = prev.find(item => item.name === food.name);
      if (existingFood) {
        return prev.map(item =>
          item.name === food.name ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prev, { ...food, count: 1 }];
      }
    });
  };

  // Remove food from plateFoods
  const removeFoodFromPlate = (food) => {
    setPlateFoods(prev => {
      const existingFood = prev.find(item => item.name === food.name);
      if (existingFood) {
        if (existingFood.count > 1) {
          return prev.map(item =>
            item.name === food.name ? { ...item, count: item.count - 1 } : item
          );
        } else {
          return prev.filter(item => item.name !== food.name);
        }
      }
      return prev;
    });
  };

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

  const storeValues = () => {
    const values = inputText.includes(',')
      ? inputText
        .split(',')
        .map(val => val.trim())
        .filter(val => val.length > 0)
      : [inputText.trim()].filter(val => val.length > 0);

    // Call the external function with the selected values
    if (selectedRestaurant == 'default'){
      doVerySimplePopup('Please select a restaurant');
      return;
    }
    if (selectedMeal == 'default'){
      doVerySimplePopup('Please select a meal');
      return;
    }
    getFoods(selectedRestaurant, selectedMeal, selectedOptions, values).then((result) => {
      console.log('Foods fetched:', result); // Log the fetched data
      setFoods(result); // Update the state
    });
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

      <div className='plate'>
        <div className="scrollable-table-container" style={{ maxHeight: 'auto', overflowY: 'auto', marginTop: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
          {plateFoods && plateFoods.length > 0 ? (
            plateFoods.map((food, index) => (
              <div key={index} className="food-tile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                <span style={{ flex: 1, textAlign: 'center' }}>{food.name}</span>
                <span style={{ flex: 1, textAlign: 'center' }}>Calories: {(parseFloat(food.calories) * parseFloat(food.count)).toFixed(2)}</span>
                <span style={{ flex: 1, textAlign: 'center' }}>Serving Size: {(parseFloat(food.servingSize) * parseFloat(food.count)).toFixed(2)} {food.servingUnit}</span>
                <span style={{ flex: 1, textAlign: 'center' }}>Protein: {(parseFloat(food.protein) * parseFloat(food.count)).toFixed(2)}g</span>
                <span style={{ flex: 1, textAlign: 'center' }}>Count: {parseFloat(food.count).toFixed(2)}</span>
                <button 
                  style={{ flex: 1, textAlign: 'center', padding: '0.5rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                  onClick={() => removeFoodFromPlate(food)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#888' }}>No foods to display</p>
          )}
        </div>
      </div>

      <img src="/src/assets/UC_Riverside_logo.svg.png" alt="UC Riverside Logo" className="page-logo" style={{width: '200px', height: 'auto'}}/>
      <h1 className="page-title">R'FitnessPal</h1>

      <div className="dropdown-container">
        <select value={selectedRestaurant} onChange={(e) => setSelectedRestaurant(e.target.value)} className="styled-dropdown">
          <option value="default">
            Select a restaurant
          </option>
          <option value="glasgow">Glasgow</option>
          <option value="lothian">Lothian</option>
        </select>
      </div>

      <div className="dropdown-container">
        <select value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)} className="styled-dropdown">
          <option value="default">
            Select a meal
          </option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>

      {/* {cppOutput && (
        <div className="cpp-output-box" style={{ border: '1px solid black', padding: '1rem', marginTop: '1rem', backgroundColor: '#f9f9f9' }}>
          <p>{cppOutput}</p>
        </div>
      )} */}

      

      {/* Dietary options section */}
      <div className="dietary-options-container">
        <div className='dietary-options'>
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
      </div>
      <div className="ingredient-input-container">
        <label htmlFor="data-input">Enter ingredients to exclude (comma-separated):</label>
        <input
          type="text"
          id="data-input"
          placeholder="e.g. apple, banana, orange"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={storeValues} className="submit-button">Submit</button>
      </div>
      {/* Result */}
      {/* <div className="result-textbox-container">
        <textarea
          id="result-textbox"
          value={foods}
          readOnly
          rows="5"
          cols="50"
          style={{ resize: 'none', marginTop: '1rem' }}
        />
      </div> */}
      <div className="scrollable-table-container" style={{ maxHeight: '300px', maxWidth: '300px', overflowY: 'auto', marginTop: '1rem', marginLeft: '14rem', marginRight: '13rem', border: '1px solid #ccc', padding: '1rem' }}>
        {foods && foods.length > 0 ? (
          foods.map((food, index) => (
            <div key={index} className="food-tile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
              <span style={{ flex: 1, textAlign: 'center' }}>{food.name}</span>
              <span style={{ flex: 1, textAlign: 'center' }}>Calories: {food.calories}</span>
              <span style={{ flex: 1, textAlign: 'center' }}>Serving Size: {food.servingSize} {food.servingUnit}</span>
              <span style={{ flex: 1, textAlign: 'center' }}>Protein: {food.protein}g</span>
              <button 
                style={{ flex: 1, textAlign: 'center', padding: '0.5rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                onClick={() => addFoodToPlate(food)}
              >
                Add
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#888' }}>No foods to display</p>
        )}
      </div>

    </div>
  );
}



export default App;
