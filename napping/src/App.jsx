import { useState } from 'react'
import ringBellImg from './assets/ring-bell.svg'
import badgeImg from './assets/badge.svg'
import bellImg from './assets/bell.svg'
import switchImg from './assets/switch.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <nav>
          <div className="notification">
            <img className="ringBell" src={ringBellImg} alt="icône de notification activé"></img>
            <img className="badge" src={badgeImg} alt="icône de notification activé"></img>
            <span className="badge" src={badgeImg}>3</span>
            <img className="bell" src={bellImg} alt="icône de notification activé"></img>
            <img className="switch" src={switchImg} alt="icône de notification activé"></img>
          </div>
        </nav>
      </header>
      <div className="menuInput">
        <label htmlFor="H">H</label>
        <input className="input" type="text" placeholder='Hour' name="H" />
        <p>:</p>
        <label htmlFor="M">M</label>
        <input className="input" type="text" placeholder='Minute' name="M" />
      </div>
      {/* <div className="menuInput">
        <div className="inputHour">H
          <input className="input" type="text" placeholder='Hour' />
        </div>
        <div className="text" alt="deux point">:</div>
        <div className="inputMinute">M
          <input className="input" type="text" placeholder='Minute' />
        </div>
        <div className="menuDuree"></div>
      </div> */}
    </>
  )
}

export default App
