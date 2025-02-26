interface TableProps {
    columns: string[];
    data: any[];
    onRowClick: (row: any) => void;
}

export function Table({ columns, data, onRowClick }: TableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className="py-2 px-4 border-b border-gray-700">{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="text-center cursor-pointer" onClick={() => onRowClick(row)}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="py-2 px-4 border-b border-gray-700">
                                    {(() => {
                                        const field = row[col.toLowerCase()];
                                        return Array.isArray(field) ? field.length === 0 ? "None" : field.join(", ") : field;
                                    })()}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}