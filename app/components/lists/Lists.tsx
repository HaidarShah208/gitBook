import React, { useState, useEffect, useRef } from 'react';

interface EditableListProps {
  type: 'Ordered list' | 'Unordered list';
  initialContent: string;
  onChange: (content: string) => void;
}

const EditableList: React.FC<EditableListProps> = ({ type, initialContent, onChange }) => {
  const [items, setItems] = useState<string[]>(initialContent.split('\n').filter(item => item.trim() !== ''));
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = items.join('\n');
    onChange(content);
  }, [items, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, '');
      setItems(newItems);
    } else if (e.key === 'Backspace' && items[index] === '' && items.length > 1) {
      e.preventDefault();
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  const handleBlur = () => {
    if (listRef.current) {
      const newItems = Array.from(listRef.current.children).map(
        (child) => (child as HTMLElement).innerText
      );
      setItems(newItems);
    }
  };

  return (
    <div
      ref={listRef}
      className={`w-full p-2 border rounded ${type === 'Ordered list' ? 'list-decimal' : 'list-disc'} list-inside`}
      onBlur={handleBlur}
    >
      {items.map((item, index) => (
        <div
          key={index}
          contentEditable
          suppressContentEditableWarning
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="outline-none"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default EditableList;

