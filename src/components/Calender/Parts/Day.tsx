import { isToday, isPastDay } from "@/helpers";
import Event from "./Event";

interface EventType {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: Date;
}

interface HolidayType {
  name: string;
  date: Date;
}

interface DayProps {
  date: Date;
  events: EventType[];
  onEventClick: (event: EventType) => void;
  onDayClick: (date: Date) => void;
  holidays: HolidayType[];
}

const Day: React.FC<DayProps> = ({
  date,
  events,
  onEventClick,
  onDayClick,
  holidays,
}) => {
  const isCurrentDay = isToday(date);
  const isPast = isPastDay(date);
  const holiday = holidays.find(
    (h) => h.date.toDateString() === date.toDateString(),
  );

  const dayClassNames = `
      h-32 border p-1 overflow-y-auto relative 
      ${isPast ? "cursor-not-allowed" : "cursor-pointer"}
      ${isPast ? "bg-gray-100" : "hover:bg-gray-100"}
      ${isCurrentDay ? "border-blue-500 border-2" : ""}
      ${holiday ? "bg-red-100" : ""}
    `;

  return (
    <div className={dayClassNames} onClick={() => !isPast && onDayClick(date)}>
      <div className="mb-1 flex items-center justify-between">
        <span
          className={`text-sm ${isCurrentDay ? "font-bold text-blue-600" : ""}`}
        >
          {date.getDate()}
        </span>
        {!isPast && (
          <i className="fas fa-plus text-xs text-gray-400 hover:text-gray-600"></i>
        )}
        {holiday && (
          <span className="text-xs font-medium text-red-600">
            {holiday.name}
          </span>
        )}
      </div>
      <div className="space-y-1">
        {events.map((event) => (
          <Event
            key={event.id}
            event={event}
            onClick={() => onEventClick(event)}
          />
        ))}
      </div>
    </div>
  );
};

export default Day;
