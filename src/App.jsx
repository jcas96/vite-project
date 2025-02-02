import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <h1>Your Spotify Profile data</h1>
    <section id="profile">
      <h2> Logged in as <span id="displayName"></span></h2>
      <span id="avatar"></span>
      <ul>
        <li>Spotify URI: <a id="uri" href="#"></a></li>
        <p></p>
        <li>Your Top Tracks in the last 6 months: <span id="tracks">
          <li>1. <span id="num1"></span></li>
          <li>2. <span id="num2"></span></li>
          <li>3. <span id="num3"></span></li>
          <li>4. <span id="num4"></span></li>
          <li>5. <span id="num5"></span></li>
          <li>6. <span id="num6"></span></li>
          <li>7. <span id="num7"></span></li>
          <li>8. <span id="num8"></span></li>
          <li>9. <span id="num9"></span></li>
          <li>10. <span id="num10"></span></li>
        </span></li>
        <p> </p>
        <li>Your Top Tracks in the last 4 weeks: <span id="tracksS">
          <li>1. <span id="sNum1"></span></li>
          <li>2. <span id="sNum2"></span></li>
          <li>3. <span id="sNum3"></span></li>
          <li>4. <span id="sNum4"></span></li>
          <li>5. <span id="sNum5"></span></li>
          <li>6. <span id="sNum6"></span></li>
          <li>7. <span id="sNum7"></span></li>
          <li>8. <span id="sNum8"></span></li>
          <li>9. <span id="sNum9"></span></li>
          <li>10. <span id="sNum10"></span></li>
        </span></li>
        <p></p>
        <li>Your Top Artists in the last 6 months: <span id="artistM">
          <li>1. <span id="aNum1"></span></li>
          <li>2. <span id="aNum2"></span></li>
          <li>3. <span id="aNum3"></span></li>
          <li>4. <span id="aNum4"></span></li>
          <li>5. <span id="aNum5"></span></li>
          <li>6. <span id="aNum6"></span></li>
          <li>7. <span id="aNum7"></span></li>
          <li>8. <span id="aNum8"></span></li>
          <li>9. <span id="aNum9"></span></li>
          <li>10. <span id="aNum10"></span></li>
        </span></li>
        <p></p>
        <li>Your Top Artists in the last 4 weeks: <span id="artistS">
          <li>1. <span id="aNumS1"></span></li>
          <li>2. <span id="aNumS2"></span></li>
          <li>3. <span id="aNumS3"></span></li>
          <li>4. <span id="aNumS4"></span></li>
          <li>5. <span id="aNumS5"></span></li>
          <li>6. <span id="aNumS6"></span></li>
          <li>7. <span id="aNumS7"></span></li>
          <li>8. <span id="aNumS8"></span></li>
          <li>9. <span id="aNumS9"></span></li>
          <li>10. <span id="aNumS10"></span></li>
        </span></li>
      </ul>
      
    </section>
   
  </div>
  )
}

export default App
