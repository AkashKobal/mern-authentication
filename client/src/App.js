import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import VerifyEmail from './Pages/VerifyEmail';
import ResetPassword from './Pages/ResetPassword';
// import { AppContextProvider } from './Context/AppContext';

function App() {
  return (
    <BrowserRouter>
      {/* <AppContextProvider> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Routes>
      {/* </AppContextProvider> */}
    </BrowserRouter>
  );
}

export default App;
