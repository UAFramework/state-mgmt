import { useState, useRef, useEffect } from 'react'
import ThemeContext from './components/ThemeContext'
import Parent from './components/Parent'
import OverflowTooltip from './components/OverflowTooltip'
import { css, cx } from '@emotion/css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const ulStyle = css`
  text-align: left;
  line-height: 2.5rem;
`
const overflowStyle = css`
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

function App() {
  const [count, setCount] = useState(0)
  const numberOfRenders = useRef(0)
  const randomNumber = useRef(Math.random())
  const [theme, setTheme] = useState({})

  const updateRandomNumber = () => {
    randomNumber.current = Math.random()
    console.log("randomNumber.current:", randomNumber.current)
  }

  const handleThemeToggle = (event) => {
    const themeName = event.target.value;
    setTheme({...theme, themeName});
  }
  
  useEffect(() => {
    // assume, we have here an API call to the backend 
    // where we retrive the whole theme object from server and
    // put it into our state
    setTheme({...theme, themeName: "dark"});
  }, [])

  numberOfRenders.current += 1

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>
      
      <div className="card">
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count: {count}
        </button>

        <button type="button" onClick={updateRandomNumber}>
          rnd number: {randomNumber.current}
        </button>

        <div>
          renders cnt: {numberOfRenders.current}
        </div>

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div className={cx(css`display:flex; flex-direction: column; line-height: 2rem;`)}>
        <label htmlFor="light-theme">Light
            <input type='radio' name='theme' id='light-theme' value="light" checked={theme.themeName === "light"} onChange={handleThemeToggle}/>
        </label>
        <label htmlFor="dark-theme">Dark
          <input type='radio' name='theme' id='dark-theme' value="dark" checked={theme.themeName === "dark"} onChange={handleThemeToggle}/>
        </label>
        
        <Parent />
      </div>

      <div style={{width: "30%"}}>
        <ul className={cx(ulStyle)}>
          <li>just a test inside "li" element with no styling</li>
          <li><div className={cx(overflowStyle)}>text in "div" and styled for ellipsis</div></li>
          <li><div className={cx(overflowStyle)} title="title text">text in "div", with title and styled for ellipsis</div></li>
          <li><OverflowTooltip text="tesxt inside an OverflowTooltip component"/></li>
        </ul>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
