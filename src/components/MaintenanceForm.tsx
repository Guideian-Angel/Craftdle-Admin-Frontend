import { useEffect, useState } from "react";
import { MaintenanceItem } from "../interfaces/maintenanceItem";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

interface MaintenanceFormProps {
    onMaintenanceAdded: React.Dispatch<React.SetStateAction<MaintenanceItem[]>>;
    editing: MaintenanceItem | null;
    setEditing: React.Dispatch<React.SetStateAction<MaintenanceItem | null>>;
}

export function MaintenanceForm({ onMaintenanceAdded, editing, setEditing }: MaintenanceFormProps) {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (editing) {
            setStart(editing.start);
            setEnd(editing.end);
        }
    }, [editing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const method = editing ? "PATCH" : "POST";
            const url = editing ? `${API_BASE_URL}/maintenance/${editing.id}` : `${API_BASE_URL}/maintenance`;

            const res = await fetch(url, {
                method,
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    start: new Date(start).toISOString(),
                    end: new Date(end).toISOString(),
                }),
            });
            if (!res.ok) throw new Error("Failed to save maintenance");
            const newData: MaintenanceItem = await res.json();

            if (editing) {
                onMaintenanceAdded((prev) => prev.map((item) => (item.id === editing.id ? newData : item)));
                setEditing(null);
            } else {
                onMaintenanceAdded((prev) => [...prev, newData]);
            }
            setStart("");
            setEnd("");
        } catch (err) {
            setError("Failed to save maintenance");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h3>{editing ? "Edit Maintenance" : "Add Maintenance"}</h3>
            <div>
                <div>
                    <label htmlFor="start">Start:</label>
                    <input
                        id="start"
                        type="datetime-local"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="end">End:</label>
                    <input
                        id="end"
                        type="datetime-local"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Saving..." : editing ? "Save" : "Add"}
                </button>
                {editing && (
                    <button
                        type="button"
                        className="cancelButton"
                        onClick={() => setEditing(null)}
                    >
                        Cancel
                    </button>
                )}
            </div>
            {error && <p>{error}</p>}
        </form>
    );
}
