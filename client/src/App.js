
import './App.css';
import SignUp from './components/SingUp';
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<SignUp/>} />
        <Route exact path="/login" element={<SignIn/>} />
        <Route exact path="/" element={<UserProfile/>} />
      </Routes>
 
    </div>
  );
}

export default App;
