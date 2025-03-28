import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";
import EmployeeList from './Components/EmployeeList/EmployeeList';
import AddEmployee from './Components/AddEmployee/AddEmployee';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<EmployeeList />} />
      <Route path="/add" element={<AddEmployee />} />
      <Route path="/edit/:id" element={<AddEmployee />} />
    </Routes>
  </Router>
  );
}

export default App;
