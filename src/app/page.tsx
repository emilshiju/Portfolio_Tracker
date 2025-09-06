

// export default function Home() {

//   return (
    
//     <div >
      
//       <div>HELLO</div>


//     </div>
//   );
// }

"use client"




import * as React from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";


// Define the type for our table data
type Person = {
  name: string;
  age: number;
  status: string;
};

// Sample dataset
const data: Person[] = [
  { name: "Alice", age: 25, status: "Active" },
  { name: "Bob", age: 30, status: "Inactive" },
  { name: "Charlie", age: 35, status: "Pending" },
];

// Create a column helper to ensure type safety
const columnHelper = createColumnHelper<Person>();

// Define columns for the table
const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: "Age",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
];



export default function App() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-8">
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-b border-gray-200 px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
