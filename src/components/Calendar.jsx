import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { addDays, isWeekend, isBefore, isAfter, subDays, getDay } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { usePortals } from '../hooks/usePortals';
import { today, lastWeekday } from '../utils/dateHelpers';

export default function Calendar({ setSelectedDateISO }) {

  const [selectedDay, setSelectedDay] = useState(lastWeekday);
  const [month, setMonth] = useState(today);

  const handleNextDay = () => {
    const newDay = addDays(selectedDay, 1);
    if (!isWeekend(newDay) && !isBefore(new Date(2023, 12)) && !isAfter(newDay, today)) {
      handleSetDay(newDay);
    }
    else if (isWeekend(newDay) && !isBefore(new Date(2023, 12)) && !isAfter(addDays(newDay, 2), today)) {
      handleSetDay(addDays(newDay, 2)); // Add 2 days if selectedDay falls on a weekend
    }
    setMonth(newDay);
  };

  const handlePreviousDay = () => {
    const newDay = subDays(selectedDay, 1);
    if (!isWeekend(newDay) && !isBefore(new Date(2023, 12))) {
      handleSetDay(newDay);
    }
    else if (isWeekend(newDay) && !isBefore(new Date(2023, 12))) {
      handleSetDay(subDays(newDay, 2)); // Subtract 2 days if selectedDay falls on a weekend
    }
    setMonth(newDay);
  }

  const handleSetDay = (day) => {
    setSelectedDay(day);
    // Set to ISO string for GET
    setSelectedDateISO(day);
    console.log("date changed! date selected (date string): " + day.toDateString() + ", regular date: " + day);
  }

  // Keyboard navigation
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.keyCode === 37) {
      // Left arrow pressed
      leftButtonRef.current.click();
    } else if (event.keyCode === 39) {
      // Right arrow pressed
      rightButtonRef.current.click();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // CSS for DayPicker
  const dayPickerCss = `
  .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
    background-color: var(--bs-link-color);
    color: white;
  }
  .rdp-button_reset, .rdp-button, .rdp-day:hover {
    color: white;
  }
`;

  return (
    <div className="position-relative">
      <nav aria-label="Page navigation example" className="d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item"><button ref={leftButtonRef} type="button" tabIndex="0" className="page-link" onClick={handlePreviousDay}>{"<"}</button></li>
          <li className="page-item"><div className="dropdown-center" role="group">
            <button type="button" className="page-link" data-bs-toggle="dropdown" data-bs-auto-close="outside" style={{ width: "300px" }} aria-expanded="false">
              {format(selectedDay, 'PPPP')}
            </button>
            <ul className="dropdown-menu">
              <li><style>{dayPickerCss}</style><DayPicker
                mode="single"
                showOutsideDays
                required
                selected={selectedDay}
                onSelect={handleSetDay}
                month={month}
                onMonthChange={setMonth}
                modifiers={{
                  disabled: [
                    {
                      dayOfWeek: [0, 6]
                    },
                    {
                      after: today
                    },
                    {
                      before: new Date(2023, 12)
                    }
                  ]
                }}
              /></li>
            </ul>
          </div></li>
          <li className="page-item"><button ref={rightButtonRef} type="button" className="page-link" onClick={handleNextDay}>{">"}</button></li>
        </ul>
      </nav>
    </div>
  );
}