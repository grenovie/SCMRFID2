import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./mainPage/Login";
import Student from "./mainPage/Student";
import Professor from "./mainPage/Professor";
import Admin from "./mainPage/Admin";
import ProtectedRoutes from "./protect/ProtectedRoutes";
import ProtectedAdmin from "./protect/ProtectAdmin";
import ProtectedStaff from "./protect/ProtectStaff";
import NotHere from "./redirectlink/NotHere";
import ScannerPage from "./page/misc/ScannerPage";
import ProfStudentList from "./page/misc/ProfStudentList";
import RegisterStudent from "./page/misc/RegisterStudent";
import AdminStudentList from "./page/misc/AdminStudentList";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/not_here" element={<NotHere />} />
        <Route element={<ProtectedAdmin />}>
          <Route path="admin" element={<Admin />} />
          <Route path="register_stud" element={<RegisterStudent />} />
          <Route path="admin_studlist" element={<AdminStudentList />} />
        </Route>
        <Route element={<ProtectedStaff />}>
          <Route path="scanner" element={<ScannerPage />} />
        </Route>
        <Route path="stud_list" element={<ProfStudentList />} />
      </Routes>
    </div>
  );
}

export default App;
