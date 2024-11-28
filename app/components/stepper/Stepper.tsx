"use client"

import { useState } from 'react'
import { Plus } from 'lucide-react'

interface Step {
  id: string
  title: string
  content: string
}

export default function Stepper() {
  const [steps, setSteps] = useState<Step[]>([
    { id: '1', title: 'Step title', content: 'Step content' },
    { id: '2', title: 'Step title', content: 'Step content' }
  ])

  const updateStep = (id: string, field: keyof Step, value: string) => {
    setSteps(steps.map(step =>
      step.id === id ? { ...step, [field]: value } : step
    ))
  }

  const addStep = () => {
    const newStep: Step = {
      id: `${steps.length + 1}`,
      title: 'Step title',
      content: 'Step content'
    }
    setSteps([...steps, newStep])
  }

  return (
    <div className="space-y-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 p-3 flex items-center justify-center text-sm font-medium">
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className="w-0.5 min-h-full bg-gray-200"></div>
            )}
          </div>
          <div className="flex-1 space-y-1">
            <input
              type="text"
              value={step.title}
              onChange={(e) => updateStep(step.id, 'title', e.target.value)}
              className="block w-full text-lg font-medium focus:outline-none"
              placeholder="Step title"
            />
            <textarea
              value={step.content}
              onChange={(e) => updateStep(step.id, 'content', e.target.value)}
              className="block w-full min-h-[60px] text-gray-600 focus:outline-none resize-none"
              placeholder="Step content"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addStep}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 group"
      >
        <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        <span className="group-hover:text-gray-900">Insert a new step</span>
      </button>
    </div>
  )
}

