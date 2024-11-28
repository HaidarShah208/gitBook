"use client"

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ExpandableItem {
  id: string
  title: string
  content: string
  isExpanded: boolean
}

export default function Expandable() {
  const [items, setItems] = useState<ExpandableItem[]>([
    {
      id: '1',
      title: '',
      content: '',
      isExpanded: false
    }
  ])

  const toggleExpand = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, isExpanded: !item.isExpanded } : item
    ))
  }

  const updateItem = (id: string, field: keyof ExpandableItem, value: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const addItem = () => {
    const newItem: ExpandableItem = {
      id: `${items.length + 1}`,
      title: '',
      content: '',
      isExpanded: false
    }
    setItems([...items, newItem])
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="border rounded-lg overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer bg-white"
            onClick={() => toggleExpand(item.id)}
          >
            <div className="flex-1">
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                className="block w-full text-lg font-medium focus:outline-none"
                placeholder="Main heading"
                onClick={(e) => e.stopPropagation()}
              />
           
            </div>
            {item.isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          {item.isExpanded && (
            <div className="p-4 bg-white border-t">
              <textarea
                value={item.content}
                onChange={(e) => updateItem(item.id, 'content', e.target.value)}
                className="w-full min-h-[100px] focus:outline-none resize-none"
                placeholder="Enter content here..."
              />
            </div>
          )}
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full p-2 text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2"
      >
        <span>Add expandable section</span>
      </button>
    </div>
  )
}
