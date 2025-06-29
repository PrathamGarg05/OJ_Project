import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/AuthPage/LoginPage"
import RegisterPage from "./pages/AuthPage/RegisterPage"
import ProbelmsPage from "./pages/ProblemPage/ProblemPage"
import ProblemDescription from "./pages/ProblemDescription/ProblemDescription"


function App() {
  return (
    <Routes>
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/problems" element={<ProbelmsPage />}/>
      <Route path='/problem' element={<ProblemDescription />} />
    </Routes>
  )
}

export default App
