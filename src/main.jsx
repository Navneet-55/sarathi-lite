import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import SarathiLite from './SarathiLite'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SarathiLite />
    <Analytics />
  </React.StrictMode>
)
