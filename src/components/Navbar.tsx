import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav id="navbar">
            <ul>
                <li><Link to="/statistics">Statistics</Link></li>
                <li><Link to="/users">Users</Link></li>
                <li><Link to="/admins">Admins</Link></li>
                <li><Link to="/maintenance">Maintenance</Link></li>
            </ul>
        </nav>
    );
}