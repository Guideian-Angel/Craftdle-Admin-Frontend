interface TableProps {
    columns: string[];
    data: any[];
    onRowClick?: (row: any) => void;
}

export function Table({ columns, data, onRowClick }: TableProps) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr 
                            key={rowIndex}  
                            onClick={() => onRowClick ? onRowClick(row) : null}
                        >
                            {columns.map((col, colIndex) => {
                                const key = col.toLowerCase(); // 🔹 Kulcs kisbetűsítése, hogy egyezzen az objektummal
                                return (
                                    <td key={colIndex}>
                                        {typeof row[key] === "string" || typeof row[key] === "number"
                                            ? row[key] // 🔹 Normál szöveg vagy szám
                                            : Array.isArray(row[key]) // 🔹 Ha tömb (pl. rights), join-nal stringgé alakítjuk
                                                ? row[key].length > 0 
                                                    ? row[key].join(", ") 
                                                    : "None"
                                                : row[key] !== null 
                                                    ? row[key] // 🔹 JSX elem, pl. Modify oszlop
                                                    : ""}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
