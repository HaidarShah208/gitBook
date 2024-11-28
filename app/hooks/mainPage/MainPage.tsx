import {
  advancedOptions,
  discoverIntegration,
  EmbedsWithIcons,
  initialOptions,
} from "@/utils/icons";
import React, { useEffect, useRef, useState } from "react";

function MainPageHook() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(initialOptions);
  const [allAdvancedOptions, setAllAdvancedOptions] = useState(advancedOptions);
  const [allDiscoverIntegration, setAlldiscoverIntegration] = useState(discoverIntegration);
  const [allEmbeded, setAllEmbeded] = useState(EmbedsWithIcons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"files" | "images" | "embed">(
    "files"
  );
  const [activeMoreComponent, setActiveMoreComponent] = useState<
    "expandable" | "stepper" | null
  >(null);
  const [activeComponent, setActiveComponent] = useState<
    "table" | "cards" | "tabs" | null
  >(null);

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
    } else if (option.label === "Tabs") {
      setActiveComponent("tabs");
    } else if (option.label === "Expandable") {
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
    } else if (
      [
        "Youtube",
        "Trello",
        "Soundcloud",
        "Github Gist",
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
    } else {
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
  return {
    isDropdownOpen,
    filteredOptions,
    renderListItems,
    getInputClassName,
    getPlaceholder,
    handleInputChange,
    handleInputKeyDown,
    handleOptionClick,
    handleSearchChange,
    activeComponent,
    activeMoreComponent,
    modalMode,
    isModalOpen,
    allAdvancedOptions,
    allDiscoverIntegration,
    allEmbeded,
    isHovered,
    setIsHovered,
    dropdownRef,
    setIsDropdownOpen,
    searchValue,
    inputValue,
    setIsModalOpen,
    inputRef,
  };
}

export default MainPageHook;
