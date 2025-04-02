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
                        <tr key={rowIndex} onClick={() => onRowClick ? onRowClick(row) : null}>
                            {columns.map((col, colIndex) => {
                                const key = col.toLowerCase();
                                return (
                                    <td key={colIndex}>
                                        {key === "actions" ? row["Actions"] : row[key]}
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
