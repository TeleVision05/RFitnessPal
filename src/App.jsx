import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)


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

    </div>
  )
}

export default App
