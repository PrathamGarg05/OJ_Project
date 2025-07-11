import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CodeProvider } from './context/CodeContext.jsx';
import { ProblemProvider } from './context/ProblemContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import { SubmitProvider } from './context/SubmitContext.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ThemeProvider>
    <AuthProvider>
      <SocketProvider>
        <SubmitProvider>
          <CodeProvider>
              <ProblemProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>  
              </ProblemProvider>  
            </CodeProvider>
        </SubmitProvider>
          
      </SocketProvider>
    </AuthProvider>
  </ThemeProvider>
    
  // </StrictMode>,
)
