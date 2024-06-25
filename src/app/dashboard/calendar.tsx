import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

const CustomCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEvents([
        ...events,
        {
          start,
          end,
          title,
        },
      ]);
    }
  };

  const handleSelectEvent = (event: Event) => {
    const title = window.prompt('Edit Event name', event.title);
    if (title) {
      setEvents(
        events.map(e =>
          e.start === event.start && e.end === event.end ? { ...e, title } : e
        )
      );
    }
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        defaultView="month"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CustomCalendar;
