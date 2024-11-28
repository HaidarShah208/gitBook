"use client"

import { useState } from 'react'

interface Card {
  id: string
  content: string
}

export default function CardGrid() {
  const [cards, setCards] = useState<Card[]>([
    { id: '1', content: '' },
    { id: '2', content: '' },
    { id: '3', content: '' },
    { id: '4', content: '' },
  ])

  const addCard = () => {
    const newCard: Card = {
      id: `${cards.length + 1}`,
      content: '',
    }
    setCards([...cards, newCard])
  }

  const updateCard = (id: string, content: string) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, content } : card
    ))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <textarea
            value={card.content}
            onChange={(e) => updateCard(card.id, e.target.value)}
            className="w-full h-32 resize-none focus:outline-none"
            placeholder="Write something..."
          />
        </div>
      ))}
      <button
        onClick={addCard}
        className="p-4 rounded-lg border border-gray-200 border-dashed flex items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span className="ml-2">New card</span>
      </button>
    </div>
  )
}

