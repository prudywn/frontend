import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { DarkModeProvider } from './components/DarkModeContext';
  

ReactDOM.createRoot(document.getElementById('root'), render( <DarkModeProvider>
    <App />
  </DarkModeProvider>,))

