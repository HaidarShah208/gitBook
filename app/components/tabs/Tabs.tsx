"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface Tab {
  id: string;
  name: string;
  content: string;
}

export default function Tabs() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "1", name: "First Tab", content: "" },
    { id: "2", name: "Second Tab", content: "" },
  ]);
  const [activeTab, setActiveTab] = useState("1");
  const [draggedTab, setDraggedTab] = useState<string | null>(null);

  const addTab = () => {
    const newTab: Tab = {
      id: `${tabs.length + 1}`,
      name: `New Tab`,
      content: "",
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const removeTab = (id: string) => {
    const remainingTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(remainingTabs);
    if (activeTab === id && remainingTabs.length > 0) {
      setActiveTab(remainingTabs[0].id);
    }
  };

  const updateTabName = (id: string, name: string) => {
    setTabs(tabs.map((tab) => (tab.id === id ? { ...tab, name } : tab)));
  };

  const updateTabContent = (id: string, content: string) => {
    setTabs(tabs.map((tab) => (tab.id === id ? { ...tab, content } : tab)));
  };

  const handleDragStart = (id: string) => {
    setDraggedTab(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedTab || draggedTab === targetId) return;

    const draggedIndex = tabs.findIndex((tab) => tab.id === draggedTab);
    const targetIndex = tabs.findIndex((tab) => tab.id === targetId);

    if (draggedIndex === targetIndex) return;

    const newTabs = [...tabs];
    const [draggedItem] = newTabs.splice(draggedIndex, 1);
    newTabs.splice(targetIndex, 0, draggedItem);
    setTabs(newTabs);
  };

  const handleDragEnd = () => {
    setDraggedTab(null);
  };

  return (
    <div className="w-full">
      <div className="flex items-center border-b border-gray-200">
        <div className="flex items-center">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              draggable
              onDragStart={() => handleDragStart(tab.id)}
              onDragOver={(e) => handleDragOver(e, tab.id)}
              onDragEnd={handleDragEnd}
              className={`group flex items-center justify-between cursor-move border px-4 py-2 rounded-sm ${
                activeTab === tab.id
                  ? "bg-gray-400 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <input
                type="text"
                value={tab.name}
                onChange={(e) => updateTabName(tab.id, e.target.value)}
                onClick={() => setActiveTab(tab.id)}
                className={`bg-transparent border-none focus:outline-none ${
                  activeTab === tab.id ? "font-medium" : ""
                }`}
              />
              <button
                onClick={() => removeTab(tab.id)}
                className="text-gray-500 hover:text-red-600 ml-2"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            onClick={addTab}
            className="flex items-center justify-center w-5 ms-1 h-5  bg-gray-200 hover:bg-gray-300 rounded-full transition"
          >
            <Plus className="w-3 h-3 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="mt-1">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab === tab.id ? "block" : "hidden"}`}
          >
            <textarea
              value={tab.content}
              onChange={(e) => updateTabContent(tab.id, e.target.value)}
              className="w-full min-h-[200px] p-4 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Write something..."
            />
          </div>
        ))}
      </div>
    </div>
  );
}
