import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Users } from "./pages/Users";
import { Admins } from "./pages/Admins";
import { Maintenance } from "./pages/Maintenance";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/maintenance" element={<Maintenance />} />
      </Routes>
    </Router>
  );
}

export default App;
