import { useState, useEffect } from "react";
import { Table } from "../components/table";
import { Navbar } from "../components/Navbar";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export function Maintenance() {
    const [maintenance, setMaintenance] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/maintenance`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setMaintenance(data);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="p-4">
                <h2 className="text-xl font-bold text-white mb-4">Maintenance</h2>
                <Table
                    columns={["Id", "Start", "End", "User"]}
                    data={maintenance}
                />
            </div>
        </div>
    );
}