import React, { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function Calendar() {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);

  const footer = selectedDay ? (
    <p>You selected {format(selectedDay, 'PPPP')}.</p>
  ) : (
    <p>Please pick a day.</p>
  );

  return (
    <div className="position-relative">
      <div className="d-flex justify-content-center">
        <DayPicker
          mode="single"
          showOutsideDays
          required
          selected={selectedDay}
          onSelect={setSelectedDay}
          footer={footer}
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
        />
      </div>
    </div>
  );
}