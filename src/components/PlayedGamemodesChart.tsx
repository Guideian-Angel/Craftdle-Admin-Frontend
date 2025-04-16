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

    const data = Object.entries(rawData).map(([date, modes]) => ({
        date,
        ...(typeof modes === 'object' && modes !== null ? modes : {}),
    }));

    const gamemodes = new Set<string>();
    Object.values(rawData).forEach((modes) => {
        Object.keys(modes as Record<string, number>).forEach((gamemode) =>
            gamemodes.add(gamemode)
        );
    });

    const gamemodeColors: GamemodeColors = {
        Tutorial: "#00AA00",
        Classic: "#0000AA",
        Daily: "#FFAA00",
        AllInOne: "#55FFFF",
        Pocket: "#AA00AA",
        Resource: "#00AAAA",
        Hardcore: "#AA0000",
    };

    const chartWidth = Math.max(300, data.length * 100); // pl. 100px per nap
    const chartHeight = 400; // fix vagy max, hogy ne nőjön túl

    return (
        <div style={{ overflowX: "auto", maxWidth: "100%" }}>
            <div style={{ width: chartWidth, height: chartHeight }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <XAxis dataKey="date" stroke="#fff" />
                        <YAxis stroke="#fff" allowDecimals={false} /> {/* 🔹 csak egész szám */}
                        <Tooltip />
                        <Legend />

                        {[...gamemodes].map((mode) => (
                            <Bar
                                key={mode}
                                dataKey={mode}
                                fill={gamemodeColors[mode as keyof GamemodeColors]}
                                barSize={30}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}