"use client"

import { useState } from 'react'

interface TableCell {
  id: string
  content: string
}

interface TableRow {
  id: string
  cells: TableCell[]
}

export default function EditableTable() {
  const [headers, setHeaders] = useState<string[]>(['Text', 'Text', 'Text'])
  const [rows, setRows] = useState<TableRow[]>([
    {
      id: '1',
      cells: [
        { id: '1-1', content: '' },
        { id: '1-2', content: '' },
        { id: '1-3', content: '' },
      ],
    },
    {
      id: '2',
      cells: [
        { id: '2-1', content: '' },
        { id: '2-2', content: '' },
        { id: '2-3', content: '' },
      ],
    },
  ])

  const handleHeaderChange = (index: number, value: string) => {
    const newHeaders = [...headers]
    newHeaders[index] = value
    setHeaders(newHeaders)
  }

  const handleCellChange = (rowIndex: number, cellIndex: number, value: string) => {
    const newRows = [...rows]
    newRows[rowIndex].cells[cellIndex].content = value
    setRows(newRows)
  }

  const addRow = () => {
    const newRow: TableRow = {
      id: `${rows.length + 1}`,
      cells: headers.map((_, index) => ({
        id: `${rows.length + 1}-${index + 1}`,
        content: '',
      })),
    }
    setRows([...rows, newRow])
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-300 bg-gray-50 p-2">
                <input
                  type="text"
                  value={header}
                  onChange={(e) => handleHeaderChange(index, e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold focus:outline-none"
                  placeholder="Enter header"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.id}>
              {row.cells.map((cell, cellIndex) => (
                <td key={cell.id} className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={cell.content}
                    onChange={(e) =>
                      handleCellChange(rowIndex, cellIndex, e.target.value)
                    }
                    className="w-full focus:outline-none"
                    placeholder="Enter text"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addRow}
        className="mt-2 text-sm text-gray-600 hover:text-gray-900"
      >
        + Add row
      </button>
    </div>
  )
}

