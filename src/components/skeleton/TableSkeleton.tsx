


import React from 'react';

const TableSkeleton = () => {
  const columns = 4;
  const rows = 10;
  
  return (
    <div className="p-8">
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th
                key={index}
                className="border-b border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="border-b border-gray-200 px-4 py-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
