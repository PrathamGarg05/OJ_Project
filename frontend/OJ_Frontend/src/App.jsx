import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/AuthPage/LoginPage"
import RegisterPage from "./pages/AuthPage/RegisterPage"
import ProbelmsPage from "./pages/ProblemPage/ProblemPage"
import ProblemDescription from "./pages/ProblemDescription/ProblemDescription"
import HomePage from "./pages/HomePage/HomePage"
import ProfilePage from "./pages/ProfilePage/ProfilePage"


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/problems" element={<ProbelmsPage />}/>
      <Route path='/problems/:id' element={<ProblemDescription />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
    <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
    />
    </>
  )
}

export default App
