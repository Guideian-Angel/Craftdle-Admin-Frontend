import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export function MaintenanceForm({ onMaintenanceAdded }: { onMaintenanceAdded: (data: any) => void }) {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${API_BASE_URL}/maintenance`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    start: new Date(start).toISOString(),
                    end: new Date(end).toISOString(),
                }),
            });
            if (!res.ok) throw new Error("Failed to add maintenance");
            const newData = await res.json();
            onMaintenanceAdded((prev: any) => [...prev, newData]);
            setStart("");
            setEnd("");
        } catch (err) {
            setError("Failed to add maintenance");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-2">Add Maintenance</h3>
            <div className="flex gap-4">
                <input
                    type="datetime-local"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="p-2 rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="datetime-local"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className="p-2 rounded bg-gray-700 text-white"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add"}
                </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
}
