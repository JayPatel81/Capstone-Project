import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EnrollStudent from './Components/Students/EnrollStudent';
import CameraView from './Components/CameraView/CameraView';
import ViewAttendance from './Components/Students/ViewAttendance';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="" element={<CameraView />} />
          <Route path='student-registration' element={<EnrollStudent/>} />
          <Route path='view-attendance' element={<ViewAttendance/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
