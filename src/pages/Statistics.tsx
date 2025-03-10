import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import PlayedGamemodesChart from "../components/PlayedGamemodesChart";

const COLORS = ["#00C49F", "#FF8042"];
const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export function Statistics() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/statistics`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    if (!stats) {
        return <p className="text-white">Loading...</p>;
    }

    const solvedVsUnsolved = [
        { name: "Solved", value: stats.playedGames.solved },
        { name: "Unsolved", value: stats.playedGames.unsolved },
    ];

    const registrationsData = Object.entries(stats.registrationsByDate).map(([date, count]) => ({ date, count }));

    return (
        <div className="p-6 text-white">
            {/* Összesített statisztikák */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                <StatCard title="Total Users" value={stats.numberOfUsers.registeredUsers} />
                <StatCard title="Total Games Played" value={stats.numberOfGames} />
                <StatCard title="Users Today" value={stats.numberOfActiveUsersToday} />
                <StatCard title="Games Solved Today" value={stats.numberOfPlayedGamesToday.solved} />
            </div>

            {/* Kördiagram: Megoldott vs. Nem megoldott játékok */}
            <div className="mb-8">
                <h2 className="text-xl mb-4">Solved vs. Unsolved Games</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={solvedVsUnsolved} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                            {solvedVsUnsolved.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Oszlopdiagram: Gamemode Statisztika */}
            <div className="mb-8">
                <h2 className="text-xl mb-4">Games Played by Gamemode</h2>
                <PlayedGamemodesChart rawData={stats.gamemodes} />
            </div>

            {/* Vonaldiagram: Regisztrációs statisztika */}
            <div>
                <h2 className="text-xl mb-4">User Registrations Over Time</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={registrationsData}>
                        <XAxis dataKey="date" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#00AA00" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

function StatCard({ title, value }: { title: string; value: number }) {
    return (
        <div className="bg-gray-800 p-4 rounded-lg text-center shadow-md">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-2xl">{value}</p>
        </div>
    );
}
