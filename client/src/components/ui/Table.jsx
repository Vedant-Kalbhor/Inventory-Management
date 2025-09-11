import React from 'react';

export default function Table({ columns = [], data = [] }) {
  return (
    <table className="w-full table-auto bg-white rounded shadow">
      <thead>
        <tr className="bg-gray-50">
          {columns.map((c) => (
            <th key={c.accessor} className="p-2 text-left">{c.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="border-t">
            {columns.map((c) => (
              <td key={c.accessor} className="p-2">
                {c.Cell ? c.Cell(row) : (row[c.accessor] ?? '')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
