import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten Free', 'No Milk',
    'No eggs', 'No Fish', 'No Shellfish', 'No Tree Nuts',
    'No Peanuts', 'No Wheat', 'No Soybean', 'No Seasme',
    'No Pork', 'No Beef'
  ]

  return (
    <div className="App">
      <h1 className="page-title">R'FitnessPal</h1>
      <img src="/src/assets/UC_Riverside_logo.svg.png" alt="UC Riverside Logo" className="page-logo"/>
      <h2 className="page-title">Select your meal!</h2>
      <div className="dropdown-container">
        <select defaultValue="default" className="styled-dropdown">
          <option value="default" disabled>
            Select a restaurant
          </option>
          <option value="glasgow">Glasgow</option>
          <option value="lothian">Lothian</option>
        </select>
      </div>

      {/* GET MEALS HERE */}
      <div className="dropdown-container">
        <select defaultValue="default" className="styled-dropdown">
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
            <input type="checkbox" className="dietary-option-checkbox" />
            {label}
          </label>
        ))}
      </div>
    </div>
  )
}

export default App
