import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/AuthPage/LoginPage"
import RegisterPage from "./pages/AuthPage/RegisterPage"


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App
