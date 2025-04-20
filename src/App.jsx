import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten Free', 'No Milk',
    'No eggs', 'No Fish', 'Vegan', 'Vegan',
    'Vegetarian', 'Vegan', 'Vegan', 'Vegan'
  ]

  return (
    <div className="App">
      <h1 className="page-title">RFitnessPal</h1>
      <h2 className="page-title">Select your meal!</h2>
      <div className="restaurant-dropdown-container">
        <select defaultValue="default" className="restaurant-dropdown">
          <option value="default" disabled>
            Select a restaurant
          </option>
          <option value="glasgow">Glasgow</option>
          <option value="lothian">Lothian</option>
        </select>
      </div>

      {/* GET MEALS HERE */}
      <div className="meal-dropdown-container">
        <select defaultValue="default" className="meal-dropdown">
          <option value="default" disabled>
            Select a meal
          </option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>

      {/* ✅ Dietary options section */}
      <div style={styles.container}>
        {dietaryOptions.map((label, index) => (
          <label key={index} style={styles.label}>
            <input type="checkbox" style={styles.checkbox} />
            {label}
          </label>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: '#888',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    width: 'fit-content',
    margin: '20px auto',
    borderRadius: '10px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#000',
  },
  checkbox: {
    width: '20px',
    height: '20px',
  },
}

export default App
