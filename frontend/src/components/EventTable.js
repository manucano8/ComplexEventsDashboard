import React from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, getSortedRowModel } from '@tanstack/react-table';
import './EventTable.css';

function EventTable({ data, type }) {
  const columns = React.useMemo(
    () => {
      const baseColumns = [
        { header: 'ID', accessorKey: '_id' },
        { header: 'Date Of Detection', accessorKey: 'dateOfOccurrence', cell: info => {
          const date = new Date(info.getValue());
          const formattedDate = date.toLocaleDateString();
          const formattedTime = date.toLocaleTimeString();
          return `${formattedDate} ${formattedTime}`;
        }},
        { header: 'Type of Event', accessorKey: 'typeOfEvent' },
      ];
      
      if (type && data.length > 0) {
        const firstEvent = data[0];
        if (firstEvent.properties) {
          const propertyColumns = Object.keys(firstEvent.properties).map(key => ({
            header: key,
            accessorKey: `properties.${key}`,
          }));
          return [...baseColumns, ...propertyColumns];
        }
      }
      return [...baseColumns, { header: 'Properties', accessorKey: 'properties', cell: info => JSON.stringify(info.getValue()) }];
    }, [type, data]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), 
  });

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}
                  style={{
                    padding: '8px',
                    borderBottom: '2px solid #ddd',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.isSorted ? (header.isSortedDesc ? ' ' : ' ') : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} style={{ borderBottom: '1px solid #eee'}}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ padding: '8px' }}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventTable;