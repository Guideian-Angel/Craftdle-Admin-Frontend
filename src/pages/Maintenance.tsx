import { useState, useEffect } from "react";
import { Table } from "../components/table";
import { Navbar } from "../components/Navbar";
import { MaintenanceItem } from "../interfaces/maintenanceItem";
import { MaintenanceForm } from "../components/MaintenanceForm";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function toLocalDatetimeInputValue(dateString: string): string {
    const date = new Date(dateString);
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().slice(0, 16);
}

export function Maintenance() {
    const [maintenance, setMaintenance] = useState<MaintenanceItem[]>([]);
    const [editing, setEditing] = useState<MaintenanceItem | null>(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/maintenance`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data: MaintenanceItem[]) => {
                setMaintenance(data);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await fetch(`${API_BASE_URL}/maintenance/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            setMaintenance((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting maintenance:", error);
        }
    };

    return (
        <div className="container">
            <Navbar />
            <div>
                <h2>Maintenance</h2>
                <MaintenanceForm
                    onMaintenanceAdded={setMaintenance}
                    editing={editing}
                    setEditing={setEditing}
                />
                <Table
                    columns={["Id", "Start", "End", "User", "Actions"]}
                    data={maintenance.map((item) => ({
                        ...item,
                        start: toLocalDatetimeInputValue(item.start),
                        end: toLocalDatetimeInputValue(item.end),
                        Actions: (
                            <div className="actions">
                                <button onClick={() => setEditing(item)}>Edit</button>
                                <button className="deleteButton" onClick={() => handleDelete(item.id)}>Delete</button>
                            </div>
                        ),
                    }))}
                />
            </div>
        </div>
    );
}