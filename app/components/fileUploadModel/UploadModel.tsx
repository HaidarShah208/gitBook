"use client"

import { useState, useRef, useEffect } from 'react'
import { AiOutlineClose, AiOutlineLink, AiOutlineFile, AiOutlinePicture } from 'react-icons/ai'

interface FileUploadModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'files' | 'images' | 'embed'
}

export default function FileUploadModal({ isOpen, onClose, mode }: FileUploadModalProps) {
  const [activeTab, setActiveTab] = useState<'files' | 'url' | 'unsplash'>('files')
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [url, setUrl] = useState('')
  const [isUploadActive, setIsUploadActive] = useState(false)

  useEffect(() => {
    setActiveTab(mode === 'embed' ? 'url' : 'files')
  }, [mode])

  useEffect(() => {
    setIsUploadActive(files.length > 0 || url.trim() !== '')
  }, [files, url])

  if (!isOpen) return null

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (mode === 'images') {
        const imageFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
        setFiles(imageFiles)
      } else {
        setFiles(Array.from(e.dataTransfer.files))
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      if (mode === 'images') {
        const imageFiles = Array.from(e.target.files).filter(file => file.type.startsWith('image/'))
        setFiles(imageFiles)
      } else {
        setFiles(Array.from(e.target.files))
      }
    }
  }

  const onButtonClick = () => {
    inputRef.current?.click()
  }

  const getTitle = () => {
    switch (mode) {
      case 'files':
        return 'Select files'
      case 'images':
        return 'Select image'
      case 'embed':
        return 'Embed a URL'
      default:
        return 'Select'
    }
  }

  const renderContent = () => {
    if (mode === 'embed' || activeTab === 'url') {
      return (
        <div className="p-6">
          <div className="mb-4">
            <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
              Enter URL
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineLink className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                id="url-input"
                className="focus:ring-0 focus:border-0 block w-full pl-10 py-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="https://example.com/file"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          {mode === 'images' && (
            <p className="text-xs text-gray-500">Supported formats: PNG, JPG, GIF, SVG</p>
          )}
        </div>
      )
    }

    return (
      <div className="p-6">
        <div
          className={`relative h-48 ${
            dragActive ? 'border-gray-600' : 'border-gray-300'
          } border-2 border-dashed rounded-lg transition-colors duration-300 ease-in-out`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type={mode === 'images' ? 'file' : 'file'}
            multiple={mode !== 'images'}
            accept={mode === 'images' ? 'image/*' : undefined}
            onChange={handleChange}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center h-full">
            {mode === 'images' ? (
              <AiOutlinePicture className="w-12 h-12 text-gray-400 mb-4" />
            ) : (
              <AiOutlineFile className="w-12 h-12 text-gray-400 mb-4" />
            )}
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop your {mode === 'images' ? 'image' : 'files'} here
            </p>
            <button
              type="button"
              onClick={onButtonClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            >
              Choose {mode === 'images' ? 'Image' : 'Files'}
            </button>
          </div>
        </div>
        {files.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Selected {mode === 'images' ? 'Image' : 'Files'}:</h4>
            <ul className="text-sm text-gray-600">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {getTitle()}
                </h3>
                <div className="mt-4">
                  {mode !== 'embed' && (
                    <div className="border-b border-gray-200">
                      <nav className="-mb-px flex" aria-label="Tabs">
                        <button
                          onClick={() => setActiveTab('files')}
                          className={`${
                            activeTab === 'files'
                              ? 'border-gray-600 text-gray-700'
                              : 'border-transparent  text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                        >
                          Files
                        </button>
                        <button
                          onClick={() => setActiveTab('url')}
                          className={`${
                            activeTab === 'url'
                              ? 'border-gray-600 text-gray-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 focus:outline-slate-700 focus:ring-gray-600 hover:border-gray-300'
                          } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                        >
                          URL
                        </button>
                      </nav>
                    </div>
                  )}
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => {
                onClose()
              }}
              disabled={!isUploadActive}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                isUploadActive
                  ? 'bg-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600'
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              {mode === 'embed' ? 'Insert' : 'Upload'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

