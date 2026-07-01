import { useState, useEffect, useRef } from 'react'
import ringBellImg from './assets/ring-bell.svg'
import badgeImg from './assets/badge.svg'
import bellImg from './assets/bell.svg'
import switchImg from './assets/switch.svg'
import verified from './assets/verified.svg'
import alarm from './sounds/alarm1.mp3'
import './App.css'

function App() {

  // INPUT MENU

  const [lim, setlim] = useState({
    H: "",
    M: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value === "") {
      setlim({ ...lim, [name]: "" });
      return;
    }

    const max = name === "H" ? 23 : 59;

    setlim({
      ...lim,
      [name]: Math.min(Number(value), max),
    });
  };

  //FONCTION TIMER + BUTTON LAUNCHER

  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const audioRef = useRef(new Audio(alarm));
  const [time, setTime] = useState("")

  function start() {
    if (intervalRef.current || totalSeconds === 0) return;
    setRunning(true);

    intervalRef.current = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setRunning(false);
          audioRef.current.play();
          audioRef.current.loop = true;
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  }

  function stop() {
    setRunning(false);

    clearInterval(intervalRef.current);
    intervalRef.current = null;

  }

  function reset() {
    setRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTotalSeconds(0);
    audioRef.current.pause();
  }

  function addSeconds(nbrSeconds) {
    // let previousTime = totalSeconds
    setTotalSeconds(nbrSeconds);
  }

  // FONCTION NOTIF

  /**
 * Fonction à utiliser pour demander à l'utilisateur s'il souhaite activer les notifications
 */
  async function requestNotificationPermission() {
    if (!('Notification' in window)) {
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  /**
   * Envoie une notification
   */
  function sendNotification(title, body) {
    if (Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/icon.png' });
    }
  }

  // itilisation au moment du rappel
  sendNotification('nAPPing', 'Votre sieste commence dans 10 minutes.');
  // et à la fin
  sendNotification('nAPPing', 'Réveil ! Bonne reprise.');

  // SAVE ALARM

  function saveAlarm() {
    localStorage.setItem("alarm", `${lim.H} : ${lim.M}`);
    alert("alarme enregistré")
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
        <audio src="./sounds/alarm1.mp3"></audio>
        <div className="clock">
          <div>
            <p className="title">timer</p>
            <p className="timer">{String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}</p>
          </div>
        </div>
        <div className="menuInput">
          <label className="label">HOUR</label>
          <label className="label">MINUTE</label>
          <input className="input" type="number" placeholder="--" min="0" max="23" name="H" value={lim.H} onChange={handleChange} />
          <input className="input" type="number" placeholder="--" min="0" max="59" name="M" value={lim.M} onChange={handleChange} />
        </div>
        <div className="popUp">
          <p className="alarmSaved">Alarm Saved 
            <img className="verified" src={verified} alt="icône de vérification pop-up"></img>
          </p>
        </div>
        <div className="menuTimer">
          <button onClick={() => addSeconds(1 * 10)} className="selectTimer">10</button>
          <button onClick={() => addSeconds(20 * 60)} className="selectTimer">20</button>
          <button onClick={() => addSeconds(30 * 60)} className="selectTimer">30</button>
          <button onClick={() => addSeconds(40 * 60)} className="selectTimer">40</button>
          <button onClick={() => addSeconds(50 * 60)} className="selectTimer">50</button>
          <button onClick={() => addSeconds(60 * 60)} className="selectTimer">60</button>
        </div>
        <div className="menuButton">
          <button className="button">import sound</button>
          <button className="button" onClick={saveAlarm}>save alarm</button>
        </div>
        {isRunning ?
          <div className="stop">
            <button className="buttonStop" onClick={stop}>stop</button>
          </div>
          :
          <div className="launchButton">
            <button className="buttonLaunch" onClick={start}>start</button>
            <button className="buttonReset" onClick={reset}>reset</button>
          </div>
        }
      </main>
    </>
  )
}

export default App
