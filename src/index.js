import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeProvider } from './components/contexts/DarkModeContext';
import { UserProvider } from './components/contexts/UserContext'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    
     
        <UserProvider>
          <DarkModeProvider>
            <App />
          </DarkModeProvider>
        </UserProvider>
      
    
  </React.StrictMode>
);
