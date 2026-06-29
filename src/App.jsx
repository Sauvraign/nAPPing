import { useState , useEffect , useRef} from 'react'
import ringBellImg from './assets/ring-bell.svg'
import badgeImg from './assets/badge.svg'
import bellImg from './assets/bell.svg'
import switchImg from './assets/switch.svg'
import './App.css'

function App() {
  const [isRunning, setRunning] = useState(false);
  const [elapsedTime, setElaspedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {

  }, {isRunning});

  function start(){
    
  }

  function stop(){

  }

  function reset(){

  }

  function formatTime(){

  }

  return (
    <>
      <header>
        <nav>
          <div className="notification">
            {/* <img className="ringBell" src={ringBellImg} alt="icône de notification activé"></img> */}
            <img className="bell" src={bellImg} alt="icône de notification désactivé"></img>
            <p>nAPPing</p>
            {/* <img className="badge" src={badgeImg} alt="icône de notification activé"></img> */}
            <img className="switch" src={switchImg} alt="icône de notification activé"></img>
          </div>
        </nav>
      </header>
      <main className="main">
        <div className="clock">
          <div>
            <p className="title">timer</p>
            <p className="timer">{isRunning} : 00</p>
          </div>
        </div>
        <div className="menuInput">
          <label className="label">HOUR</label>
          <label className="label">MINUTE</label>
          <input className="input" type="number" placeholder='--' min="0" max="23" name="H" />
          <input className="input" type="number" placeholder='--' min="0" max="59" name="M" />
        </div>
        <div className="menuTimer">
          <button className="selectTimer">10</button>
          <button className="selectTimer">20</button>
          <button className="selectTimer">30</button>
          <button className="selectTimer">40</button>
          <button className="selectTimer">50</button>
          <button className="selectTimer">60</button>
        </div>
        <div className="menuButton">
          <button className="button">import sound</button>
          <button className="button">save alarm</button>
        </div>
        <div className="launch">
          <button className="butonLaunch" onClick={start}>start</button>
        </div>
      </main>
    </>
  )
}

export default App
