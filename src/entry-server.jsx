import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Build-time render so crawlers get the page's text without running JavaScript
export function render() {
  return renderToString(<App />)
}
