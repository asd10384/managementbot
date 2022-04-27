import { useState } from 'react';
import logo from '../logo.svg';
import '../css/Main.css';

export default function Main() {
  const [count, setCount] = useState(0)

  return (
    <div className="Main">
      <header className="Main-header">
        <img src={logo} className="Main-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>Main.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="Main-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="Main-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}
