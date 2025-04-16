import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

type GamemodeColors = {
    Tutorial: string;
    Classic: string;
    Daily: string;
    AllInOne: string;
    Pocket: string;
    Resource: string;
    Hardcore: string;
};

export default function PlayedGamemodesChart({ rawData }: { rawData: any }) {
    if (!rawData || Object.keys(rawData).length === 0) {
        return <p>This player haven't played any games yet</p>;
    }

    // 🔹 Adatok átalakítása a Recharts formátumára
    const data = Object.entries(rawData).map(([date, modes]) => ({
        date,
        ...(typeof modes === 'object' && modes !== null ? modes : {}),
    }));

    // 🔹 Meglévő kulcsok kigyűjtése
    const gamemodes = new Set<string>();
    Object.values(rawData).forEach(modes => {
        Object.keys(modes as Record<string, number>).forEach(gamemode => gamemodes.add(gamemode));
    });

    const gamemodeColors = {
        "Tutorial": "#00AA00",
        "Classic": "#0000AA",
        "Daily": "#FFAA00",
        "AllInOne": "#55FFFF",
        "Pocket": "#AA00AA",
        "Resource": "#00AAAA",
        "Hardcore": "#AA0000"
    }

    // 🔹 Dinamikus szélesség és magasság kiszámítása
    const chartWidth = Math.max(300, [...gamemodes].length * 50); // A szélesség az oszlopok számától függ (50px per oszlop)
    const chartHeight = Math.max(300, data.length * 40); // A magasság az adatok számától függ

    return (
        <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="date" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Legend />

                {[...gamemodes].map((mode) => (
                    <Bar
                        key={mode}
                        dataKey={mode}
                        fill={gamemodeColors[mode as keyof GamemodeColors]}
                        barSize={chartWidth / Object.keys(gamemodeColors).length}
                    />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
}
