"use client";

import {
  advancedOptions,
  discoverIntegration,
  EmbedsWithIcons,
  initialOptions,
} from "@/utils/icons";
import { useState, useRef, useEffect } from "react";
import FileUploadModal from "./components/fileUploadModel/UploadModel";
import { CiFaceSmile } from "react-icons/ci";
import EditableTable from "./components/table/Table";
import CardGrid from "./components/card/Card";
import Expandable from "./components/expandable/Expandable";
import Stepper from "./components/stepper/Stepper";
import Tabs from "./components/tabs/Tabs";

export default function Page() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(initialOptions);
  const [allAdvancedOptions, setAllAdvancedOptions] = useState(advancedOptions);
  const [allDiscoverIntegration, setAlldiscoverIntegration] =useState(discoverIntegration);
  const [allEmbeded, setAllEmbeded] =useState(EmbedsWithIcons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"files" | "images" | "embed">("files");
  const [activeMoreComponent, setActiveMoreComponent] = useState<"expandable" | "stepper" | null>(null);
  const [activeComponent, setActiveComponent] = useState<"table" | "cards" | "tabs" | null>(null);

  const [currentStyle, setCurrentStyle] = useState<string>("Paragraph");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [listItems, setListItems] = useState<
    {
      value: string;
      type: "unordered" | "ordered" | "task";
      completed?: boolean;
    }[]
  >([]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setFilteredOptions(
      initialOptions.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      switch (currentStyle) {
        case "Unordered list":
          setListItems([
            ...listItems,
            {
              value: inputValue.trim(),
              type: "unordered",
            },
          ]);
          break;
        case "Ordered list":
          setListItems([
            ...listItems,
            {
              value: inputValue.trim(),
              type: "ordered",
            },
          ]);
          break;
        case "Task List":
          setListItems([
            ...listItems,
            {
              value: inputValue.trim(),
              type: "task",
              completed: false,
            },
          ]);
          break;
        default:
          setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
    if (e.key === "/") {
      setIsDropdownOpen(true);
    }
  };

  const removeListItem = (index: number) => {
    setListItems(listItems.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index: number) => {
    const newListItems = [...listItems];
    if (newListItems[index].type === "task") {
      newListItems[index].completed = !newListItems[index].completed;
      setListItems(newListItems);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleOptionClick = (option: any) => {
    if (option.label === "Insert files") {
      setModalMode("files");
      setIsModalOpen(true);
    } else if (option.label === "Insert Images") {
      setModalMode("images");
      setIsModalOpen(true);
    } else if (option.label === "Embed Url") {
      setModalMode("embed");
      setIsModalOpen(true);
    } else if (option.label === "Table") {
      setActiveComponent("table");
    } else if (option.label === "Cards") {
      setActiveComponent("cards");
    }else if (option.label === "Tabs") {
      setActiveComponent("tabs");
    }
     else if (option.label === "Expandable") {
      setActiveMoreComponent("expandable");
    } else if (option.label === "Stepper") {
      setActiveMoreComponent("stepper");
    } else if (
      [
        "Arcade",
        "Figma",
        "Github Files",
        "GitLab Files",
        "Guide flow",
        "Guide jar",
        "HowdyGo",
        "Jira",
        "Linear",
      ].includes(option.label)
    ) {
      setModalMode("embed");
      setIsModalOpen(true);
    }  else if (
      [
        "Youtube",
        "Trello",
        "Soundcloud",
        "GitLab Gist",
        "Framer",
        "Dribble",
        "Typeform",
        "Google Docs",
        "Google Sheets",
        "Google Form",
        "Google Slides",
      ].includes(option.label)
    ) {
      setModalMode("embed");
      setIsModalOpen(true);
    }
    
    else {
      setCurrentStyle(option.label);
    }
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  };

  const getPlaceholder = () => {
    switch (currentStyle) {
      case "Heading 1":
        return "Type a large heading...";
      case "Heading 2":
        return "Type a smaller heading...";
      case "Heading 3":
        return "Type a medium heading...";
      case "Unordered list":
        return "Type an unordered list item...";
      case "Ordered list":
        return "Type an ordered list item...";
      case "Task List":
        return "Type a task list item...";
      case "Quote":
        return "Type a quote...";
      case "Divider":
        return "Insert a divider...";
      case "Code block":
        return "Type a code block...";
      case "Paragraph":
        return "Type / for more commands...";
      default:
        return "Start typing...";
    }
  };

  const getInputClassName = () => {
    switch (currentStyle) {
      case "Heading 1":
        return "text-3xl font-bold";
      case "Heading 2":
        return "text-2xl font-semibold";
      case "Heading 3":
        return "text-xl font-semibold";
      case "Unordered list":
        return "list-disc list-inside";
      case "Quote":
        return "italic border-l-4 pl-4 border-gray-400";
      case "Divider":
        return "border-t-2 border-b-2 pt-2 pb-2 mt-2 mb-2";
      case "Code block":
        return "font-mono bg-gray-100 p-2 rounded";
      case "Paragraph":
        return "text-base";
      case "Hint":
        return "bg-yellow-50 border-l-4 border-yellow-400 pl-4 italic text-yellow-700";
      default:
        return "";
    }
  };

  const renderListItems = () => {
    return listItems.map((item, index) => {
      let className = "";
      let prefix = "";

      switch (item.type) {
        case "unordered":
          className = "list-disc list-inside ps-1";
          prefix = ` •  `;
          break;
        case "ordered":
          className = "list-decimal list-inside";
          prefix = `${index + 1}. `;
          break;
        case "task":
          className = "flex items-center";
          prefix = item.completed ? "☑ " : "☐ ";
          break;
      }

      return (
        <div key={index} className={`flex items-center ${className}`}>
          {item.type === "task" ? (
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleTaskCompletion(index)}
              className="mr-2"
            />
          ) : (
            <span>{prefix}</span>
          )}
          <span
            className={
              item.type === "task" && item.completed
                ? "line-through text-gray-500"
                : ""
            }
          >
            {item.value}
          </span>
          <button
            onClick={() => removeListItem(index)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            &times;
          </button>
        </div>
      );
    });
  };

  return (
    <div className="ps-96 pt-20">
      <h3 className="text-2xl font-semibold flex flex-row items-center mb-4">
        <CiFaceSmile /> Page
      </h3>

      <div className="relative inline-block text-left" ref={dropdownRef}>
        <div
          className="flex items-center gap-2 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-5 h-5 flex justify-center items-center">
            <button
              type="button"
              className={`inline-flex justify-center items-center w-5 h-5 rounded-md border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 ${
                isHovered || isDropdownOpen ? "visible" : "invisible"
              }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap items-center p-2 border-b border-gray-300 focus-within:border-indigo-500">
            <input
              ref={inputRef}
              type="text"
              className={`flex-grow border-0 bg-transparent focus:outline-none border-b-0 ${getInputClassName()}`}
              placeholder={getPlaceholder()}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              style={{ minWidth: "150px" }}
            />
          </div>

          {isDropdownOpen && (
            <div
              className="absolute right-full mr-2 top-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
            >
              <div className="p-2">
                <input
                  type="text"
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-indigo-500"
                  placeholder="Search options..."
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="max-h-80 overflow-y-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <button
                      key={`option-${index}`}
                      onClick={() => handleOptionClick(option)}
                      className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-center pb-2">No results found</p>
                )}

                {allAdvancedOptions.length > 0 && (
                  <>
                    <div className="px-4 py-2 text-xs text-gray-500 uppercase border-t border-gray-300">
                      Advanced Options
                    </div>
                    {allAdvancedOptions.map((option, index) => (
                      <button
                        key={`adv-${index}`}
                        onClick={() => handleOptionClick(option)}
                        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        {option.icon}
                        {option.label}
                      </button>
                    ))}
                  </>
                )}

                {allDiscoverIntegration.length > 0 && (
                  <>
                    <div className="px-4 py-2 text-xs text-gray-500 uppercase border-t border-gray-300">
                      Discover Integrations
                    </div>
                    {allDiscoverIntegration.map((option, index) => (
                      <button
                        key={`discover-${index}`}
                        onClick={() => handleOptionClick(option)}
                        className="flex w-full items-center gap-3  text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        {option.icon}
                        {option.label}
                      </button>
                    ))}
                  </>
                )}
                {allEmbeded.length > 0 && (
                  <>
                    <div className="px-4 py-2 text-xs text-gray-500 uppercase border-t border-gray-300">
                     EMBEDS
                    </div>
                    {allEmbeded.map((option, index) => (
                      <button
                        key={`discover-${index}`}
                        onClick={() => handleOptionClick(option)}
                        className="flex w-full items-center gap-3  text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        {option.icon}
                        {option.label}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {activeComponent === "table" && <EditableTable />}
        {activeComponent === "cards" && <CardGrid />}
        {activeComponent === 'tabs' && <Tabs />}
      </div>
      <div className="max-w-6xl mx-auto p-6">
        {activeMoreComponent === "expandable" && <Expandable />}
        {activeMoreComponent === "stepper" && <Stepper />}
      </div>

      <div className="mt-4">{renderListItems()}</div>
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
      />
    </div>
  );
}
