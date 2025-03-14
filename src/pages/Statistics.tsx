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
        return <p>Loading...</p>;
    }

    const solvedVsUnsolved = [
        { name: "Solved", value: stats.playedGames.solved },
        { name: "Unsolved", value: stats.playedGames.unsolved },
    ];

    const registrationsData = Object.entries(stats.registrationsByDate).map(([date, count]) => ({ date, count }));

    return (
        <div>
            {/* Összesített statisztikák */}
            <div>
                <StatCard title="Total Users" value={stats.numberOfUsers.registeredUsers} />
                <StatCard title="Total Games Played" value={stats.numberOfGames} />
                <StatCard title="Users Today" value={stats.numberOfActiveUsersToday} />
                <StatCard title="Games Solved Today" value={stats.numberOfPlayedGamesToday.solved} />
            </div>

            {/* Kördiagram: Megoldott vs. Nem megoldott játékok */}
            <div>
                <h2>Solved vs. Unsolved Games</h2>
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
            <div>
                <h2>Games Played by Gamemode</h2>
                <PlayedGamemodesChart rawData={stats.gamemodes} />
            </div>

            {/* Vonaldiagram: Regisztrációs statisztika */}
            <div>
                <h2>User Registrations Over Time</h2>
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
        <div>
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    );
}
