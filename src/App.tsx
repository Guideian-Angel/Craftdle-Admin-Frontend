import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Users } from "./pages/Users";
import { Admins } from "./pages/Admins";
import { Maintenance } from "./pages/Maintenance";
import { Statistics } from "./pages/Statistics";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
}

export default App;
