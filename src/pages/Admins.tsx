import { useState, useEffect } from "react";
import { Table } from "../components/table";
import { Navbar } from "../components/Navbar";

export function Admins() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/admin/admins", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setAdmins(data);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="p-4">
                <h2 className="text-xl font-bold text-white mb-4">Admins</h2>
                <Table
                    columns={["Id", "Username", "Rights"]}
                    data={admins}
                />
            </div>
        </div>
    );
}