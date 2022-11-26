import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EnrollStudent from './Components/Students/EnrollStudent';
import CameraView from './Components/CameraView/CameraView';
import ViewAttendance from './Components/Students/ViewAttendance';
import ViewIndividualAttendance from './Components/Students/ViewIndividualAttendance.js/ViewIndividualAttendance';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="" element={<CameraView />} />
          <Route path='student-registration' element={<EnrollStudent/>} />
          <Route path='view-attendance' element={<ViewAttendance/>} />
          <Route path='view-student/:id' element={<ViewIndividualAttendance/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
