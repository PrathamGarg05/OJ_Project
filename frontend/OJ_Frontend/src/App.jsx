import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/AuthPage/LoginPage"
import RegisterPage from "./pages/AuthPage/RegisterPage"
import ProbelmsPage from "./pages/ProblemPage/ProblemPage"


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/problems" element={<ProbelmsPage />}/>
    </Routes>
  )
}

export default App
