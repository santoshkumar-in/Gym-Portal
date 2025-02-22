import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import CalendarHeader from "./Parts/CalendarHeader";
import EventForm from "./Parts/EventForm";
import Day from "./Parts/Day";
import { getDaysInMonth, getFirstDayOfMonth, isPastDay } from "@/helpers";

// Define Types
interface Event {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: Date;
}

interface Holiday {
  name: string;
  date: Date;
}

const BusinessCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const mockHolidays: Holiday[] = [
      {
        name: "New Year's Day",
        date: new Date(currentDate.getFullYear(), 0, 1),
      },
      { name: "Christmas", date: new Date(currentDate.getFullYear(), 11, 25) },
      {
        name: "Gym is Closed",
        date: new Date(currentDate.getFullYear(), 1, 25),
      },
    ];
    setHolidays(mockHolidays);

    const mockEvents: Event[] = [
      {
        id: "1",
        title: "Team Meeting",
        startTime: "10:00",
        endTime: "11:00",
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      },
      {
        id: "2",
        title: "Project Review",
        startTime: "14:00",
        endTime: "15:00",
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20),
      },
    ];
    setEvents(mockEvents);
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const handleMonthSelect = (month: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), month));
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth()));
  };

  const handleDayClick = (date: Date) => {
    if (!isPastDay(date)) {
      setSelectedDate(date);
      setIsEventDialogOpen(true);
    }
  };

  const handleEventSubmit = (eventData: Omit<Event, "id" | "date">) => {
    if (selectedEvent) {
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id ? { ...event, ...eventData } : event,
        ),
      );
    } else if (selectedDate) {
      const newEvent: Event = {
        id: Date.now().toString(),
        ...eventData,
        date: selectedDate,
      };
      setEvents([...events, newEvent]);
    }
    setIsEventDialogOpen(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
    setIsEventDialogOpen(false);
    setSelectedEvent(null);
  };

  const daysInMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );
  const firstDayOfMonth = getFirstDayOfMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  const lastMonthDays = Array.from({ length: firstDayOfMonth }, () => null);

  const currentMonthDays = Array.from(
    { length: daysInMonth },
    (_, day) =>
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day + 1),
  );
  const days: (Date | null)[] = [...lastMonthDays, ...currentMonthDays];

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="container mx-auto p-4">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onMonthSelect={handleMonthSelect}
        onYearSelect={handleYearSelect}
      />

      <div className="mb-4 rounded-sm border border-stroke bg-white px-5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 sm:py-6">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {weekdays.map((day) => (
            <div
              key={day}
              className="bg-white p-2 text-sm font-medium text-gray-500"
            >
              {day.toUpperCase()}
            </div>
          ))}

          {days.map((date, index) => (
            <div key={index} className="bg-white">
              {date && (
                <Day
                  date={date}
                  events={events.filter(
                    (event) =>
                      event.date.toDateString() === date.toDateString(),
                  )}
                  onEventClick={(event) => {
                    setSelectedEvent(event);
                    setIsEventDialogOpen(true);
                  }}
                  onDayClick={handleDayClick}
                  holidays={holidays}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal modalIsOpen={isEventDialogOpen}>
        <h2>{selectedEvent ? "Edit Event" : "Create Event"}</h2>
        <EventForm
          event={selectedEvent}
          onSubmit={handleEventSubmit}
          onDelete={handleEventDelete}
          onClose={() => {
            setIsEventDialogOpen(false);
            setSelectedEvent(null);
            setSelectedDate(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default BusinessCalendar;
