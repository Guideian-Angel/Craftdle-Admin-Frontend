import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between">
            <ul className="flex space-x-4">
                <li><Link to="/statistics" className="hover:underline">Statistics</Link></li>
                <li><Link to="/users" className="hover:underline">Users</Link></li>
                <li><Link to="/admins" className="hover:underline">Admins</Link></li>
                <li><Link to="/maintenance" className="hover:underline">Maintenance</Link></li>
            </ul>
        </nav>
    );
}