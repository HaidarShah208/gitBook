"use client";

import FileUploadModal from "./components/fileUploadModel/UploadModel";
import { CiFaceSmile } from "react-icons/ci";
import EditableTable from "./components/table/Table";
import CardGrid from "./components/card/Card";
import Expandable from "./components/expandable/Expandable";
import Stepper from "./components/stepper/Stepper";
import Tabs from "./components/tabs/Tabs";
import MainPageHook from "./hooks/mainPage/MainPage";

export default function Page() {
  const {
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
  } = MainPageHook();

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
        {activeComponent === "tabs" && <Tabs />}
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
