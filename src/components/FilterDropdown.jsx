import React, { useState, useRef, useEffect } from 'react';

function FilterDropdown({ priceFilter, setPriceFilter, priceRanges }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button 
        className="filter-icon-btn" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fa-solid fa-filter"></i> <b>Bộ lọc</b>
      </button>
      
      {isOpen && (
        <ul className="filter-list">
          {priceRanges.map((range) => (
            <li key={range}>
              <button
                className={priceFilter === range ? 'active' : ''}
                onClick={() => {
                  setPriceFilter(range);
                  setIsOpen(false);
                }}
              >
                {range}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterDropdown;
