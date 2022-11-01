import './App.css';
import SignUp from './Components/Authentication/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './Components/Authentication/SignIn';
import EnrollStudent from './Components/Students/EnrollStudent';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path='students/enroll' element={<EnrollStudent/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
