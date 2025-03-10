import { useState, useEffect } from "react";
import { Table } from "../components/table";
import { Navbar } from "../components/Navbar";
import { UserDetails } from "../components/UserDetails";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export function Users() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);

    const handleRowClick = (row: any) => {
        setSelectedUser(row.id);
    };

    const closeUserDetails = () => {
        setSelectedUser(null);
    };

    console.log(sessionStorage.getItem("token"))

    useEffect(() => {
        fetch(`${API_BASE_URL}/users`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="p-4">
                <h2 className="text-xl font-bold text-white mb-4">Users</h2>
                <Table columns={["Id", "Username", "Streak", "LastPlayed", "Rights"]} data={users} onRowClick={handleRowClick} />
                {selectedUser !== null ? (
                    <UserDetails userId={selectedUser} onClose={closeUserDetails} />
                ) : (
                    <p className="text-white">Nincs kiválasztott felhasználó</p>
                )}
            </div>
        </div>
    );
}