import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.css'

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""
/>

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      
    </BrowserRouter>
  </Provider>
)
